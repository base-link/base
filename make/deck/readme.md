# Package Manager Code

This is the package manager section basically, the first prototype
implemented in TypeScript. The goal is to eventually have it built using
base.link in link text itself.

This should find the package first and foremost.

- check the current directory for a special file called `link/deck.link`
  and a file called `base.link`.
  - if it doesn't exist, then try going up one.

When you encounter a path, you resolve the path.

- https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/

../../../load.js

This loads a file at that path relative to the current path. No module
resolution is necessary.

../../../load
