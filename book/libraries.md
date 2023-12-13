# Main Libraries in BaseLink

These are open source building blocks used to make up the BaseLink
framework. Calling BaseLink a framework is kind of a misnomer, it is
basically the minimal set of conventions for building packages.

1. `@termsurf/bind`: The BaseLink Environment Binding Library
1. `@termsurf/bolt`: The BaseLink Data Type Library
1. `@termsurf/moon`: The BaseLink Environment Tooling Library
1. `@termsurf/hare`: The BaseLink Data Structure Library
1. `@termsurf/worm`: The BaseLink Content Grammar Library
1. `@termsurf/mesh`: The BaseLink Compiler Library
1. `@termsurf/fish`: The BaseLink Linting Library
1. `@termsurf/wolf`: The BaseLink File Manipulation Library
1. `@termsurf/star`: The BaseLink Third-Party Integration Library
1. `@termsurf/crow`: The BaseLink Drawing Library
1. `@termsurf/nest`: The BaseLink Resource Provisioning Library
1. `@termsurf/snow`: The BaseLink Querying Library
1. `@termsurf/door`: The BaseLink Permission Library
1. `@termsurf/seed`: The BaseLink Math Library
1. `@termsurf/tree`: The BaseLink DSL Library

## `@termsurf/bind`

This is the set of interfaces built into the native environments, as
well as a few very general types. This is the foundation of everything
else.

## `@termsurf/bolt`

This is the "standard library", and builds the basic interfaces on top
of the main datatypes, leaving the rest of the environment to be
abstracted out in `@termsurf/moon`.

## `@termsurf/moon`

This builds on top of the standard library and includes abstractions
over the common environment interfaces to normalize them across
platforms.

- File system
- Browser
- Camera
- Flashlight
- Crypto
- Network
- Processes
- Accelerometer
- Geolocation
- GPU
- Logging
- REPL
- CLI parsing
- Threads
- Web workers
- Battery
- Clipboard
- Cookies
- Gamepad
- Email
- Speech recognition
- Speech synthesis
- Video
- Screen capture
- Audio
- Drag and drop
- Payments
- Testing

## `@termsurf/hare`

This is an abstraction over data structures, and aims to include as many
of them as possible.

## `@termsurf/worm`

This is for parsing and writing text and/or bytes.

## `@termsurf/mesh`

This is the main BaseLink compiler. It takes input text and compiles it
to a mesh, then runs typechecking / typeinference on it and everything,
and outputs builds for target environments.

This is where the `mine` and `mint` DSLs are defined, amongst other
things.

## `@termsurf/fish`

This is for linting and prettifying various forms of text. It is used to
format, for example, the generated source code output from the compiler.

## `@termsurf/wolf`

This is for dealing with different files. It includes:

- Zip files
- Images
- Videos
- PDFs
- XLSX
- JSON
- XML
- HTML
- CSS

## `@termsurf/star`

This is for third-party library integrations like with GitHub and
Vercel.

## `@termsurf/crow`

This is for managing the UI and defining UI components. This includes
DOM trees like React, WebGL graphics, game graphics like Pixi.js, and
game physics. Ideally there are both 2d and 3d variants.

## `@termsurf/nest`

This is for managing the provisioning of "resources" like databases and
other infrastructure.

## `@termsurf/snow`

This is for managing querying and mutations of all sorts, from the
API-level down to database levels. As such, it is an abstraction over
databases. This includes job processing as well.

## `@termsurf/tree`

This is the set of collected DSLs for building the things in the various
libraries. This makes it so the libraries are not bound by the DSLs, and
you can write your own DSL on top of the base libraries if you really
wanted.

## Inspiration

- https://github.com/thi-ng/umbrella
