# The `tree` in Base Link `code`

This is for compile-time code generation, and possibly runtime code
generation if you generate a tree on the fly.

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
