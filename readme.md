<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <img src='https://github.com/termsurf/base/blob/make/view/tree.gif?raw=true' height='192'>
</p>

<h3 align='center'>base</h3>
<p align='center'>
  A TreeCode Programming Framework
</p>

<br/>
<br/>
<br/>

## Introduction

BaseTree is a cross-platform application framework _in development_
(extreme **prototype**). It is far from being working, so mainly just a
collection of packages with API ideas. The long term goal is to now get
this working :).

## Installation

```
pnpm add @termsurf/base -g
```

## Folder Structure

Ignore the key folders:

```.gitignore
/.base # compiled helper folder
/bind # environment variables
/hold # temporary folder
/host # generated content folder
/link # downloaded packages folder
```

Here is how a monolithic app might be structured:

```
/.gitignore
/.base
/base.tree
/bind # env variables, don't commit
  /test.tree
  /base.tree
  /work.tree # dev
  /moon.tree # staging
  /star.tree # prod
/hold # scratchpad/tmp folder
/host
  /javascript
    /browser
    /node
  /log # logs
    /work.tree # dev logs
    /test.tree # test logs
/note # guides
/link
/deck
  /form # schema
    /code
      /user.tree
  /line # command line processing
  /back # backend
    /deck
      /site-1
      /site-2
      /base # REST and webhook handlers
        /task # handle API calls
        /take
        /save
      /note # mailers
      /work # jobs
        /time # cron jobs
      /form # schema
        /user.tree
      /call
        /take # query allowance
      /rule # policies/permissions
  /face # frontend
    /deck
      /test
      /dock # ui components
      /vibe # styles/themes
      /site-1
        /wall # pages
          /host
            /base.tree
            /case.tree
            /deck
              /base.tree
              /case.tree
        /text # copy
      /kink # errors
      /file # public directory
        /text # fonts
        /view # images
  /base # database
    /seed # seeding data
    /move # migrations
  /site # infrastructure
    /hold.tree # don't commit this
    /move # migrations
/task # dev helpers
/text # copy
  /en.tree
  /fr.tree
  /zh.tree
```

For libraries, you might only have:

```
/base.tree
/code
/task
/hold
/host
/link
/note
```

## License

Copyright 2021-2024 <a href='https://term.surf'>TermSurf</a>

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## TermSurf

This is being developed by the folks at [TermSurf](https://term.surf), a
California-based project for helping humanity master information and
computation. Find us on [Twitter](https://twitter.com/termsurf),
[LinkedIn](https://www.linkedin.com/company/termsurf), and
[Facebook](https://www.facebook.com/termsurf). Check out our other
[GitHub projects](https://github.com/termsurf) as well!
