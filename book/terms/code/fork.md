# The `fork` in BaseLink

The `fork` is a term for creating branches in code. These are typically
done when using if-statements, loops, switch-statements, or you just
want to create a new isolated scope. The fork is used for all of these
except for loops, which are handled by the `walk` term.

### `fork test`

This is an "if statement"

```
fork test
  call is-equal, 1, 2
  hook true, show <is equal>
  hook false, show <is not equal>
```

### `fork roll`

This is an "if else statement", where you can have a lot of "else if"
branches. So essentially, it finds the first match.

```
fork roll
  hook test
    call is-equal, 1, 2
    hook true
      show <is equal 1 2>
    hook false
      show <is not equal 1 2>
  hook test
    call is-equal, 1, 1
    hook true
      show <is equal 1 1>
    hook false
      show <is not equal 1 1>
  hook fall # default case
    show <none>
```

### `fork case`

This is a switch statement basically.

```
fork case, 1/add 2
  case 1
    show <is 1>
  case 2
    show <is 2>
  case 3
    show <is 3>
```

### `fork tree`

This is creating a custom scope.

```
fork tree
  save x, 20
  show <{x}> # 20

show <{x}> # error
```

You can even give it a name, so it can be exited out of by name.

```
fork tree, name foo
```
