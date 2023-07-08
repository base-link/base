# Introduction to Base Link

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
4. **Understanding**. Almost all code except really for the
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
9. **Sharing**. It should work like any of the best languages with their
   package management, like Node's modules or Rust's crates. Sharing
   should be easy and seamless.
10. **Learning**. It should require minimal learning for anyone to get
    started, and all the tooling should be very well designed with a
    great UX. Still a long way to go to get there, but working on it.

## Drawbacks

Some of the drawbacks to Base Link are:

1. **Verbosity**. For much of data modeling, Base Link is quite consise
   (such as writing classes). But for writing programs and the
   implementations of functions, because it doesn't have all the short
   operators and requires extra keywords, it is not as concise in this
   realm as most modern programming languages.
2. **Esotericism**. It is very different from most modern programming
   languages, and is inspired by our design sense and experiences, which
   might get in the way of seeing its beauty.
3. **Types**. While there are a ton of benefits to being statically
   typed (instead of dynamically typed), it makes it harder to rapid
   prototype in some cases. But perhaps we can add some features of
   dynamic typing as well, to make it easier to get started.
