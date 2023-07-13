# Graphics in BaseLink

Here is a hello world graphics rendering in BaseLink.

```
load @tunebond/crow
  find draw
  find square

call draw
  make square
    bind size, 100
    bind fill, term red
```
