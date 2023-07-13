## The `mask` in BaseLink

A `mask` is a thing which you cannot instantiate. It is a trait in Rust
terms.

Use masks to define interfaces, either of the properties on a form, or
the tasks of a form, etc..

```
# Add trait
mask addition
  head other, base self
  head output

  task add
    take self, move true
    take other, move true
    like output
```

```
mask iterator
  head item

suit counter
  wear iterator
    bind item, like u32

    task next
      take self, flex true
      like option, like item
```
