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
