# Folder Structure in TermTree

The "index" file for a folder is called `note.tree` (you'll notice many
of those in the repo already). This is how we name it, like `index.js`.
Then you can name files whatever you want so long as it's a lowercase
alphabetic, hyphen, or number character.

## Libraries

In libraries it is common to use this convention:

```
/bind # configuration
/code # main library code
/deck # custom packages
/hold # tmp folder
/line # executable
/link # dependencies
/make # output builds
/note # guides
/task # dev helpers
/test # tests
```

## Applications

In applications it is common to use this convention:

```
/back # backend
/bind # configuration
/book # guides
/deck # custom packages
/face # frontend
/file # public directory
/flow # logs
/hold # tmp folder
/hook # api
/host # shared
/line # command line processing
/link # dependencies
/make # output builds
/task # dev helpers
/test # tests
```

### Example Version

```
/back # backend
  /note # mailers
  /work # jobs
  /time # cron jobs
  /task # handle API calls
  /hook # REST and webhook handlers
/bind # configuration
  /lock.note # commit this
  /role.note
  /text.note # copy
  /kink.note # errors
  /form # schema
    /user
  /rule # policies/permissions
  /take.note # query allowance
  /vibe.note # global styles
  /base # database
    /seed # seeding data
    /move # migrations
  /site # infrastructure
    /hold.note # don't commit this
    /move # migrations
  /host # env variables, don't commit
    /test.note
    /note.tree
    /work.note # dev
    /beat.note # prod
/book # guides
/deck # custom packages
/face # frontend
  /dock # ui components
  /vibe # styles/themes
  /wall # pages
    /host
      /note.tree
      /case.note
      /deck
        /note.tree
        /case.note
  /text # copy
/file # public directory
  /text # fonts
  /view # images
/hook # api
  /take
  /save
  /task # queries
/line # command line processing
/link
  /hint.note
  /head
  /tree
/make
  /javascript
    /browser
    /node
/flow # logs
  /work.note # dev logs
  /test.note # test logs
  /ride.note # prod logs
/task # dev helpers
/test
/host # shared
  /tree
/note.tree # commit this
/hold # scratchpad/tmp folder
```
