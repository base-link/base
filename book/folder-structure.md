# Folder Structure in Base Link

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
/note # guides
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
  /lock.link # commit this
  /role.link
  /text.link # copy
  /kink.link # errors
  /form # schema
    /user
  /rule # policies/permissions
  /take.link # query allowance
  /vibe.link # global styles
  /base # database
    /seed # seeding data
    /move # migrations
  /site # infrastructure
    /hold.link # don't commit this
    /move # migrations
  /host # env variables, don't commit
    /test.link
    /base.link
    /work.link # dev
    /beat.link # prod
/note # guides
/deck # custom packages
/face # frontend
  /dock # ui components
  /vibe # styles/themes
  /wall # pages
    /host
      /base.link
      /case.link
      /deck
        /base.link
        /case.link
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
  /hint.link
  /head
  /tree
/make
  /javascript
    /browser
    /node
/flow # logs
  /work.link # dev logs
  /test.link # test logs
  /beat.link # prod logs
/task # dev helpers
/test
/host # shared
  /tree
/base.link # commit this
/hold # scratchpad/tmp folder
```
