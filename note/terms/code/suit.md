## The `suit` in Base Link

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
    head item, form u32

    task next
      take self, flex true
      like option
        like item
```
