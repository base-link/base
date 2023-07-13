# The `tree` in BaseLink `code`

This is for compile-time code generation, and possibly runtime code
generation if you generate a tree on the fly.

A `tree` is a template basically, or like a Ruby module to some degree.
It binds to the context it is fused into at compile time or runtime, and
injects content into that context.

### `take` in `tree`

These are just the input parameters to the tree, like in tasks.

### `hook fuse` in `tree`

```
tree try
  take result

  hook fuse
    fork case
      call read-form
        loan result
      case ok
        loan result/value
      case kink
        back result
```

### tree name

Define the name of the tree.

```
tree tree-name
```

### tree inputs

Define the inputs to the tree template.

```
tree tree-name
  take input-1-name
  take input-2-name
```

### tree binding

```
form form-name
  fuse tree-name

tree tree-name
  hook fuse
    link link-1-name
```

That results in:

```
form form-name
  link link-1-name
```

### Trees for typescript types

```
tree omit
  take type
  take keys
    base
      like key-list
        like any

  hook fuse
    slot form
    [loop through and pick the non-matching keys]

form user
  link email
  link name

form user-without-email
  fuse omit
    loan user
    term email
```
