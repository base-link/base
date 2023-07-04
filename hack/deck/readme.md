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

## Role Files

There are special files which specify how the rest of the files in the
deck are parsed. It says essentially what parser should be used on a set
of files matching a path.

```
role ./**/test.link
  mint test

role ./task/**/base.link
  mint task
```

The path to this is specified in the deck file:

```
deck <@foo/bar>
  role ./dock/role
```

So the process is, the base loader first loads the deck file, then finds
the mint files, then uses this information to resolve how the file is
handled.

Eventually this will all be defined in link code directly, but for now
it is just built into the compiler, the specific ways different file
types are handled.

```
https://base.link/@tunebond/base/head/deck.link
https://base.link/@tunebond/base/1.2.3/deck.link
```

Limit to 256mb decks.

The repo call.base.link is for the creating your own registry. It is a
headless API.

host.base.link is the website for base.link

The decks are stored on google cloud.

```
deck <host/name>
  base <0.0.1> # base.link version
  lock <mit> # required for publishing
  head <Required summary of the package in 92 characters or less.>
  site <repo>
```

To publish:

```
base host deck
```

Stored on google cloud like:

```
deck.base.link/@tunebond/base/1.2.3/base.tar.gz
deck.base.link/@tunebond/base/1.2.3/base.link
```

The `base.link` gives us the metadata associated with the deck:

```
{
  "shasum": "392617f69a947e40cec7848d85fcc3dd29d74bc5",
  "tarball": "https://registry.npmjs.org/lodash/-/lodash-0.1.0.tgz",
  "integrity": "sha512-ufIfwX7g5obXKaJhzbnAJBNf5Idxqty+AHaNadWFxtNKjGmF/ZO8ptSEjQRQRymBPZtLa0NV9sbrsH87Ae2R1A==",
  "signatures": [
    {
      "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA",
      "sig": "MEQCIBB7pdqPfBFUsZQhVr3woDJ7/bbRWV3tlXQZNp3ivosbAiBMhwfq9fqaJvFFX1/scqPbIywUUZCQkfJaISqaJbZX2Q=="
    }
  ]
}

hash sha, <392617f69a947e40cec7848d85fcc3dd29d74bc5>
hash integrity
```

If there are more than 256 downloads, it can't be deleted without
reaching out to support at meet@tune.bond.

On publish to base.link, once the package hits the server and streams
the upload to google cloud, it generates the hash and saves the
`base.link`.

```js
// open file stream
var fstream = fs.createReadStream('./test/hmac.js')
var hash = crypto.createHash('sha512', key)
hash.setEncoding('hex')

// once the stream is done, we read the values
fstream.on('end', () => {
  hash.end()
  // print result
  console.log(hash.read())
})

// pipe file to hash generator
fstream.pipe(hash)
```

The lockfile then loads the data:

```
base <0.0.1>

load @tunebond/moon
  mark <*>
  lock <0.0.1>
load @tunebond/bolt
  mark <*>
  lock <0.0.1>
load @tunebond/wolf
  mark <*>
  lock <0.0.1>

link <@tunebond/wolf:0.0.1>
  hash <sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==>
  load @tunebond/bolt
    mark <0.0.1>
```

The website is pinged:

```
PATCH https://base.link/deck
```

With the payload:

```
hint code, nick false
```

It streams the file to google cloud. It streams a local zip file to
remote.

It stores a copy of the package readme.md and the deck file metadata for
display in the UI.

```
https://base.link/@tunebond/base
```

Shows readme, with link to source.

```
call host-deck
call test-deck # does it exist?
```

Can check directly with google cloud if it exists.

```
stats = storage.Blob(bucket=bucket, name=name).exists(storage_client)
```

For each version, it stores the readme and the metadata on the site in
postgres, to render the website.

```
https://base.link/@tunebond/base/1.2.3
```

The registry chooses to not use URLs and instead use the `@` at sign to
keep things simple. A host is required to manage a deck, to provide a
namespace as well.

---

The sandbox is basically a deck.

https://codepen.io/ettrics/pen/WRbGRN

```
base.link/@tunebond/:deck/code/:file+
base.link/@tunebond/buck-1212 (4 letter word followed by numbers)
base.link/@tunebond/buck-1212/mark/:mark/code/:file+ (just the code)
base.link/@tunebond/buck-1212/mark/:mark/hint/:file+/task/create-something
```

Then the sandbox decks are marked as "sort make".

    sort make (playground)
    sort tool (library)
    sort site (application)

When you add new dependencies, it runs a new vercel build. Otherwise it
runs against the vercel code.

```
BaseLinkShow (project name)

MakeBaseLink (project name)

make.base.link/@tunebond/buck-1234
  Shows the rendering
make.base.link/@tunebond/buck-1234/hint/:file+
make.base.link/@tunebond/buck-1234/code/:file+
make.base.link
  Try and share code
base.link/dock/vercel/back
```

Those are `sort make` decks under the hood, or `make true`.

For now, it links to GitHub projects and deploys directly through
vercel. You don't host the code on base.link.

show true (to your deck, so it gets published to the world)

The decks that you publish to base.link are basically tools for the most
part, though they can be apps / sites.

```
base link make deck
```

You can only publish 20 versions of a deck per day, unless you upgrade
to "verified".

You can only create 20 decks per day, unless you upgrade to verified.
