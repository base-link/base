# Traits in Base Link

In Rust we have:

```rs
pub trait Add<Rhs = Self> {
  type Output;

  fn add(self, rhs: Rhs) -> Self::Output;
}

impl Add for Point {
  type Output = Self;

  fn add(self, other: Self) -> Self {
    Self {
      x: self.x + other.x,
      y: self.y + other.y,
    }
  }
}
```

This might be translated roughly speaking into:

```link
suit add
  head rhs, base self
  head output

  task add
    take self, like self
    take rhs, like rhs
    like output

form point
  wear add
    bind output, like self

    task add
      take self, like self
      take rhs, like self
      like self
      make self

save p, make point
save q, make point
call p/add, q
```
