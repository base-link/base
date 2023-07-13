# Scope in BaseLink

A card has access to these variables within its scope:

```
card # the current file
card/link # the file path
base # the main world
base/host # environment variables
fork # current scope
flow # the current process
```

It has access to these at compile time as well.

Inside a task, we have access to the calling task as well:

```
task
```

The riff has stuff to go off of.
