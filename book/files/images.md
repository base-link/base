# Manipulating Images in BaseLink

You can have a chaining API similar to
[Sharp.js](https://www.digitalocean.com/community/tutorials/how-to-process-images-in-node-js-with-sharp)

```
load @tunebond/cone/code/image
  find make

call make, <image.png>
  call resize
    bind width, size 300
    bind height, size 300
  call grayscale
  call rotate, size 33
  call blur, size 4
  call code
```

The library `@tunebond/cone` is for working with files of various types.
