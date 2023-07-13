## The `mint` in BaseLink

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
