# Error Definition and Handling in Base Link

First, in some library, you define your error:

```
kink syntax-error
  head <Syntax error>
  code 1
  link text, like text
  link link, like text
  link band, like text
  hint <To fix this syntax error, try x>

  hook fill
    take self
    host show, call make-kink-show, loan self/text
    host link, loan self/link
    rest self
```

The `code` is meant to be transformed into a string so you can get nice
codes to use in search engines. It's not necessary to define a code.

Then you specify somewhere how the error is rendered, on the CLI. There
is a default renderer, but you can override it on a per-error basis if
you really want to.

```
load ./halt
  take kink syntax-error

kink syntax-error
  hook code
    take code, like size
    call make-code, loan code

  hook show
    take self
    take call, list halt-call
    call make-kink-text
      loan self
      loan call
```

Then you can throw your actual error:

```
load ./halt
  take kink syntax-error

# somewhere in the code
halt syntax-error
  bind text, loan text
  bind link, loan link
  bind band, call make-band, loan text
```

The `halt` basically does:

```
back
  make syntax-error
    ...
```
