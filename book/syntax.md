# The Syntax of BaseLink

## Overview

BaseLink uses LinkText for its syntax. LinkText is a little more than a
markup language, tending toward a programming language. It is a way to
model information and computation in an easy to read and write format,
suitable for hierarchical note taking and other means of capturing data
down into structured form.

It emerged out of the desire to have one way of writing things (notes,
code, data models, etc.), that was not too verbose and was easy to learn
with very few rules. Writing in all lowercase without having to use the
shift key streamlines your typing so you can stream out your knowledge
the most quickly. Existing markup languages like XML, JSON, and YAML are
too static and don't let you define things in as concise a way as
possible. It is indentation-based, and the typical style of a DSL is to
write it in a somewhat repetitive way to give the quick visual cues as
to the meaning of things. But the way you use it is entirely up to you,
those are just style conventions.

## Example

First, some images of different usages of LinkText. Here are a few
examples from existing code. The first is how you might define a "deck"
(a "package" of Link code). The second is the first part of the Tao Te
Ching captured in a tree, and the later we show how you might write a
simple fibonacci function. These examples are DSLs designed for a
specific purposes. As you will see in the syntax section, the Link
language is independent of a DSL and simply defines some simple idioms
for defining trees of text.

A package definition:

```link
deck @termsurf/base
  mark <0.0.1>
  head <A LinkText Package Manager>
  term link-text
  term computation
  term philosophy
  term information
  term platform
  term white-label
  term compiler
  face <Lance Pollard>, site <lp@elk.fm>
  task ./task
  read ./note
  lock apache-2
  sort tool
  link @termsurf/bolt, mark <0.x.x>
  link @termsurf/nest, mark <0.x.x>
  link @termsurf/crow, mark <0.x.x>
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

And now for some pictures of the code, since we can't get GitHub to
offer syntax highlighting for a while.

<img src="https://github.com/termsurf/link/blob/make/view/tree.png?raw=true" />

---

<img src="https://github.com/termsurf/link/blob/make/view/mine.png?raw=true" />

---

<img src="https://github.com/termsurf/link/blob/make/view/lace.png?raw=true" />

## Specification

Now we will go into the actual specification of the syntax. The Link
specification language is a minimal modeling language that is
transformable into code. The file extension to be used is `.link`, as in
`file.link`. It has the following syntax.

### Term

The first thing to cover are _terms_. They are composed of _words_,
separated by dashes. A word is composed of lowercase ascii letters or
numbers. A term can't start with a number. So the following are all
words of a term.

```link
xo
hello-world
foo-bar-baz
abc123
```

The following is a valid term too! Starting a variable name with a
number.

```link
1xo
```

You just can't have terms that are _only_ numbers. That would be a
number.

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

You can put things in parentheses too to make it easier to write on one
line:

```link
add(a, subtract(b, c))
```

The same as:

```link
add a, subtract b, c
```

### Size

You can use numbers ("sizes") in the system too:

```link
add 1, 2
```

An unsigned integer is called a sided-size.

### Comb

A comb is a decimal number.

```link
add 1, subtract -2, 3.14
```

### Text

A more complex structure is the _text_. They are composed of a weaving
of _cords_ (strings) and _terms_. A string/cord is a contiguous sequence
of arbitrary unicode (utf-8).

A simple template composed only of a string is:

```link
write <hello world>
```

Or multiline text:

```link
text <
  This is a long paragraph.

  And this is another paragraph.
>
```

Or even:

```link
form user
  note
    <
      This is a long paragraph.

      And this is another paragraph.
    >
```

### Nick

Then we can add interpolation ("nick") into the template, by referencing
terms wrapped in angle brackets:

```link
write <{hello-world}>
```

A more robust example might be:

```link
moon <The moon has a period of roughly {bold(<28 days>)}.>
```

Note though, you can still use the angle bracket symbols in regular text
without ambiguity, you just need to prefix them with backslashes.

```link
i <am \<brackets\> included in the actual string>
```

You can write interpolation on multiple lines, but things must line up.

```
i am {{
  some interpolation {{
    here
  }}
  or
  {
    here
  }
}}
```

Same with "culling", you can use that on multiple lines in the same way.

```
i am[
  some culling[
    here
  ], or[
    here
  ]
]
```

### Code

You can write specific code points, or _codes_, by prefixing the number
sign / hash symbol along with a letter representing the code type,
followed by the code.

```link
i #b0101, am bits
i #o123, am octal
i #xaaaaaa, am hex
```

These can also be used directly in a template:

```link
i <am the symbol #x2665>
```

This makes it so you can reference obscure symbols by their numerical
value, or write bits and things like that. Note though, these just get
compiled down to the following, so the code handler would need to
resolve them properly in the proper context.

An arbitrary base code can be produced with `#<num>n<value>`, like this
for base 60:

```
#60n123
```

### Knit

A knit is a selector, which is a digging down into terms. They look like
paths, but they are really diving down into terms, if you think of it
that way.

```link
get foo/bar
```

Finally, you can do actual interpolations beyond property/array lookups:

```link
get foo{bar}{{baz}}/{{{bing}}}boop
```

In theory, the number of brackets means the number of passes the
compiler has to go through it, so if it's 2 brackets, that will be
compiled to 1 bracket, and that 1 bracket will be evaluated at runtime.

### Line

A line is a path, like a file path. Because paths are so common in
programming, they don't need to be treated as strings but can be written
directly. The special `@` symbol is for referencing relative to some
"scope" or context, which you would handle in your interpreter of Link
Text.

```link
load @some/path
load ./relative/path.png
load /an-absolute/other/path.js
load **/*.js
hook /@:user
```

That is, they are just special strings. You can interpolate on them like
strings as well with curly brackets.

## Types

All of the TypeScript types below, which have a `form`, are part of the
Link Tree, the AST for LinkText. This is the exact structure of the AST.

```ts
export type LinkFold = {
  base?: Leaf
  head?: Leaf
}

export type LinkTree = {
  nest: LinkFork
  form: LinkName.Tree
}

export type LinkFork = {
  fold?: LinkFold
  nest: Array<
    | LinkText
    | LinkFork
    | LinkSize
    | LinkText
    | LinkCord
    | LinkNick
    | LinkCull
    | LinkComb
    | LinkCode
    | LinkKnit
  >
  base?: LinkFork | LinkNick | LinkCull
  form: LinkName.Fork
}

export type LinkComb = {
  form: LinkName.Comb
  bond: number
  base?: LinkCull | LinkFork
  leaf: Leaf
}

export type LinkCode = {
  bond: number
  mold: string
  base?: LinkCull | LinkFork
  form: LinkName.Code
  leaf: Leaf
}

export type LinkCull = {
  nest?: LinkFork | LinkSize | LinkKnit
  base?: LinkKnit
  form: LinkName.Cull
  fold?: LinkFold
}

export type LinkKnit = {
  base?: LinkFork
  nest: Array<LinkCull | LinkNick | LinkCord>
  form: LinkName.Knit
  fold?: LinkFold
}

export type LinkNick = {
  nest?: LinkFork
  base?: LinkKnit | LinkText
  size: number
  form: LinkName.Nick
  fold?: LinkFold
}

export type LinkCord = {
  form: LinkName.Cord
  base?: LinkText
  leaf: Leaf
}

export type LinkText = {
  nest: Array<LinkCord | LinkNick>
  form: LinkName.Text
  base?: LinkCull | LinkFork
  fold?: LinkFold
}

export type LinkSize = {
  form: LinkName.Size
  bond: number
  base?: LinkCull | LinkFork
  leaf: Leaf
}
```

You'll notice, each element has a reference back to it's parent, for
easier traversal. And if it has nested content, it is in the `nest`
property.

A `LinkTree` is at the top, this is what gets returned by the parser. A
`LinkFork` is a slot for an element to go in the tree. Forks can be
nested, and can nest every element except the `LinkTree` (which is the
special base element).

A `LinkKnit` is a weaving between `LinkCord` and `LinkNick` and
`LinkCull`. This is the interpolation and such going on which can be in
place of a simple term. Ultimately the knit gets resolved to either a
term or a path in the end, which the compiler reads to figure out what
to do with.

A `LinkCord` is a contiguous string. A `LinkNick` is the curly brackets
and everything nested inside. And a `LinkCull` is the square brackets
and everything nested inside.

A `LinkText` is a weaving of `LinkCord` and `LinkNick`, inside the
text-delimiting angle brackets. So it is strings separated by optional
interpolation basically.

The `LinkNick` has inside of it a `LinkFork`, which is the space where
it can start adding nested elements. Same with the `LinkCull`, it has a
`LinkFork` inside of it, but the cull can also have `LinkSize`, an
integer, for array lookups.

The "primitive" contiguous structures, like the numbers, strings, and
codes, have a `leaf` property to access the token which was taken out of
the text input stream. The non-primitive or complex nested types also
have a `fold` property, which is used to keep track of a starting and
ending leaf that sets its boundaries. This way the parser can highlight
blocks of text in the source code.

So you can do essentially:

```
# nested seeds (seeds = elements)
seed/fold/base/text
seed/fold/head/text

# leaf seeds
seed/leaf/text
```

## Conclusion

That is all there is to it! It is a simple way of defining trees of
text, allowing for template variables inside text, and for basic
primitives. It is then up to you to figure out what you want to do with
it.
