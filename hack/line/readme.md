# Base CLI

This is the first prototype of the CLI tool for base.

- https://github.com/lancejpollard/normalize-ast.js
- https://github.com/lancejpollard/js2link.js

## Future Commands

```bash
# link local repo to global dependency store
base link deck
base link
# link globally linked dependency to local project
base link deck @foo/bar
base link @foo/bar
# remove a symlink
base toss deck link <deck>
base toss link <deck>
# run project tests
base test deck
base test
# install defined packages
base load deck
base load
# install defined decks without dev(work)/test
base load deck --like base
# install packages
base save deck @foo/bar
base save @foo/bar
# install packages globally
base save deck <deck> --slot base
# check if decks are installed
base seek
# create a new package
base cast deck
base cast
# build/compile the package
base make deck
base make
# watch the directory and recompile
base make --ride
# start a repl for the current deck
base bind deck
base bind
# create a user account
base cast mind
# update user profile property
base save mind <name> <value>
# read user profile data
base read mind
# read user profile value
base read mind <name>
# create an org/namespace
base cast host
# update host profile property
base save host <name> <value>
# change the default registry from base.link to something else
base save hold <url>
# change the org registry
base save hold <host> <url>
# login
base dock mind
# logout
base void mind
# publish a package
base host deck
base host
# bump patch version
base move mark 3
base move mark
# bump minor version
base move mark 2
# bump major version
base move mark 1
# show dependency tree
base show deck tree
# run the code
base boot deck
base boot
# clean artifacts
base wash deck
# make documentation, hosted in ./hint/code
base make code book
# generate markdown from book
base make book --like md
base make book
# generate pdf from book
base make book --like pdf
# remove package from manifest
base toss deck <deck>
base toss <deck>
# add owner to package
base link deck mind <mind>
# remove owner
base toss deck mind <mind>
# show info about this deck
base note deck
# show info about a deck
base note deck <deck>
base note <deck>
# show info and problems about current deck
# shows TODOs as well, and stats.
base note
# show file sizes
base note deck file size
base note file size
base note size
# list outdated decks
base diff deck
# see if module is outdated
base diff deck <deck>
# base version
base show mark
# show basic information about base and operating system for debugging help
base show
# show intro helper menu
base
# show source location of deck
base show deck link
# open deck in editor
base show deck <deck>
# execute an arbitrary task
base <name>
# execute arbitrary task from another repo
base <name> <deck>
# run the make command of another repo
base make @foo/bar
# deprecate a deck version
base void deck my-thing@"< 0.2.3" "critical bug fixed in v0.2.3"
# switch to a different version of base
base move self <version>
# set the default version to use
base bind self <version>
# install the latest base itself
base save self
# install a specific version of base itself
base save self <version>
# check if the base has a new version
base diff self
# list installed versions of base
base list self
# where base is located itself, and other things
base show self
# start development server
base work
```

Since you can add your own commands to `base`, the convention is:

```bash
base <verb> <...objects> <...options>
```

```bash
base test view
```

## Generic Options

All commands can take these options:

| short | long     | description                      | takes                  | default               |
| :---- | :------- | :------------------------------- | :--------------------- | :-------------------- |
| `-h`  | `--hint` | help menu                        |                        |                       |
| `-b`  | `--back` | what to send back in the command | `json`, `link`, `line` | `line` (command line) |

## User Profile Settings

The `hook` is a slug, and can only contain `[a-z-]`.

| property        | value                     |
| :-------------- | :------------------------ |
| hook            | example                   |
| name            | Example User              |
| email           | me@example.com (verified) |
| two factor auth | auth or always            |
| homepage        |                           |
| freenode        |                           |
| twitter         |                           |
| github          |                           |
| created         | 2015-02-26T01:38:35.892Z  |
| updated         | 2017-10-02T21:29:45.922Z  |

## Host Profile Settings

| property | value                       |
| :------- | :-------------------------- |
| hook     | example                     |
| name     | Example Host                |
| email    | team@example.com (verified) |
| status   | unverified                  |
| homepage |                             |
| twitter  |                             |
| github   |                             |
| vercel   |                             |
| created  | 2015-02-26T01:38:35.892Z    |
| updated  | 2017-10-02T21:29:45.922Z    |
