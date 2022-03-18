
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<h3 align='center'>base</h3>
<p align='center'>
  The Link Text Compiler
</p>

<p align='center'>
  <a href='#welcome'>Welcome</a> •
  <a href='#example'>Example</a> •
  <a href='#license'>License</a>
</p>

<br/>
<br/>
<br/>

### Welcome

Link Text is a little more than a markup language, tending toward a programming language. In fact, it can be used for a programming language. It is a way to model information and computation in an easy to read and write format, suitable for hierarchical note taking and other means of capturing data down into structured form.

### Example

Here are a few examples from existing code. The first is how you might define a "stack" (a "package" of Link code). The second is the first part of the Tao Te Ching captured in a tree, and the third how you might write a simple fibonacci function either iteratively or recursively. These examples are DSLs designed for a specific purposes. As you will see in the syntax section, the Link language is independent of a DSL and simply defines some simple idioms for defining trees of code and text.

A package definition:

```link
deck @drumwork/base
  head <Link Text Compiler>
  make <Link Text>
  make <Computation>
  make <Philosophy>
  make <Information>
  make <Platform>
  make <White Label>
  mate <Lance Pollard>, site <lp@elk.fm>
  mark <0.0.1>
  dock head
  dock task
  read book
  term <Apache 2.0>
```

The first block of the Tao Te Ching:

```link
head <道德经>
  head <第一章>
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

Now we will go into the actual specification of the syntax.

### Link Text Syntax

The Link specification language is a minimal markup language that is transformable into code. It has the following syntax.

#### Terms

The first thing to cover are _terms_. They are composed of _words_, separated by dashes, into what are called _keys_. A word is composed of lowercase ascii letters or numbers. So the following are all keys of a term.

```link
xo
hello-world
foo-bar-baz
```

You can nest them arbitrarily into trees. These are all trees.

```link
hello world
this is a tree
this
  is
    a
      tree
```

You can write multiple nodes on a line separated by comma:

```link
this is, also a tree, and a tree
```

The same as:

```link
this is
  also
    a tree
      and a tree
```

You can put things in parentheses too to make it easier to write on one line:

```link
add(a, subtract(b, c))
```

The same as:

```link
add a, subtract b, c
```

#### Numbers

You can use numbers in the system too:

```link
add 1, 2
add 1, subtract -2, 3
```

#### Templates

A more complex structure is the _template_. They are composed of a weaving of _strings_ and _terms_. A string is a contiguous sequence of arbitrary unicode (utf-8).

A simple template composed only of a string is:

```link
write <hello world>
```

Or multiline strings:

```link
text
  <
    This is a long paragraph.

    And this is another paragraph.
  >
```

Then we can add interpolation into the template, by referencing terms wrapped in angle brackets:

```link
write <{hello-world}>
```

A more robust example might be:

```link
moon <The moon has a period of roughly {bold(<28 days>)}.>
```

Note though, you can still use the angle bracket symbols in regular text without ambiguity, you just need to prefix them with backslashes.

```link
i <am \<brackets\> included in the actual string>
```

#### Codes

You can write specific code points, or _codes_, by prefixing the number sign / hash symbol along with a letter representing the code type, followed by the code.

```link
i #b0101, am bits
i #o123, am octal
i #xaaaaaa, am hex
```

These can also be used directly in a template:

```link
i <am the symbol #x2665>
```

This makes it so you can reference obscure symbols by their numerical value, or write bits and things like that. Note though, these just get compiled down to the following, so the code handler would need to resolve them properly in the proper context.

#### Selectors

Selectors are like drilling down into terms. They look like paths, but they are really drilling down into terms, if you think of it that way.

```link
get foo/bar
```

You can interpolate on these as well, like doing array index lookup.

```link
get node/children[~i]/name
```

The interpolations can be nested as well, and chained. Here is a complex example:

```link
get foo/bar[x][o/children[~i]/name]/value
```

#### Paths

Because paths are so common in programming, they don't need to be treated as strings but can be written directly.

```link
load @some/path
load ./relative/path.png
load /an-absolute/other/path.js
```

That is, they are just special strings. You can interpolate on them like strings as well with square brackets.

### Base Type System

Every object in the system is a mesh, a graphical node so to speak, with links and sites.

Each mesh is given a mark, which is an ID relative to the organization, package, file, and type in which the record sits.

#### Ownership

These objects are owned (ownership types / affine types), and references are passed around in a structured way.

```link
save x, text 10 # create
save y, move x # move
save z, loan y # borrow
save w, read z # copy
```

Every variable is immutable by default, but you can specify it as mutable.

```link
save x, text 10
  lock free
```

#### Work

All types of things are work objects. These are subdivided into form work and task work.

#### Form

This is a record type. An instance is a mesh, a site with links.

```link
form bind
  take term, like term
  take code, like code
```

There are also type types. And case types, which are an enumeration of many possibilities which the type can take on.

```link
form list
  head seat, like like
  take size, like size
  take base
    like site
      bind seat, loan seat
  take head
    like site
      bind seat, loan seat

form site
  head seat
  take base
    like loan seat
    like void
  take head
    like loan seat
    like void
```

You can have dependent types too (constraints on the type based on the mesh links).

```link
form date
  take year, form natural-number
  take month, form natural-number
  take day, form natural-number

  hold is-between
    loan month
    size 1
    size 12

  stem case, loan month
    case 1, test is-day-within, size 31
    case 2
      stem case, call modulo-year, size 0
        case 0
          stem case, call modulo-year, size 100
            case 0
              stem case, call modulo-year, size 400
                case 0, test is-day-within, size 29
                fall, test is-day-within, size 28
            fall, test is-day-within, size 29
        fall, test is-day-within, size 28
    case 3, test is-day-within, size 31
    case 4, test is-day-within, size 30
    case 5, test is-day-within, size 31
    case 6, test is-day-within, size 30
    case 7, test is-day-within, size 31
    case 8, test is-day-within, size 31
    case 9, test is-day-within, size 30
    case 10, test is-day-within, size 31
    case 11, test is-day-within, size 30
    case 12, test is-day-within, size 31

  task modulo-year
    hide take
    take size
    call modulo
      loan year
      loan size

  task is-day-within
    hide take
    take size
    test is-less-than-or-equal-to
      loan day
      loan size
```

#### Task

Tasks are function definitions.

```link
task find-fibonacci-via-loop
  take i, form natural-number

  save g, size 0
    lock free

  save o, size 1
    lock free

  save d
    lock free

  walk test
    hook test
      test is-gt
        loan i
        text 0
    hook tick
      save d, move o
      save o
        call add
          loan g
          loan d
      save g, move d
      save i
        call decrement
          loan i

  back g
```

Tasks can be nested, creating each their own lexical scope.

#### Fork

The lexical scope (the "visible" scope, what you see when you look at the code) is called a fork. The forks form a stack, and their evolution forms a tree. These can be directly accessed at various places in the compiled term set. They can be accessed inside form definitions, as well as inside tasks.

#### Call

Tasks get applied with the call form.

```link
call check-gt
  bind base, loan i
  bind head, text 0
```

You can specify that the call is async with `wait`:

```link
call check-gt-async
  wait rise
  bind base, loan i
  bind head, text 0
```

Likewise, you can define `wait` on the task to say that it is async.

#### Hook

Calls can be streams or loops, which emit events. This is implemented with `hook`.

```link
call if
  hook test
    test is-boolean
      bind x, loan y
  hook match
    ...
  hook fail
    ...
```

#### Back

Calls automatically return a value without anything, but you can also return explicity.

```
back 0
```

#### Make

The make is the mesh constructor.

```link
make bind
  bind term, loan term
  bind term, loan term
```

#### Load

The load is the import of other modules or "files". Loads can be nested, and do pattern matching to select out object by type and name.

```link
load /form/sift
  take form link
  take form move
  take form read
  take form loan
```

#### Lead

A lead is returned when there is a potential error or value as options.

#### File

A file is a module. It belongs to a deck, the package.

#### Deck

A deck is a package. It belongs to a host, or an organization/entity.

#### Host

A host is used to bind data, usually for passing to a call, but can also be used to construct arbitrary trees of content.

```link
host hello, text <foo>
host world
  host bar, text <baz>
```

### Custom DSLs

You can build your own DSLs by defining a mine, mill, and mint which combines the two.

#### Mine

A mine is a parser. There are two types of mines by default, the text mine (which parses text/bits) and the tree mine (which parses the trees of terms). The tree of terms that you get initially is passed through the mine, and matched with a mill, to get the final mesh.

```link
mine bind
  mine term, term bind
    mine term
      take name
    mine room
      make case
        mine form, form sift
          take sift
```

#### Mill

The mill takes the streaming output from the mine, and converts it into mesh.

```link
mill bind
  mill term
    save term
  mill sift
    mill text
      save sift
    mill link
      mill road
        base seed
        make link
          bind road, link seed
          save sift
    mill move
      mill road
        base seed
        make move
          bind road, link seed
          save sift
    mill read
      mill road
        base seed
        make read
          bind road, link seed
          save sift
    mill loan
      mill road
        base seed
        make loan
          bind road, link seed
          save sift
    mill make, form make
      save sift
    mill call, form call
      save sift
    mill task, form task
      save sift
    mill task, form form
      save sift
  make bind
    bind term, link term
    bind term, link term
```

To construct your own DSLs, you simply define a mine which parses the term tree (following the example mines for inspiration), and define a mill to convert the mines parsings into mesh.

This gives us a way to transform text content to trees to meshes, and verify the transformation is correct.

Don't consider the trees of terms and the resulting objects as really an inflexible syntax which defines opaque objects and types. These are simple data structures encoding object trees and graphs, not like functional languages. So you are free to "compile" the object to create and run computation however you see fit, which gives you great ability.

### Project Cleanliness

Parentheses are always avoided in our base style. All files are named `base.link` inside of a folder, along with an optional `test.link` test file. Certain folder collections are standard, like Ruby on Rails.

### Forever Undefined

<em>Way back in a simpler time<br/>
The great mother showed me<br/>
A dark energy permeating us<br/>
Vastness hidden in plain sight.<br/>

Way deep in the great tree<br/>
The base link urges me<br/>
A dark energy permeating us<br/>
Vastness hidden in plain sight.<br/>

Way beyond our thoughts<br/>
The great wonder is everpresent<br/>
A dark energy permeating us<br/>
Vastness hidden in plain sight.<br/>

Way more undefined<br/>
The base link springs forth<br/>
A dark energy permeating us<br/>
Vastness hidden in plain sight.</em>

### License

Copyright 2021-2022 <a href='https://drum.work'>DrumWork</a>

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
