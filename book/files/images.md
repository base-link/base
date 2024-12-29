# Manipulating Images in TermTree

You can have a chaining API similar to
[Sharp.js](https://www.digitalocean.com/community/tutorials/how-to-process-images-in-node-js-with-sharp)

```
load @cluesurf/cone/code/image
  find make

call make, <image.png>
  link resize
    bind width, size 300
    bind height, size 300
  link grayscale
  link rotate, size 33
  link blur, size 4
  link code
```

The library `@cluesurf/cone` is for working with files of various types.
