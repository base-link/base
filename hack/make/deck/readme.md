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

The linking to the global store stores it at:

```
~/Library/base
  /nest # global dependency store
    /link
      /<host>
        /<deck>
          /...files
  /mint # file store
    /<hash-base>
      /<hash>
```

When you install packages, it hard symlinks them to your `./deck`
folder.

```
./link
  /base.link # configuration settings
  /hold # hardlink folder
    /<host>
      /<deck>
        /<mark>
          /link
            /<host>
              /<deck> (soft symlink, except actual folder)
  /hook # symlink folder
    /<host>
      /<deck> (soft symlink to hold/host/deck/mark/link/host/deck)
```

You can have "workspaces" by adding a `deck` folder (or wherever you put
it).

```
./deck
  /deck-1
  /deck-2
```

You specify "workspaces" as "slots" where decks live.

```
deck @my/deck
  link @another/deck
  slot ./deck
```

When it searches for files, it searches like this:

```
/something/deeply/nested/deck.link
/something/deeply/nested/link

/something/deeply/deck.link
/something/deeply/link

/something/deck.link
/something/link

/deck.link
/link
```

## Mint Files

There are special files which specify how the rest of the files in the
deck are parsed. It says essentially what parser should be used on a set
of files matching a path.

```
file ./**/test.link
  mint test

file ./task/**/base.link
  mint task
```

The path to this is specified in the deck file:

```
deck <@foo/bar>
  mint ./dock/mint
```

So the process is, the base loader first loads the deck file, then finds
the mint files, then uses this information to resolve how the file is
handled.

Eventually this will all be defined in link code directly, but for now
it is just built into the compiler, the specific ways different file
types are handled.
