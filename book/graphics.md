# Graphics in BaseLink

Here is a hello world graphics rendering in BaseLink.

```
load @termsurf/crow
  find draw
  find square

call draw
  make square
    bind size, 100
    bind fill, term red
```

```
curl glyph-g-start
  move x, y
  line x, y
  bend cx, cy, x, y
    turn true
  bend cx, cy, x, y
    turn true
  turn 2
  arch rx, ry, angle, flag1, flag2, x, y
    slot false (absolute position)
  halt lead
```
