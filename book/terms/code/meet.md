# The `meet` in Base Link

### `meet link`

This is an "and" statement.

```
meet link
  call is-equal
    size 20
    size 20
  call is-equal
    size 10
    size 10
```

### `meet sink`

This is the "or" statement.

```
meet sink
  test is-equal
    size 10
    size 20
  test is-equal
    size 10
    size 30
  test is-equal
    size 10
    size 10
```

That is short for this:

```
meet sink
  hook test
    test is-equal
      size 10
      size 20
  hook test
    test is-equal
      size 10
      size 30
  hook test
    test is-equal
      size 10
      size 10
```
