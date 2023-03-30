<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <img src='https://github.com/tunebond/base.link/blob/make/view/base.svg?raw=true' height='192'>
</p>

<h3 align='center'>base.link</h3>
<p align='center'>
  A Link Text Compiler
</p>

<br/>
<br/>
<br/>

## Welcome

_This is all just experimentation at this point, so buyer beware! But
would love to bounce off ideas with anyone out there interested in
programming language design and implementation._

We are developing a suite of repositories for natural languages and
programming languages.

For the programming language, `link`, and it's compiler, `base`, we are
making a language that works across devices (similar to Dart/Flutter),
which will give you a minimal footprint. That is, you will be able to
learn the least amount possible to have the most possible power and so
the biggest impact with the least effort. But at the same time, you will
have direct access to the native objects in their original form, so you
can have maximum optimization potential and use the underlying
architecture's standard paradigms when necessary (such as pointers in
the server-side/rust-like environment, which don't exist in
JavaScript/browsers). This is possible thanks to the ownership ideas
from the Rust community and the like, "move semantics" allow this to
work.

## Contributing

Feel free to think about how to rewrite major portions of the compiler
code, or just add/change/remove a small thing here or there. Things are
in constant flux at this point, so you are welcome to make sweeping
changes as well! Next we will outline how the compiler TypeScript code
is generally organized.

### Project Structure

Check the `package.json` for more detail, but the project starts at
`make/task/build.ts`, which gets compiled through `npm run watch` to
`host/task/build.js`. You can keep the `npm run watch` command going and
it will rebuild the TypeScript output into the `host` directory as
things change. So basically:

```bash
npm run watch
```

and in another terminal window:

```bash
node host/task/build
```

You also need the current suite of dependencies installed. at the same
level as `base.link`, so it can compile the dependent files (this is
just a hack for the moment, will abstract it out at some point).

So do this to get going:

```bash
mkdir tunebond
cd tunebond
git clone git@github.com:tunebond/base.link.git
git clone git@github.com:tunebond/wolf.link.git
git clone git@github.com:tunebond/moon.link.git
git clone git@github.com:tunebond/nest.link.git
cd base.link
# then watch or run files from here.
```

Those 4 projects should be all you need for now to get going.

Also of note, is that the `code` object which you'll see throughout the
compiler TypeScript codebase is basically a global object which is
constructed through circular module imports/exports. I feel this way is
a simple and clean way to do this, despite the circular references. If
you have strong opinions on a different non-circular way, which isn't
hacky and you have a clean solution for it, please bring it up as always
looking for ways to improve the code.

This TS compiler code will eventually (probably in multi-year timeframe)
ideally be replaced with native link text code instead. So not making
the TS repo perfect in every way, just getting the job done for now. But
the more that this gets worked on, the more it becomes clear we need to
solve some core stuff in TS now, like surfacing errors, or how to handle
circular dependencies, so having a decently nice TS repo is also a good
thing.

### Compiler Overview

The compiler works in a few rough phases currently:

1. **Parse the text** into a "link tree" (link, the language). This
   generates a simple object tree which we then convert into a more
   general AST.
1. **Generate the central AST**, the "mesh". This is the main data
   structure we use for the rest of compiling.
1. **Resolve interpolation and variable references**. This makes sure
   all the variables have been figured out (even if at this point they
   are incorrectly typed).
1. **Check variable lifetime** to make sure variables are defined in the
   right spots.
1. **Infer types** to figure out the implied and intended types.
1. **Verify type soundness** to make sure the inferred types are
   correctly managed.
1. **Check variable mutability** to make sure variables that can't be
   modified aren't.
1. **Verify borrowing/ownership** to make sure only one owner exists per
   variable.
1. **Generate target language output code**.

Right now we have generated most of the "central AST", and are now
moving onto the next few steps of figuring out variable references and
doing typechecking/inference. We have also started on code generation
which doesn't really require the intermediate typechecking steps.

In the evaluation of written text to runtime interpreted code, there are
several possibilities for how a `term`, a `path`, or `text` is compiled.
It can be any of:

- `static-term`: Term is a single term like `foo-bar` with no
  interpolation or paths.
- `dynamic-term`: Term is a single term like `foo-{bar}` with
  interpolation but no paths.
- `static-path`: Path is like `foo-bar/baz` with no interpolation.
- `dynamic-path`: Path is like `foo-{bar}/{baz}-bim` with interpolation.
- `static-text`: Text is like `<hello world>` with no interpolation.
- `dynamic-text`: Text is like `<hello {foo} world>` with interpolation.

Each of these cases is handled independently for the most part, in each
respective term keyword handler.

If it is static, then it is finished compiling it. If it is dynamic, it
might still be able to statically compile it after some binding
resolution, or it may need to be runtime interpolated. You can have
these sorts of situations:

- `{{foo}} bar`: A dynamic "head" term that is resolved at runtime, so
  none of the child link tree is compiled until runtime. This is the
  worst case.
- `foo {{bar}}`: A dynamic child term, which means most of the link tree
  can be compiled except this (possibly a name).
- `foo bar`: Everything is static and can be statically compiled.

At first, each node is progressively resolved as a `MeshGatherType`,
which means it simply collects an array of children, possibly with
dynamic head terms. Then if none of the head terms are dynamic, then it
compiles it into a more specific mesh type based on what it is. This
second-level compilation target is still incomplete however, because
some of the nodes can still be dynamic. So then we try and resolve them,
if they resolve, they are static. If not, they are runtime.

## Base Type System

Every object in the system is a mesh, in a graph of nodes so to speak,
with links and sites.

#### Ownership

These objects are owned (ownership types / affine types), and references
are passed around in a structured way.

```link
save x, text 10 # create
save y, move x # move
save z, loan y # borrow
save w, read z # copy
```

Every variable is immutable by default, but you can specify it as
mutable.

```link
save x, text 10
  flex true
```

#### Work

All types of abstract things are work objects. These are subdivided into
form work and task work.

#### Form

This is a record type. An instance is a mesh, a site with links.

```link
form bind
  take term, like term
  take code, like code
```

There are also type types. And case types, which are an enumeration of
many possibilities which the type can take on.

```link
form list
  head seat, like like
  take size, like size
  take base
    like site
      bind seat, loan seat
  take head
    like site
      bind seat, loan seat

form site
  head seat
  take base
    like loan seat
    like void
  take head
    like loan seat
    like void
```

You can have dependent types too (constraints on the type based on the
site links).

```link
form date
  take year, form natural-number
  take month, form natural-number
  take day, form natural-number

  hold is-between
    loan month
    size 1
    size 12

  stem case, loan month
    case 1, test is-day-within, size 31
    case 2
      stem case, call modulo-year, size 0
        case 0
          stem case, call modulo-year, size 100
            case 0
              stem case, call modulo-year, size 400
                case 0, test is-day-within, size 29
                fall, test is-day-within, size 28
            fall, test is-day-within, size 29
        fall, test is-day-within, size 28
    case 3, test is-day-within, size 31
    case 4, test is-day-within, size 30
    case 5, test is-day-within, size 31
    case 6, test is-day-within, size 30
    case 7, test is-day-within, size 31
    case 8, test is-day-within, size 31
    case 9, test is-day-within, size 30
    case 10, test is-day-within, size 31
    case 11, test is-day-within, size 30
    case 12, test is-day-within, size 31

  task modulo-year
    hide true
    take size
    call modulo
      loan year
      loan size

  task is-day-within
    hide true
    take size
    test is-less-than-or-equal-to
      loan day
      loan size
```

#### Task

Tasks are function definitions.

```link
task find-fibonacci-via-loop
  take i, form natural-number
  free natural-number

  save g, size 0
    flex true

  save o, size 1
    flex true

  save d
    flex true

  walk test
    hook test
      test is-gt
        loan i
        text 0
    hook tick
      save d, move o
      save o
        call add
          loan g
          loan d
      save g, move d
      save i
        call decrement
          loan i

  back g
```

Tasks can be nested, creating each their own lexical scope.

#### Fork

The lexical scope (the "visible" scope, what you see when you look at
the code) is called a fork. The forks form a stack, and their evolution
forms a tree. These can be directly accessed at various places in the
compiled term set. They can be accessed inside form definitions, as well
as inside tasks.

#### Call

Tasks get applied with the call form.

```link
call check-gt
  bind base, loan i
  bind head, text 0
```

You can specify that the call is async with `wait`:

```link
call check-gt-async
  wait true
  bind base, loan i
  bind head, text 0
```

Likewise, you can define `wait` on the task to say that it is async.

#### Hook

Calls can be streams or loops, which emit events. This is implemented
with `hook`.

```link
call if
  hook test
    test is-boolean
      bind x, loan y
  hook match
    ...
  hook fail
    ...
```

#### Back

Calls automatically return a value without anything, but you can also
return explicity.

```
back 0
```

#### Make

The make is the mesh constructor.

```link
make bind
  bind term, loan term
```

#### Load

The load is the import of other modules or "cards". Loads can be nested,
and do pattern matching to select out object by type and name.

```link
load /form
  take form link
  take form move
  take form read
  take form loan
```

#### Lead

A lead is returned when there is a potential error or value as options.

#### Card

A card is a module. It belongs to a deck, the package.

#### Deck

A deck is a package. It belongs to a host, or an organization/entity.

#### Host

A host is used to bind data, usually for passing to a call, but can also
be used to construct arbitrary trees of content.

```link
host hello, text <foo>
host world
  host bar, text <baz>
```

### Custom DSLs

You can build your own DSLs by defining a mine, mill, and mint which
combines the two.

#### Mine

A mine is a parser. There are two types of mines by default, the text
mine (which parses text/bits) and the tree mine (which parses the trees
of terms). The tree of terms that you get initially is passed through
the mine, and matched with a mill, to get the final mesh.

```link
mine bind
  mine term, term bind
    mine term
      take name
    mine room
      make case
        mine form, form sift
          take sift
```

#### Mill

The mill takes the streaming output from the mine, and converts it into
mesh.

```link
mill bind
  mill term
    save term
  mill sift
    mill text
      save sift
    mill link
      mill road
        base seed
        make link
          bind road, link seed
          save sift
    mill move
      mill road
        base seed
        make move
          bind road, link seed
          save sift
    mill read
      mill road
        base seed
        make read
          bind road, link seed
          save sift
    mill loan
      mill road
        base seed
        make loan
          bind road, link seed
          save sift
    mill make, form make
      save sift
    mill call, form call
      save sift
    mill task, form task
      save sift
    mill task, form form
      save sift
  make bind
    bind term, link term
    bind term, link term
```

To construct your own DSLs, you simply define a mine which parses the
term tree (following the example mines for inspiration), and define a
mill to convert the mines parsings into mesh.

This gives us a way to transform text content to trees to meshes, and
verify the transformation is correct.

Don't consider the trees of terms and the resulting objects as really an
inflexible syntax which defines opaque objects and types. These are
simple data structures encoding object trees and graphs, not like
functional languages. So you are free to "compile" the object to create
and run computation however you see fit, which gives you great ability.

### Project Cleanliness

Parentheses are always avoided in our base style. All files are named
`base.link` inside of a folder, along with an optional `test.link` test
file. Certain folder collections are standard, like Ruby on Rails.

### License

Copyright 2021-2023 <a href='https://drum.work'>TuneBond</a>

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

### TuneBond

This is being developed by the folks at [TuneBond](https://tune.bond), a
California-based project for helping humanity master information and
computation. TuneBond started off in the winter of 2008 as a spark of an
idea, to forming a company 10 years later in the winter of 2018, to a
seed of a project just beginning its development phases. It is entirely
bootstrapped by working full time and running
[Etsy](https://etsy.com/shop/tunebond) and
[Amazon](https://www.amazon.com/s?rh=p_27%3AMount+Build) shops. Also
find us on [Facebook](https://www.facebook.com/tunebond),
[Twitter](https://twitter.com/tunebond), and
[LinkedIn](https://www.linkedin.com/company/tunebond). Check out our
other GitHub projects as well!
