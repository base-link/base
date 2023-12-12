# Lists in BaseLink

Lists, also known as arrays, provide a way to store and manipulate
collections of elements in a specific order. In BaseLink, you can
utilize the @termsurf/bolt module to work with lists seamlessly. Let's
explore the capabilities and functionality of BaseLink's API for lists
using the following code snippet:

```
load @termsurf/bolt
  find list

save x
  make list
    save <one>
    save <two>

call x/save, <three>
```

The `make save` is calling a chained method called `save` on the list
instance.

Lists in BaseLink provide a flexible and efficient way to store and
manipulate collections of data. You can easily add, remove, and access
elements within the list using the provided API. Additionally, you can
leverage other list-related operations such as sorting, filtering, and
iterating over the elements.

By using lists in BaseLink, you can handle scenarios that involve
managing sets of related data, iterating over collections, implementing
algorithms, and much more. Lists enable you to organize and process data
in a structured and efficient manner, allowing you to build robust and
scalable solutions.

The @termsurf/bolt module's list API empowers you to work with lists
seamlessly, providing a range of operations to manipulate and interact
with list data. Whether you're building applications, performing data
transformations, or implementing complex algorithms, lists in BaseLink
offer a powerful toolset to tackle these tasks effectively and
efficiently.

## Linked Lists

```
load @termsurf/bolt/code/base/list/link
  find list
```

## Inspiration

- https://doc.rust-lang.org/std/collections/index.html
