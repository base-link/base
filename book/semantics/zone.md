# The `zone` file in BaseLink

The `zone` is a UI component, which could be an actual `slab` (a visual
element), or a meta component which doesn't have any visual
functionality.

```
zone my-button
  take link
  take text

  zone button
    bind nest, loan text
    hook click
      call open-url, loan link
```
