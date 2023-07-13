# The `form` in BaseLink

A `form` is a class or type or struct, like you would find across many
types of programming languages. It can have properties and
functions/methods defined on it, as well as so-called traits or
interfaces which it implements. There is no notion of subtyping.

## Examples

```
form user
  link email, like text
  link name, like text
```

```
form user
  link email, like text
  link name, like text

  task login
    take self, like self
    take username, like text
    take password, like text
    take password-confirmation, like text

    fork test
      call is-equal
        loan password
        loan password-confirmation
      hook true
        # do login
      hook false
        halt invalid-login
```

- wear
- name (for native ones particularly)
- loom
- link

### `wear` in `form`

This is saying that the form implements an interface basically, or
implements a trait (if you're coming from Rust).

### `seed` in `form`

### `head` in `form`

### `bind` in `form`

### `hold` in `form`

### `need` in `form`

This is for the imports when as part of a native binding.

### `mesh` in `form`

You can specify to include the entire Loom Tree (AST):

```
form user
  mesh true
```

You can specify to include it for only subsets of attachments.

```
form user
  mesh link # only include the `link` (property) ASTs
```

### `like` in `form`

### `hold` in `form`

This is for constraints.

```
form email
  like text

  hold true, take self
    call is-email, loan self
```

```
form login
  link email, like email
  link password, like text
  link password-confirmation, like text

  hold true, take self
    call is-equal
      loan self/password
      loan self/password-confirmation
```

That would insert a runtime check that the passwords match upon setting
them.

### Implementing Traits

```rs
impl<T, I: SliceIndex<[T]>, A: Allocator> Index<I> for Vec<T, A>
   type Output = I::Output;

    fn index(&self, index: I) -> &Self::Output {
        Index::index(&**self, index)
    }

   fn index_mut(&mut self, index: I) -> &mut Self::Output {
        IndexMut::index_mut(&mut **self, index)
    }
```

```
form list
  seed item
  seed i, like slice-read, like line, like item
  seed allocator, like allocator

  bind item, loan item
  bind allocator, loan allocator

  wear read
    bind i, loan i
    bind output, loan i/output

    task read
      take self, cite self
      take read, like i
      cite self/output

    task read-flex
      take self, cite flex self
      take read, like i
      cite flex self/output
```

```rs
impl<T> FromIterator<T> for Vec<T> {
    #[inline]
    fn from_iter<I: IntoIterator<Item = T>>(iter: I) -> Vec<T> {
        <Self as SpecFromIter<T, I::IntoIter>>::from_iter(iter.into_iter())
    }
}
```

```
form list
  seed t
  bind t, loan t

  wear from-iterator
    bind t, loan t

    task from-iter
      head i, like into-iterator, bind item, loan t
      take iter, like i
      like list, like t
      ?
```

- https://doc.rust-lang.org/book/ch19-03-advanced-traits.html

Basically a class needs to implement a trait, but that can happen
multiple times. So the thing you are asking is, in a specific context,
use specific different information. So you need to bootstrap or
configure your class at compile time, ignoring some other definitions.
That is, you should only be setting the current value, not setting the
value multiple times and ending with the final one that was set.

Some external library function says "implement this trait for this
class". But we already said implement this trait for this class in
another place. The current project is the focus, so it should have the
ability to make the final decision, even if it came last. So the package
that defines the override gets the final call. The package that is
closest to home, gets the final call.

- https://doc.rust-lang.org/reference/items/associated-items.html
