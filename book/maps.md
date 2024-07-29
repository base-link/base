# Maps in NoteTree

Maps, also known as hash maps or dictionaries, are powerful data
structures that allow efficient storage and retrieval of key-value
pairs. In NoteTree, you can leverage the built-in `@termsurf/base`
module to work with maps seamlessly. Let's explore the potential use
cases and the functionality provided by the NoteTree API for hash
tables.

```link
load @termsurf/base
  find seek

save x
  make seek
    save <Foo>, <bar>
    save <Key>, <value>

call x/save, <Another key>, 123
save foo, call x/read, <Foo>
call x/size

walk seek, loan x
  hook tick
    take key
    show <{key}>
```

The above code snippet demonstrates the usage of maps in NoteTree.

Maps are versatile data structures that can be used in various
scenarios, such as caching, data indexing, lookup tables, and more. With
NoteTree's hash table API, you have the flexibility to store, retrieve,
and manipulate key-value pairs efficiently. Whether you need to store
configuration settings, track user preferences, or manage data
relationships, maps in NoteTree provide a powerful tool to handle these
tasks with ease and speed.

You can get specific implementations of maps by going directly to the
source.

```
load @termsurf/base/code/seek/b-tree
  find seek
load @termsurf/base/code/seek/hash/quadratic-probing
  find seek
```
