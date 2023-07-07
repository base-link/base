# The `walk` in Base Link

### `walk list`

```
walk list, loan x
  fork p
  hook take
    hold x
    hold y
  hook free
    hold x
    hold y
  hook tick
    take a, name w
    call x
    bust p
```

### `walk size`

```
walk size
  bind base, size 3
  bind head, size 10
  hook tick
    take i
```

### `walk test`

```
walk test, fork name
  call is-less
  show <step>
```
