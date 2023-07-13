# Traits in BaseLink

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
mask add
  head rhs, base self
  head output

  task add
    take self, like self
    take rhs, like rhs
    like output

form point
  link x
  link y

suit point
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

```rs
trait Container {
  type E;
  fn insert(&mut self, elem: Self::E);
}

impl<T> Container for Vec<T> {
  type E = T;
  fn insert(&mut self, x: T) { self.push(x); }
}
```

```link
mask container
  head e
  task insert
    take self, cite flex self
    take elem, like e

suit vec
  seed t
  bind t, loan t

  wear container
    bind e, loan t

    task insert
      take self, cite flex self
      take x, like t
```
