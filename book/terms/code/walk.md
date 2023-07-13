# The `walk` in BaseLink

A walk works on an "iterator". Anything that is an iterator can be used
in the walk.

### `walk site`

A site is a generic word for any instance.

```
# just before it starts
hold x
hold y

walk site, loan x
  name p
  hook tick # each step
    take a, name w
    call x
    halt p

# when it's done
hold x
hold y
```

You can use the "precondition" before to add constraints which must be
invariant before the loop starts. The `hook tick` can be used for
invariants at each step, and the actual code for the loop. And then
after holds can be invariants that hold at the end.

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
walk test, name x
  hook test
    call is-less, 1, 2
  hook tick
    show <step>
```
