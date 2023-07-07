# The `form` in Base Link

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

### `loom` in `form`

You can specify to include the entire Loom Tree (AST):

```
form user
  loom true
```

You can specify to include it for only subsets of attachments.

```
form user
  loom link # only include the `link` (property) ASTs
```
