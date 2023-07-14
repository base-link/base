# JSON in BaseLink

```
load @tunebond/moon/code/json
  find seek
  find list

make seek
  save key, <value>
  save key
    make seek
      save nested, <value>
  save list
    make list
      save <foo>
      save <bar>
```
