## The `tree` API

A `tree` is a template basically, or like a Ruby module to some degree.
It binds to the context it is fused into at compile time or runtime, and
injects content into that context.

#### tree name

Define the name of the tree.

```
tree tree-name
```

#### tree inputs

Define the inputs to the tree template.

```
tree tree-name
  take input-1-name
  take input-2-name
```

#### tree binding

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

#### Trees for typescript types

```
tree omit
  take type
  take keys
    base
      like key-list
        like any

  hook bind
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

## The `suit` API

A `suit` is a type which you cannot instantiate. It is a trait in Rust
terms.

Use suits to define interfaces, either of the properties on a form, or
the tasks of a form, etc..

```
# Add trait
suit addition
  head other, base self
  head output

  task add
    take self, move true
    take other, move true
    like output
```

```rust
pub trait Iterator {
  type Item;

  fn next(&mut self) -> Option<Self::Item>;
}

impl Iterator for Counter {
  type Item = u32;

  fn next(&mut self) -> Option<Self::Item> {
```

https://stackoverflow.com/questions/32059370/when-is-it-appropriate-to-use-an-associated-type-versus-a-generic-type

```
suit iterator
  head item

form counter
  wear iterator
    bind item, form u32

    task next
      take self, flex true
      like option
        like item
```

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
