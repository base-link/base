# The `mine` in BaseLink

## Parsing Bytes with `mine`

This is how you build a text parsing grammar, which is a set of rules
for how to parse the text or bytes.

### `mine text`

Match actual literal text.

```
mine text, text <=>
```

### `mine code`

Match actual literal bytes.

```
mine code, code #b00000100
```

### `mine list`

This is to parse a specific number of items.

```
mine list
  bind size, size 10
```

Likewise you can do a range.

### `mine head`

Match the first value (pick a choice basically).

### `mine room`

This means an optional parse of what's inside.

### `mine case`

This means you are matching as many of these examples in any order as
you'd like.

### `mine miss`

This means you want to _not_ match what's inside.

### `mine hunk`

Match a block of elements.

```
mine hunk
  mine form, form dquote
  mine list, form cookie-octet
  mine form, form dquote
```

### `mine form`

This delegates to separate mine definitions to parse complex structures.

### `mine band`

This means parsing values between (and including) two values.

```
mine ascii
  mine band
    bind base, text 0
    bind head, text 127
```

You can also do it non-inclusive:

```
mine ascii
  mine band
    bind rise, text 0
    bind fall, text 127
```

### `mine test`

This is for checking if a value fits certain constraints, and if so, it
executes the parser for that branch.

```
mine test
  call is-equal
    bind base, link x
    bind head, link y
  mine ...
```

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

## Parsing LinkText with `mine`

The `mill` DSL is for parsing LinkText, the tree of terms you see in the
BaseLink environment. It is divided into a `mine` layer, which emits
things it finds in the tree based on certain patterns you define, and
the `mint`, which takes what is emitted from the mine and converts it
into AST objects. So you just:

1. Define what the pattern recognition rules are in the `mine`. These
   form a tree.
2. Specify what to `take` out of each pattern recognized in the `mine`
   tree.
3. Handle each `take` in the `mint`, and generate an AST structure.

The mill then takes these two declarative rule sets, and turns it into a
parser. The parser then does a lazy approach, as opposed to greedy. That
is, it matches the minimal amount possible. The end result here is, the
parser parses LinkText and generates the Loom Tree. The Loom Tree is the
AST the compiler uses.

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

Same syntax as `mine head` for text.

### `mine back`

Same syntax as `mine back` for text.
