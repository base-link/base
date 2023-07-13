# Iterators in BaseLink

Rust defines an iterator like this:

```rs
pub trait Iterator {
  type Item;
  fn next(&mut self) -> Option<Self::Item>;
  // ...
}

impl Iterator for Fibonacci {
  type Item = u32;

  fn next(&mut self) -> Option<Self::Item> {
    // ...
  }
}

for i in fibonacci().take(4) {
  println!("> {}", i);
}
```

As such, we do something similar. We call the iterator a `walk`.

```
mask walk
  head link

  task next
    take self, cite flex self
    like maybe, like link

suit fibonacci
  wear iterator
    bind link, like u32
    # ...

save fib, make fibonacci

walk site, loan fib
  like u32
  hook tick
    take i
    show i
```
