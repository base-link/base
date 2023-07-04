# Frontend Website

The goal of this website is to be basically an entrypoint to:

1. The packages for the base link language.
1. A playground for playing around with the language.
1. A guides section for learning the language.
1. Organization/user pages (for "namespaces" that have signed up, under
   /@foo, like how GitHub works)
1. Login page

The font should use [Google Noto Fonts](https://fonts.google.com/noto)
(specifically
[Noto Sans Mono](https://fonts.google.com/noto/specimen/Noto+Sans+Mono)).
The color scheme should be white background with black text, and code
blocks which are black background, using the
[Dracula theme](https://draculatheme.com).

## Package Manager Inspiration

Inspiration for the package-manager portion of the website.

- https://crates.io
- https://www.npmjs.com
- https://formulae.brew.sh/formula
- https://rubygems.org

## Organization/User Page Inspiration

- https://github.com/rails (org)
- https://github.com/mojombo (user)
- https://www.npmjs.com/~mojombo (user)
- https://www.npmjs.com/org/babel (org)

## Guides Inspiration

- https://doc.rust-lang.org/book/
- https://rust-book.cs.brown.edu/ (interacive quizzes)
- https://coffeescript.org

## Playground Inspiration

- https://www.typescriptlang.org/play
- https://play.rust-lang.org
- https://coffeescript.org/#try

## Status Page

This will use a standard status page service, so no need to design for
this.

- https://status.rubygems.org

## Uptime Page

This will also use a standard uptime page service, so no need to design
for this.

- https://uptime.rubygems.org

## URLs

```
https://base.link (main website)
https://deck.base.link (hosted assets)
https://load.base.link (status page)
https://time.base.link (uptime page)
```

Under base.link:

```
/love
  - Values, mission, and brand
/love/team
  - Team page
/love/vibe
  - Marketing asset page
/land/code
  - Landing page for coders
/land/case
  - Landing page for non-coders
/find
  - Search packages
/host/:host
  - Organization admin page
/host/:host/deck
  - Organization package list admin page
/host/:host/bill
  - Organization billing admin page
/host/:host/team
  - Organization member admin page
/mind/:mind
  - User admin page
/mind/:mind/save
  - User admin edit page
/@:host
  - Organization public page
/@:host/:deck
  - Project/package public page
/@:host/:deck/home
  - Latest version of package
/@:host/:deck/:mark
  - Specific version of package
/dock
  - Login page (with GitHub and email login)
/dock/:site
  - Redirect URL for GitHub oauth
/dock/:site/back
  - Callback URL for GitHub oauth
/void
  - Logout
/code
  - Playground
/code/:code
  - Saved playground state
/note
  - Legal documents section
/note/lock
/note/term
/note/void
/read
  - Guides section
/read/:read+
```

Under deck.base.link:

```
/:host/:deck/:mark/base.link
/:host/:deck/:mark/base.tar.gz
```
