# The `call` in BaseLink `code`

These are the evaluation of tasks (functions), the called function.

They can be chained together with nested `call`.

```
call make, <image.png>
  link resize
    bind width, size 300
    bind height, size 300
  link grayscale
  link rotate, size 33
  link blur, size 4
  link code
```

The convention for tasks is to have a chainable API which constructs
declarative configuration state objects, and another API which takes
that predefined declarative state as input. Both methods are called the
same thing, they just take different parameters. The chainable API
constructs a "builder" object which has methods on it, and then at the
end you call a final function to do the actual call with the built
configuration. These are just conventions for defining declarative
state-based APIs, and fluent chainable APIs, in the same system.

So for constructing views, we have the `zone` API for declaring views,
but you also have the chainable API for constructing views.
