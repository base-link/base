# The `line` file in NoteTree

```
# file named foo.note
hook bar
  take help
    take <-h>
    take <--help>
```

Matches from the CLI:

```
foo bar --help
```
