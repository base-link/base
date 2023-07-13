# The `meet` in BaseLink

### `meet and`

This is an "and" statement.

```
meet and
  call is-equal
    size 20
    size 20
  call is-equal
    size 10
    size 10
```

### `meet or`

This is the "or" statement.

```
meet or
  call is-equal
    size 10
    size 20
  call is-equal
    size 10
    size 30
  call is-equal
    size 10
    size 10
```

That is short for this:

```
meet or
  hook test
    call is-equal
      size 10
      size 20
  hook test
    call is-equal
      size 10
      size 30
  hook test
    call is-equal
      size 10
      size 10
```
