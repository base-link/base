# Parsing Link Text

The `mill` DSL is for parsing Link Text, the tree of terms you see in
the Base Link environment. It is divided into a `mine` layer, which
emits things it finds in the tree based on certain patterns you define,
and the `mint`, which takes what is emitted from the mine and converts
it into AST objects. So you just:

1. Define what the pattern recognition rules are in the `mine`. These
   form a tree.
2. Specify what to `take` out of each pattern recognized in the `mine`
   tree.
3. Handle each `take` in the `mint`, and generate an AST structure.

The mill then takes these two declarative rule sets, and turns it into a
parser. The parser then does a lazy approach, as opposed to greedy. That
is, it matches the minimal amount possible.

## `mine`

Mine's get a name, and have a tree of parsing rules inside. They specify
what they `take` or capture as output.

### `mine text`

This allows you to match text. This enters you into "text mode", so you
can match specific text using the text parsing DSL.

```
mine deck
  mine term, term deck
    mine text
      mine text, text <@>
      mine form, form term
        take host
      mine text, text </>
      mine form, form term
        take name
```

### `mine term`

This says you are matching a term.

### `mine line`

This says you are matching a path, which encompasses a term (a line with
only one segment).

### `mine form`

This says you are matching a complex nested structure, defined by
another `mine`.

```
mine form, form save
  take save
```

### `mine list`

This means you can process many patterns in a sequence.

```
mine list
  bind base, size 10
  bind head, size 20
```

This gives you the ability to specify a range of how many to match.

### `mine room`

This means an optional parse of what's inside.

### `mine sift`

This means you are matching one of them inside.

### `mine case`

This means you are matching as many of these examples in any order as
you'd like.

### `mine hunk`

Match a block of elements.

### `mine miss`

This means you want to _not_ match what's inside.

### `mine test`

### `mine head`

This is a "lookahead" construct.

> look for `x`, but match only if followed by `y`.

```
mine head
  mine form, form x
  mine form, form y
```

Or a "negative lookahead":

> look for `x`, but match only if _not_ followed by `y`.

```
mine head
  mine form, form x
  mine miss, mine form, form y
```

### `mine back`

This is a "positive lookbehind":

> match `x`, but only if there’s `y` before it

```
mine back
  mine form, form x
  mine form, form y
```

Then a "negative lookbehind":

> match `x`, but only if there’s _not_ `y` before it

```
mine back
  mine form, form x
  mine miss, mine form, form y
```

## `mint`

Here's an example:

```
mint call
  mint name
    save name
  mint bind, form bind
    line bind
  mint flow, form flow
    line flow
  mint hook, form hook
    knit hook, site name
  make call
    bind name, move name
    bind bind, move bind
    bind hook, move hook
```

In here, the mint name is the thing we `take` from the `mine`. You can
either `save`, `line`, or `knit` it.

### `save` in `mint`

This saves the output as a named variable, just one item.

### `line` in `mint`

This appends the output to a named variable, so this is an array of
items.

### `knit` in `mint`

This sets the value as a key in a hash map.

### `form` in `mint`

This tells us that the mine is processed in another mint handler.

### `make` in `mint`

This tells us the object we want to construct.

## How parsing works

Given the link tree (a data structure produced by the `@tunebond/link`
parser), it processes it. If it encounters interpolation, it skips over
it and waits for it to be resolved before continuing back where it left
off. This is the `mine` step.

Then out of the mine are emitted "takes", which it passes to the `mint`.
The mint handles each take and generates the "loom" tree. This is the
main AST used by the compiler.
