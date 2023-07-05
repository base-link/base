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
~/.base
  /deck
    /link # global dependency store
      /<host>
        /<deck>
          /...files
    /tree # file store
      /<hash-base>
        /<hash>
```

When you install packages, it hard symlinks them to your `./base`
folder.

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
  lock mit # required for publishing
  head <Required summary of the package in 64 characters or less.>
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

---

Get word like `bird-1234`

```js
const MAX = 2097151

function splitInt(int) {
  if (int > MAX) {
    throw new Error('Too large a number')
  }
  let roughly10k = (int >> 8) & 0xffff
  let terms256 = int & 0xff
  return [terms256, roughly10k]
}

function log(int) {
  const [a, b] = splitInt(int)
  console.log(int, '=> [', a, b, ']')
}
```

To find the commands from other projects, the other projects need to be
installed in the local deck in the current directory. These are defined
under the `hook` term in the deck definition.

```
deck @foo/bar
  hook ./hook
```

After installation, they get added to the generated JS/etc.. so it is
easy to find them.

So the ./hook folder for all the decks gets compiled into a single CLI.

- https://github.com/pkgjs/parseargs/blob/main/index.js#L175

This is basically a `hook.js` file that gets created, which handles the
CLI without importing anything, and only imports things lazily.

Then for each deck, we have a `deck.js` that gets created, which
resolves circular dependencies and such within the deck. This gets
loaded dynamically after the command is parsed.

So each deck becomes a separate file. But then we can combine some of
them into bundles, for minimizing HTTP requests on changed files.

The bolt.link project is all types, it is not needed at runtime. So
there is type-annotated and type-free versions of the output JS.

So we have the base.link "compiler" form of the output JS, which is
basically a direct port of the code to the compiler AST in JS. Then we
have the compiled AST output file, without any types. The JS base.link
code is used to generate the output JS. This outputs stuff without the
types, if the types aren't directly referenced. If there is any code
directly or indirectly referencing types, it perhaps includes all the
types, or it returns null, either one.

The special top-level `seal` command will force include the types.

```
seal form user
seal task create
```

So the compiler generates JS one per deck. And the JS is used to
generate a build, where the files are grouped based on some heuristic.

It saves it into:

```
~/Library/base
  /base # global dependency store
    /<host+deck>
      /...files
      /link
        /base.js
        /package.json
  /tree # file store
    /<hash-base>
      /<hash>.{js,link}
```

The source maps are like this:

```
/make
  /browser
    /link
      /band.base.js
        //# sourceMappingURL=band.base.js.map
      /band.rest.js
        //# sourceMappingURL=band.rest.js.map
    /deck.js
```

There is a server which loads the source maps under `/link`:

```
/make
  /link
    /tunebond
      /crow
        /1.0.23
          /code
            /base.link
          /link
            /tunebond
              /wolf => /wolf/0.1.0
      /wolf
        /0.1.0
          /code
            /base.link
```

The server aliases to `./link` on the file system, as in:

```
/link
  /tunebond
    /crow
      /1.0.23
        /code
          /base.link
        /link
          /tunebond
            /wolf => /wolf/0.1.0
```

The `base.js` is compiled with types. Then that gets run and compiles to
output JS/Swift/etc..

Specify the bundle groups with:

```
deck @foo/bar
  band base
    link @tunebond/bolt
    link @tunebond/nest
    link @tunebond/crow
```

Map [multiple sources](https://www.bugsnag.com/blog/source-maps/) to one
JS file.

https://developer.mozilla.org/en-US/docs/Web/Manifest

There are source maps for Node.js too, and the compiler.

So:

- loading from ./code loads ./link/tunebond/crow
- loading from ./link/tunebond/crow loads from
  - /link/.tree/tunebond/crow/1.0.23
- that gets compiled into
  - /link/.work/node_modules/tunebond/crow/index.js
- and that is actually a symlink to
  - /link/.work/node_modules/.tree/tunebond+crow@1.0.23/node_modules/tunebond/crow/index.js
- so when we load ./link/.work/index.js, it loads from that last long
  path.
- and the source map path is always relative to that long path.

Code loads from browser/server alias (which is accessible through
sourcemaps):

```
/tree
  /tunebond
    /crow
      /1.0.23

# or

/base
  /tree
    /tunebond
      /crow
        /1.0.23
```

And the source code in JavaScript is at:

```
/site
  /band.base.<hash>.js
  /band.rest.<hash>.js

# or

/base
  /make
    /javascript
      /browser
        /band
          /band.base.<hash>.js
          /band.rest.<hash>.js
```

A hard link converts the path into something usable.

Then when it loads a symlinked module, it still is loading from the
base, recursively.

You can hide the sourcemaps behind a login wall, via:

```
hook /site/:file+
  task load-make

hook /tree/:file+
  task load-tree
```

```
deck @foo/bar
  make browser, ./make/site/browser
  make node, ./make/site/node
```

It builds to the base directory, and you have to grab it and make it
public for the browser.

```
/host
  /bind.link
  /lock.link
/link
  /hint.link
  /head
    /tunebond
      /crow # symlink to 1.0.23
  /tree
    /tunebond
      /crow
        /1.0.23
          /code
            /base.link
          /base
            /link
              /tunebond
                /wolf => wolf/0.1.3
      /wolf
        /0.1.3
          /code
            /base.link
/make
  # this folder changes a lot
  /bake # prepare the code
    /javascript
      /browser
        /base.<hash>.js # final output
        /base.<hash>.js.map
          => link to crow@1.0.23
      /node # symlink to node folder
  /rake # organize the code
    /javascript
      /package.json
        name: @tunebond/base
        browser: ./browser/index.js
      /browser
        /hash.json
        /node_modules
          /.tree
            /@tunebond
              /nest
                /2.2.23
          /@tunebond
            /nest
          /@tunebond
            /base+shared
        /roll
          /hash+<hash-of-names>.js
          /<name>.js
      /shared
        /hash.json
        /node_modules
          /.tree
            /@tunebond
              /nest
                /2.2.23
          /@tunebond
            /nest
        /roll
          /hash+<hash-of-names>.js
          /<name>.js
      /node
        /hash.json
        /hook.js
        /test.js
        /index.js
        /node_modules
          /.tree
            /tunebond+nest@2.2.23
              /node_modules
                /@tunebond
                  /crow
          /@tunebond
            /nest
        /roll
          /hash+<hash-of-names>.js
          /<name>.js
  /take # gather the code
    /rust
      /linux
    /javascript
      /browser
      /shared
        /hash.json
      /node
        /hash.json
          {
            [hash]: [link]
          }
        /index.js
        /node_modules
          /.tree
            /tunebond+crow@1.0.23
              /node_modules
                /@tunebond
                  /crow
                    /index.js
                      //# sourceMappingURL=index.js.map
                    /index.js.map
                      => ../../../../../../../tree/tunebond/crow/1.0.23
                  /wolf
                    /index.js
          /tunebond
            /crow
              /index.js # symlink to tunebond+crow@1.0.23/node_modules/tunebond/crow/base.js
```

You could periodically check and clean the cache, every 16th change,
otherwise use file watching.

```js
hash([file, name].join('#'))
```

There is an in-memory cache of the modules. It saves the modules

https://betterprogramming.pub/a-memory-friendly-way-of-reading-files-in-node-js-a45ad0cc7bb6

On start the dev server, read each file's hash using streaming API or
fs.read directly with shared memory buffer. Find all the old files using
each hash, those files you don't have to recompile. Find the new files
because they didn't exist in the cache, and compile those. Find the
removed files because the cache contained extra files that weren't found
in the new hash set. Remove those from the cache.

Start the dev server, when a file renamed, clear the cache and add the
new value.

link: hash

When file is renamed, find all the files that import that file, and
change the import. Can do this on the AST for the import. Then write out
the changed file.

The JS files can all be named after codes, not hashes. Each deck gets a
file. Then the current deck gets a set of rolls. Each deck is named
after the deck in JS. The file is index.js. Each roll is named after the
file if non-circular, otherwise the file names hash.

```
sinkFileHash (link files)
takeFileHash (js files for compiler)
rakeFileHash (js files for preliminary pass)
bakeFileHash (js published file interface)
```

First read the tree files and check the hashes, invalidate any that have
changed. Then read the work file hashes, invalidate any that have
changed. Then read the make file hashes, invalidate any that have
changed.

The roll gets imported into the rest of the files so circular
dependencies get resolved internally, but can be imported externally
through JS.

```js
// foo.js
import * as circularStuff from './hash+<hash>.js'

export const foo = circularStuff.foo

// bar.js
import * as circularStuff from './hash+<hash>.js'

export const bar = circularStuff.bar
```

## Max File Size

The max link file size is 16mb.

```js
import crypto from 'node:crypto'
import * as fs from 'node:fs/promises'
import pkg from 'glob'
const { glob } = pkg

const MB_16 = Math.pow(2, 24)
const MB_1 = MB_16 / 16

const fileSharedBuffer = Buffer.alloc(MB_1)

async function readBytes(fh, sharedBuffer) {
  return await fh.read(sharedBuffer, 0, sharedBuffer.length, null)
}

const start = new Date()

const str = []

main().then(() => {
  const end = new Date()
  console.log(end - start)
})

async function main() {
  const paths = glob.sync('../bolt.link/code/**/*.link')
  for (const path of paths) {
    const hash = await getFileHash(path)
    str.push(hash)
  }
}

async function getFileHash(link) {
  const hash = crypto.createHash('sha512')
  hash.setEncoding('hex')

  for await (const chunk of generateChunksFromFile(
    link,
    MB_1,
    fileSharedBuffer,
  )) {
    hash.update(chunk)
  }

  hash.end()
  return hash.read()
}

async function* generateChunksFromFile(filePath, size, sharedBuffer) {
  const stats = await fs.stat(filePath) // file details

  if (stats.size > MB_16) {
    throw new Error(`File too big: ${stats.size} > ${MB_16}`)
  }

  const fh = await fs.open(filePath) // file descriptor
  let bytesRead = 0 // how many bytes were read
  let end = size
  let n = Math.ceil(stats.size / size)

  for (let i = 0; i < n; i++) {
    await readBytes(fh, sharedBuffer)
    bytesRead = (i + 1) * size
    if (bytesRead > stats.size) {
      // When we reach the end of file,
      // we have to calculate how many bytes were actually read
      end = size - (bytesRead - stats.size)
      yield sharedBuffer.slice(0, end)
    } else {
      yield sharedBuffer
    }
  }

  await fh.close()
}
```

```js
function loadFileHashBase(path) {
  const paths = glob.sync(path)
  const hashes = {}
  for (const path of paths) {
    const hash = await getFileHash(path)
    hashes[hash] = [path]
  }
}

function testFileHashList(hashList, fileHashList) {
  const deleted = {}
  for (const hash in fileHashList) {
    if (!hashList[hash]) {
      // it was deleted or renamed
      deleted[hash] = true
    }
  }
  const added = {}
  for (const hash in hashList) {
    if (!fileHashList[hash]) {
      // it was added or changed
      added[hash] = true
    }
  }
  return { added, deleted }
}

function tossFileHead(path) {
  // propagate all removals
  // rebuild the tailing files that were dependent on this.
}

function makeFileHead(path) {
  compileFile(path)
}
```

You make the files and they become baked, which you can then publish as
a Node module or Swift package or Rust crate.

- `node/hook.js` is the `bin`
- `node/index.js` is the node main
- `browser/index.js` is the browser main
- `browser/band/*.js` is the build for the public assets

Based on if it is `sort tool` or `sort site`:

- `tool`: It exports a package.json for the node.js and the browser.
- `site`: It exports standalone JS files ready to be loaded like how
  webpack builds things.

## Peer Dependencies

```
link @tunebond/crow, mark <0.*>
  have 1 # singleton policy
```

## Semver Cheatsheet

```
  1.2.3
 =1.2.3
 >1.2.3
 <1.2.3
>=1.2.3
<= 1.2.3 < 1.3.0
1.2.3 - 2.3.4
1.2 - 2.3.0
>=0.14 <16
0.14.x || 15.x.x
```

```
mark or <0.14.x>, <0.15.x>
mark gte <0.14>, lt <0.16>
mark
  rise-like <0.14>
  fall <0.16>

mark sink <0.14.x>, <0.15.x>

mark gte <0.14>
mark lt <0.16>

mark gte <0.14>, lt <0.16>
mark band
  base <0.14>
  fall <0.16>

mark or <0.14.x>, <0.15.x>
mark test
  like <0.14.x>
  like <0.15.x>

1.2 - 2.3.0
mark band
  base <1.2>
  head <2.3.0>

>= 1.2.3 < 1.3.0
mark band
  base <1.2.3>
  fall <1.3.0>

0.x.x
mark <0.x.x>
```

https://github.com/semver/semver/issues/833
