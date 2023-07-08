# Error Definition and Handling in Base Link

First, in some library, you define your error:

```
load @tunebond/bolt/code/kink
  find suit fill

kink syntax-error
  head <Syntax error>
  code 1
  hint <To fix this syntax error, try x>

  link text, like text
  link link, like text
  link band, like text

  link show, void text
  link link, void text

  wear fill
    task fill
      take self
      save self/show, call make-kink-show, loan self/text
      save self/link, loan self/link
```

The `code` is meant to be transformed into a string so you can get nice
codes to use in search engines. It's not necessary to define a code.

Then you specify somewhere how the error is rendered, on the CLI. There
is a default renderer, but you can override it on a per-error basis if
you really want to.

```
load @tunebond/bolt/code/kink
  find suit show

load ./halt
  take kink syntax-error

kink syntax-error
  wear show
    task show
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
