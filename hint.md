# BaseLink Basic Guide

Here is a brief, partial guide for BaseLink.

1. First we show the _idioms_ (i.e. the how-to guide).
2. Then we show the _keywords_ (i.e. the standard reference).
3. Finally we show some _examples_, to demonstrate how you might write
   some common things.

Overall this guide is meant to be more like a cheat sheet with basic
explanations, to give you a sense of the full possibilities. Moreso than
being an introductory tutorial.

## Idioms

BaseLink idioms are standard ways of doing common programming things.
Here we show how to write BaseLink for common situations.

### Defining a simple variable

```
# x = 10
host x, mark 10
# y = 3.14
host y, comb 3.14
# z = 'hello world'
host z, text <hello world>
```

### Updating a variable

```
save x, mark 20
```

### Digging into a variable

You can read a variable or pass a variable using the read term.

```
read x
```

But you can also dig into an object sort of like a file path (instead of
using `.` like many programming languages).

```
read x/foo
```

You can also interpolate the path like getting dynamically named
properties.

```
read r/{a}/y
```

### Stopping a program

To stop a program, there are two syntaxes:

```
halt flow, text <Message>
halt <Message>
```

### Breaking out of a loop or block

To break out of a loop or block, there are two syntaxes.

```
halt fork, fork term
halt term
```

As long as `term` is not a special halt keyword like `fork` or `flow`.

### Returning a value

To return a value, there is one syntax.

```
back x
```

This sends a variable `x` back to the caller.

_Otherwise, with no back being used, the last term in a block is
returned implicitly._

You can pass in more complex stuff in necessary, such as:

```
back make list
```

To pass a constructed list. But it is ideal to try and keep base only
taking one flat term, so if possible make the return value into a local
variable first.

```
host x, make list
base x
```

### Calling a function

```
call x
call foo/bar
  mark 10
```

### Chaining function/property calls

### Setting a property/input default

To set a default value, there are two syntaxes:

```
base back, mark 1
base 1
```

### Defining a "class" function

To define a class function, there is one form. You don't define them on
the "form", you simply define a namespace, which is all that it really
is in the end.

```
form user

host user-task
  task x
  task y

call user-task/x
```

### Defining a variable

```
# x = 10
host x, mark 10
```

### Defining an integer

Integers get a special term they are wrapped in typically, to make it
clear to the compiler what is being passed.

```
mark 10
```

### Defining a decimal number

Decimals (or "doubles" or "floats") get a special term they are wrapped
in typically, to make it clear to the compiler what is being passed.

```
comb 3.14159265
```

### Defining a string

In BaseLink, strings are called "text". They are typically wrapped when
it helps with a term like integers and decimals.

```
text <This is some text.>
```

### Interpolate text

### Interpolate a term

```
# interpolates at compile time
form mark-{size}
# interpolates at runtime
form mark-{{size}}
```

### Instantiate a class

```
make user
  bind email, text <foo@bar.com>
```

## Keywords

### `form`

A form is a class basically, something that instantiates an object.

```
form user
  link email, like text

  task login
    take email
    take password
    call service/login
      read email
      read password
```

There are 3 syntaxes for forms, depending on what you want to do.

1. **Basic forms**: These are defining constructors for objects.
2. **Alias forms**: These are giving a new (typically shorter) Mesh to
   an existing form with a potentially complex signature.
3. **Enumerated forms**: These "enum forms" are lists of possible values
   a form can take. Each enum "case" is considered a type of this form,
   but you can also use the enum form directly to specify a form.

The above is a _basic form_ (a "base form"). Next here is an _alias
form_ (a "like form").

```
form x
  like user
```

It uses the `like` to specify a potentially complex form inside.

Finally the _enumeraed form_ is like this (the "case form").

```
form x
  case y
  case z
```

A complex alias form is like this:

```
form return-type, name <ReturnType>
  head t, like like-link-text
    base task-link-text
      take args, like native-any
        rest true
      free seed, like native-any

  like test-link-text
    stem roll
      like t
      like task-link-text
        take args, like native-any
          rest true
        free seed, name r
      hook true
        like r
      hook false
        like native-any
```

### `task`

A task is a function.

### `take`

A take is an input value (on a task) or public property (on a form). It
takes a type ("like"), and can take a default value.

```
take x, like mark
  base 0
```

### `head`

A head has a similar syntax as a take, but it is used for "type
generics".

```
head x
```

### `like`

This is used to define the type of some variable. It is different from a
_form_, which is the definition of the type itself. This is not the
definition, but a reference to the type matching its pattern.

Some examples include:

```
like task
  head x
  take y
  like z
like list
  like x
like or
  like x
  like y
  like z
like and
  like x
  like y
  like z
like maybe
  like x
```

### `host`

A host is a constant piece of data definition.

### `mark`

A mark is an integer.

### `comb`

A comb is a decimal number.

### `text`

A text is a string.

### `code`

A code is a custom representation of binary, octal, hex, or unicode, and
potentially others.

### `term`

A term just references a standard keyword.

### `time`

A time is a lifetime, as in Rust. It tells the compiler the lifetime of
a variable.

### `read`

- `loan`: Whether or not the value is borrowed.
- `move`: Whether or not to move the ownership.
- `flex`: Whether or not it is mutable.

### `call`

A call is calling a task (function).

Because a function always has named parameters, there are at least two
ways to pass the parameters to the call.

- **Implicit binding**: Pass the value directly, _without_ a name.
- **Explicit binding**: Pass the value _with_ a name.

```
# implicit
call 1/add, mark 2
# explicit
call 1/add, bind other, mark 2
```

Much of the time you can use implicit bindings to shorten your code. But
sometimes it makes it more readable (and sometimes necessary due to task
overloading possibilities) if you are explicit about naming the input
parameter.

### `make`

This is a constructor function, like calling `new` in other programming
languages.

### `load`

This is for importing other modules ("cards") into the current card.

### `tree`

A tree is a reusable chunk of code, like a macro. There is a "bind hook"
which puts you into the context of the thing where the tree is being
_fused_. The tree fusion can take parameters as well.

```
form mark-8
  fuse mark
    bind size, mark 8

tree mark
  take size, like mark-8

  hook bind
    form mark-{size}
      task seek-add
        take a, like mark-{size}
        take b, like mark-{size}
        fuse free-result, like mark-{size}
        save c
          call add-js
            read a
            read b
        fuse is-below-or-return-error
          read c
          mark 256
        move c
```

### `slot`

A slot is a place which you can mark, which you can return to in future
contexts within the code. You return to the slot with `beam`. An example
of where you might use this is in a walk (iteration) over some value, to
dynamically define a form.

```
form x
  slot self
  walk list, read something
    hook tick
      take site
      beam self
        link {site/name}, like {site/type}
```

Here we dynamically define attributes on the form (`link`). The beam is
required so we know what context we are using the DSL terms in.

### `walk`

These are for doing loops. You can walk a list, or more generally any
_iterator_. Or you can just loop until a condition is met, or loop
indefinitely.

```
walk list
```

```
walk test
```

```
walk halt
```

You can give each of these walks a name, so we know what the loop is
called and can break out of it.

```
walk list, name foo
  halt foo
```

### `fork`

A fork is a simple branch in code. These are used for if-statements and
switch statements, but not loops. Loops are using `walk`.

There are a few types of forks:

- Simple If statement.
- If/else/else... statement.
- Switch statement.

```
fork test
  call a/is-below, mark 10
  hook true
    show <is below!>
```

```
fork roll
  fork test
    call a/is-below, mark 10
    hook true
      show <is below 10!>
  fork test
    call a/is-below, mark 100
    hook true
      show <is below 100!>
  fall back
    show <is not below 100!>
```

```
fork case, read status
  case term success
    show <saved file>
  case term failure
    show <didn't save file>
  fall back
    show <something else>
```

The case statement for checking the types:

```
fork case, loan status/form
  case like foo
  case like bar
```

### `show`

This is a simple debug printing tool for the command-line.

```
show <text>
```

### `back`

### `halt`

### `risk`

A risk tells if a particular task is unsafe (like in rust).

### `suit`

### `wear`

## Types

Here is a list of standard types.

| base name | traditional name                                |
| :-------- | :---------------------------------------------- |
| `mark`    | `UInt`, `BigUInt`, etc. (unsigned integer)      |
| `diff`    | `Int`, `BigInt` (signed integer)                |
| `comb`    | `Decimal` (float, double, bignumber)            |
| `comb-32` | `Float` (signed decimal 32 bits, 7 precision)   |
| `comb-64` | `Double` (signed decimal 64 bits, 15 precision) |
| `text`    | `String`                                        |
| `wave`    | `Boolean`                                       |
| `line`    | `Array`, `Slice`, etc.                          |
| `foul`    | `Error`                                         |
| `form`    | `Class`, `Type`                                 |
| `task`    | `Function`, `Closure`                           |
| `suit`    | `Mixin`, `Trait`, `Interface`                   |
| `void`    | `Null`, `Nil`                                   |
| `walk`    | `Iterator`                                      |
| `test`    | `Assertion`                                     |
| `flow`    | `Process`                                       |
| `maybe`   | `Maybe`, `Option`, etc.                         |
| `result`  | `Result`                                        |
| `ok`      | `Ok`                                            |
| `and`     | `And`                                           |
| `or`      | `Or`                                            |

## Examples

<img src="https://github.com/tunebond/link/blob/make/view/tree.png?raw=true" />

---

<img src="https://github.com/tunebond/link/blob/make/view/mine.png?raw=true" />

---

<img src="https://github.com/tunebond/link/blob/make/view/lace.png?raw=true" />

## Other DSLs

### The deck card

This is a special kind of file, the deck file, which allows you to
define the structure of a deck.

### The host card
