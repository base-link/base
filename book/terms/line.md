# The `line` file in TermTree

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
