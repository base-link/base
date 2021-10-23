
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <img src='https://github.com/baselinkteam/link/blob/work/look/dock.png?raw=true' height='128'/>
</p>

<h3 align='center'>base</h3>
<p align='center'>
  The Link Script Compiler
</p>

<p align='center'>
  <a href='#welcome'>Welcome</a> •
  <a href='#summary'>Summary</a> •
  <a href='#history'>History</a> •
  <a href='#contributing'>Contributing</a> •
  <a href='#license'>License</a>
</p>

<br/>
<br/>
<br/>

### Welcome

Link Script is a little more than a markup language, tending toward a programming language. In fact, it can be used for a programming language. It is a way to model information and computation in an easy to read and write format, suitable for hierarchical note taking and other means of capturing data down into structured form.

### Examples

Here are a few examples from existing code. The first is how you might define a "stack" (a "package" of Link code). The second is the first part of the Tao Te Ching captured in a tree, and the third how you might write a simple fibonacci function either iteratively or recursively. These examples are DSLs designed for a specific purposes. As you will see in the syntax section, the Link language is independent of a DSL and simply defines some simple idioms for defining trees of code and text.

A package definition:

```
deck @drumwork/link
  text <Link Script Compiler>
  make <Link>
  make <Computation>
  make <Philosophy>
  make <Information>
  make <Platform>
  make <White Label>
  hand <Lance Pollard>
  mail <lp@elk.fm>
  link ./link
```

The first block of the Tao Te Ching:

```
text <道德经>
  text <第一章>
    text <道可道，非恆道；>
    text <名可名，非恆名。>
    text <無名天地之始；>
    text <有名萬物之母。>
    text <故，>
    text <恆無，欲也，以觀其妙；>
    text <恆有，欲也，以觀其徼。>
    text <此兩者同出而異名，>
    text <同謂之玄。>
    text <玄之又玄，眾妙之門。>
```

And the fibonacci functions:

```
task find-fibonacci-via-loop
  head i

  host g, text 0
  host o, text 1
  host d

  call walk
    hook link
      save d, read o
      call add
        seed base, read g
        seed head, read d
        save o
      save g, read d
      call decrement
        seed integer, read i
        save i

  back lead, read g

task find-fibonacci-via-recursion
  head i
  head g, fault 0
  head o, fault 1

  call test-miss
    seed blob, read i
    hook mesh
      back lead, read g
    hook miss
      call subtract
        seed base, read i
        seed head, text 1
        save d
      call add
        seed base, read o
        seed head, read g
        save t
      call find-fibonacci-via-recursion
        seed i, read d
        seed g, read o
        seed o, read t
        back lead
```

Now we will go into the actual specification of the syntax.

### Syntax

The Link specification language is a minimal markup language that is transformable into code. It has the following syntax.

#### Terms

The first thing to cover are _terms_. They are composed of _words_, separated by dashes, into what are called _keys_. A word is composed of lowercase ascii letters or numbers. So the following are all keys of a term.

```
xo
hello-world
foo-bar-baz
```

They get compiled into objects, such as this one:

```json
{
  "type": "term",
  "name": "hi"
}
```


You can nest them arbitrarily into trees, and there are no rules on what can be nested into what else. You can nest whatever you need to do model your data in a nice and clean DSL.

A more complex example is:

```
hello world
```

Getting compiled to:

```json
{
  "type": "term",
  "name": "hello",
  "children": [
    {
      "type": "term",
      "name": "world"
    }
  ]
}
```

You can go as far as you want:

```
this is a tree
```

That is the same thing as this:

```
this
  is
    a
      tree
```

You can write multiple nodes on a line separated by comma:

```
this is, also a tree, and a tree
```

The same as:

```
this is
  also
    a tree
      and a tree
```

You can put things in parentheses too to make it easier to write on one line:

```
add(a, subtract(b, c))
```

The same as:

```
add a, subtract b, c
```

#### Numbers

You can use numbers in the system too:

```
add 1, 2
```

Which is compiled to:

```json
{
  "type": "term",
  "name": "add",
  "children": [
    {
      "type": "number",
      "value": 1
    },
    {
      "type": "number",
      "value": 2
    }
  ]
}
```

A more complex example would be:

```
add 1, subtract 2, 3
```

#### Templates

A more complex structure is the _template_. They are composed of a weaving of _strings_ and _terms_. A string is a contiguous sequence of arbitrary unicode (utf-8).

A simple template composed only of a string is:

```
write <hello world>
```

Which gets compiled to:

```json
{
  "type": "term",
  "name": "write",
  "children": [
    {
      "type": "template",
      "children": [
        {
          "type": "string",
          "value": "hello world"
        }
      ]
    }
  ]
}
```

Or multiline strings:

```
text
  <
    This is a long paragraph.

    And this is another paragraph.
  >
```

Note, there are no "comments" in the system. Comments are just strings we don't care about in code. So if you end up transforming Link into code, you would just get rid of any parts of the model with text nodes you consider "comments".

Then we can add interpolation into the template, by referencing terms wrapped in colons:

```
write <{hello-world}>
```

That is compiled into:

```json
{
  "type": "term",
  "name": "write",
  "children": [
    {
      "type": "template",
      "children": [
        {
          "type": "term",
          "name": "hello-world"
        }
      ]
    }
  ]
}
```

A more robust example might be:

```
moon <The moon has a period of roughly {bold(<28 days>)}.>
```

The expression needs to be simple enough you can tell where it starts and end, otherwise it needs to be placed outside of the template.

Note though, you can still use the angle bracket symbols in regular text without ambiguity, you just need to prefix them with backslashes.

```
i <am \<brackets\> included in the actual string>
```

#### Codes

You can write specific code points, or _codes_, by prefixing the number sign / hash symbol along with a letter representing the code type, followed by the code.

```
i #b0101, am bits
i #xaaaaaa, am hex
i #o123, am octal
```

```json
{
  "type": "code",
  "variant": "b",
  "value": "0101"
}
```

These can also be used directly in a template:

```
i <am the symbol #x2665>
```

This makes it so you can reference obscure symbols by their numerical value, or write bits and things like that. Note though, these just get compiled down to the following, so the code handler would need to resolve them properly in the proper context.

#### Paths

Because paths are so common in programming, they don't need to be treated as strings but can be written directly.

```
load @some/path
load ./relative/path.png
load /an-absolute/other/path.js
```

Let's see how each of these are compiled:

```json
{
  "type": "term",
  "name": "load",
  "children": [
    {
      "type": "template",
      "children": [
        {
          "type": "string",
          "value": "@some/path"
        }
      ]
    }
  ]
}
```

```json
{
  "type": "term",
  "name": "load",
  "children": [
    {
      "type": "template",
      "children": [
        {
          "type": "string",
          "value": "./relative/path.png"
        }
      ]
    }
  ]
}
```

```json
{
  "type": "term",
  "name": "load",
  "children": [
    {
      "type": "template",
      "children": [
        {
          "type": "string",
          "value": "/an-absolute/other/path.js"
        }
      ]
    }
  ]
}
```

That is, they are just special strings. You can interpolate on them like strings as well with square brackets.

#### Selectors

Selectors are like drilling down into terms. They look like paths, but they are really drilling down into terms, if you think of it that way.

```
get foo/bar
```

This gets compiled to:

```json
{
  "type": "term",
  "name": "get",
  "children": [
    {
      "type": "selector",
      "children": [
        {
          "type": "node",
          "name": "foo"
        },
        {
          "type": "node",
          "name": "bar"
        }
      ]
    }
  ]
}
```

You can interpolate on these as well, like doing array index lookup.

```
get node/children[i]/name
```

This gets compiled to:

```json
{
  "type": "term",
  "name": "get",
  "children": [
    {
      "type": "selector",
      "children": [
        {
          "type": "node",
          "name": "node"
        },
        {
          "type": "node",
          "name": "children",
          "children": [
            {
              "type": "node",
              "name": "i"
            }
          ]
        },
        {
          "type": "node",
          "name": "name"
        }
      ]
    }
  ]
}
```

The interpolations can be nested as well, and chained. Here is a complex example:

```
get foo/bar[x][o/children[i]/name]/value
```

### Discussion

With just these parts, you have a syntax for a robust programming language. Note, there are very little "special" syntaxes outside of the core term tree. There are no "operators" like binary operators such as `+` and `-`, or `&&`, or anything like that. There are just terms, templates, strings, numbers, codes, paths, and selectors.

You can write code or data in the same way. The key is figuring out the right DSL, and how to transform it into a core data model. For the purposes of this repo, the compiler gives you a tree of JSON. You are then free to transform it however you'd like and make it into data, code, or whatever else. It is general enough to serve that purpose.

### License

Copyright 2021 <a href='https://drum.work'>DrumWork</a>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

### DrumWork

This is being developed by the folks at [DrumWork](https://drum.work), a California-based project for helping humanity master information and computation. DrumWork started off in the winter of 2008 as a spark of an idea, to forming a company 10 years later in the winter of 2018, to a seed of a project just beginning its development phases. It is entirely bootstrapped by working full time and running [Etsy](https://etsy.com/shop/mountbuild) and [Amazon](https://www.amazon.com/s?rh=p_27%3AMount+Build) shops. Also find us on [Facebook](https://www.facebook.com/drumworkteam), [Twitter](https://twitter.com/drumworkteam), and [LinkedIn](https://www.linkedin.com/company/drumworkteam). Check out our other GitHub projects as well!

<br/>
<br/>

<p align='center'>
  <em>From Mount you find the Stone, reaching to the Cloud.<br/>
  No where on Earth do you feel the power of Nature all around.<br/>
  With the Cloud so close, you can see, touch, and taste.<br/>
  Feeding your energy to the Stone with haste.<br/>
  Mount holds it shape, like the secret ball.</em>
</p>

<br/>
<br/>
