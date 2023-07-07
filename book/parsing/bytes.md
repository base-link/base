## `mine`

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
mine code, code #b100
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
