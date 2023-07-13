# Introduction to BaseLink

BaseLink is the programming environment for LinkText, a minimal data
modeling language. It is a statically typed, imperative, object oriented
language which (at some point in the future) will compile down to JS,
Swift, Rust, and Kotlin, to cover the main environments where the code
should run. While being statically typed, it also has dynamic features
such as reflection, to make it robust. In addition, it is a way to
capture knowledge in a structured way, and to make it executable or
otherwise machine readable, while also being human readable.

_This is all just experimentation at this point, so buyer beware! But
would love to bounce off ideas with anyone out there interested in
programming language design and implementation._

## Goals

There are a few goals for making this language:

1. **Reading**. By having a very minimal syntax, it means less to put in
   your memory and less to visually parse, even if it is more verbose in
   the end. It's along the same lines as explicit is better than
   implicit.
2. **Writing**. In many cases when you take notes you just want to
   create simple records of things, especially if you are curating
   information. This format minimizes the amount of note taking while
   maximizing readability.
3. **Communicating**. Having a normalized way of writing algorithms and
   types and such in a readable language in academic papers would be
   nice, instead of every paper inventing their own syntax.
4. **Structuring**. Almost all code except really for the
   functions/actions themselves can be declarative. So writing most code
   in a concise and readable form would make coding even more rewarding,
   and would make the mental model as simple as possible.
5. **Customizing**. Having the ability to create your own writing tree
   structures for your own knowledge domains would mean you can make
   your knowledge structured and readable. A lot of writing software
   APIs is about creating a domain specific language (DSL), or chainable
   APIs which are basically the same thing.
6. **Working**. Customizability is great for establishing conventions,
   which you can reuse to reduce mental burden and move quickly, while
   making sure it is readable and concise to not just you but your team
   and the community.
7. **Programming**. At the same time of getting these "data modeling"
   advantages, it would be nice to be able to full on write programs. So
   we aim to make a system where you can write readable programs.
8. **Optimizing**. And if you are writing readable programs in a nice
   DSL, they should be as optimized as possible. So the goal is to make
   it so optimizations can be take to the extreme, somehow without
   making them get in the way of readability.
9. **Compiling**. It should compile and work on all the native platforms
   and environments, at least JS in the browser, Node.js, and Windows,
   Kotlin on Android, Rust for Linux, and Swift for Apple products.
10. **Sharing**. It should work like any of the best languages with
    their package management, like Node's modules or Rust's crates.
    Sharing should be easy and seamless.
11. **Learning**. It should require minimal learning for anyone to get
    started, and all the tooling should be very well designed with a
    great UX. Still a long way to go to get there, but working on it.
12. **Pleasing**. It should be visually pleasing to the eye, and
    stimulating when you experience it.

## Drawbacks

Some of the drawbacks to BaseLink are:

1. **Verbosity**. For much of data modeling, BaseLink is quite consise
   (such as writing classes). But for writing programs and the
   implementations of functions, because it doesn't have all the short
   operators and requires extra keywords, it is not as concise in this
   realm as most modern programming languages.
2. **Esotericness**. It is very different from most modern programming
   languages, and is inspired by our design sense and experiences, which
   might get in the way of seeing it as a practical alternative.
3. **Types**. While there are a ton of benefits to being statically
   typed (instead of dynamically typed), it makes it harder to rapid
   prototype in some cases. But perhaps we can add some features of
   dynamic typing as well, to make it easier to get started. And this is
   a problem with any statically typed language.
4. **Completeness**. It's far from complete at this point. While much of
   the design of the language is complete, we still need to implement a
   fully working compiler, and this could be a deterrent to checking it
   out further.
