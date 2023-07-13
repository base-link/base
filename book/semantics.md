# Semantics of BaseLink

On this page we will outline the basic conceptual model for how we think
of the various things in the BaseLink programming framework. Then the
semantic subpages dig into the specific _terms_ which you can use to
model code like you would in other programming languages.

## Base Type System

We begin by noticing that every "thing" in the universe is a "beat". We
have "types" of things, and "instances" of things. Beat instances are
"sites", and beat types are "casts". We have two key casts then, the
actions or "tasks", and the objects or "forms". These are the two types
of things that we deal with in BaseLink, everything stems from that.

Sites have "links", which are their properties.

### Form

This is a record type. An instance is a site with links.

```link
form bind
  link term, like term
  link code, like code
```

### Task

Tasks are function definitions.

```link
task find-fibonacci-via-loop
  take i, like natural-number
  like natural-number

  save g, mark 0
    flex true

  save o, mark 1
    flex true

  save d
    flex true

  walk test
    test is-gt
      loan i
      text 0
    hook tick
      save d, move o
      save o
        call add
          loan g
          loan d
      save g, move d
      save i
        call decrement
          loan i

  back g
```

Tasks can be nested, creating each their own lexical scope.

### Fork

The lexical scope (the "visible" scope, what you see when you look at
the code) is called a fork. The forks form a stack, and their evolution
forms a tree. These can be directly accessed at various places in the
compiled term set. They can be accessed inside form definitions, as well
as inside tasks.

### Call

Tasks get applied with the call form.

```link
call check-gt
  bind base, loan i
  bind head, text 0
```

You can specify that the call is async with `wait`:

```link
call check-gt-async
  wait true
  loan i
  text 0
```

Likewise, you can define `wait` on the task to say that it is async.

### Hook

Calls can be streams or loops, which emit events. This is implemented
with `hook`.

### Back

Calls automatically return a value without anything, but you can also
return explicity.

```
back 0
```

### Make

The make is the site constructor.

```link
make bind
  bind term, loan term
```

### Load

The load is the import of other modules or "cards". Loads can be nested,
do pattern matching to select out object by type and name.

```link
load ./form
  find form link
  find form move
  find form read
  find form loan
```

### Lead

A lead is returned when there is a potential error or value as options.

### Link

These objects are owned (ownership types / affine types), and references
are passed around in a structured way.

```link
save y, move x  # move
save z, loan y  # borrow
save w, read z  # copy
```

Every variable is immutable by default, but you can specify it as
mutable.

```link
save x, text 10
  flex size
```

### Host

A host is used to define static data.

```link
host hello, text <foo>
host world
  host bar, text <baz>
```

### Card

A card is a module. It belongs to a deck, the package.

### Deck

A deck is a package or project. It belongs to a host, or an
organization/entity.

## Custom DSLs

You can build your own DSLs by defining a mine, mill, and mint which
combines the two.

## Conclusion

These are just some of the semantic terms used in BaseLink, which are
detailed within the semantics subsections.
