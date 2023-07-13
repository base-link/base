# The `need` in BaseLink `code`

This is for imports from external native libraries, like Swift libraries
or Node.js modules.

```
need fs, load <fs>

task create-file
  need fs
```
