## The `mask` API

This is an interface for a form.

```
mask base-form
  link name, like term
  link head, list head
  link base, list base
  link bond, list bond
  link hook, list hook
  link task, list task
  link turn, like turn
```

## The error API

```
kink (the error instance)
halt (throwing an error)
```

## The `face` API

A `face` is a native library abstraction, so like an interface
representing some class in JavaScript.

```
face boolean, name <Boolean>
  task value-of, name <valueOf>
    like native-boolean
```
