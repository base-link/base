# Database Migrations in BaseLink

- https://github.com/ankane/strong_migrations

```
move rise
move fall
move diff
  # create table
  make-form mind
    link code, like code
      code true # primary key
    link first-name, like text
    link last-name, like text

  # rename column
  move-link-name mind, code, id

  # change column type
  move-link-form mind, text

  # rename table
  move-form-name mind, user

  # add column
  make-link user, name, like text

  # remove column
  toss-link user, first-name
  toss-link user, last-name

  # remove table
  toss-form user

  # change_column_default
  diff-link-base user, name, text <foo>

  # add_check_constraint
  make-test user, name price-check
    hold price, greater, 0
    test false # validate: false

  # remove_check_constraint
  toss-test user, name price-check

  # add_index
  make-save user, email

  # add_reference
  make-cite user, city

  # add_foreign_key
  make-code user, order

  # validate_foreign_key
  test-code user, order

  # change_column_null
  diff-void user, name, false
```

```
task diff
  # create table
  call make-form
    bind name, term mind
    bind link
      make link
        bind name, term code
        bind like, like code
        bind code, term true

  # create table with tree/fuse
  call self/make-form
    bind name, term mind
    fuse self/link-code, term code
      like code
    fuse self/link, term first-name
      like text
    fuse self/link, term last-name
      like text

  # all the rest of the methods in the previous code-block
  # are likewise written like this as well, with `call`:
  call self/make-save
    term user
    term email
```

## Database-Driven Forms (Models)

```
form user
  bind base, term postgres

host base
  host user, loan user
```

## Models

```
form mind
  note <User>
  link code, like code
    code true
  link role, list role, link mind
  link name, like text
  link hook, like term
  link base, like base, like mind

form base
  note <Client station with API key>
  link mark, like text
    note <API token>
  link mind, like mind
  link meet, like term
    note <Status>
    take unverified
    take verified
    take enterprise

  link make-deck-band-size, like size
    base 0
    note <Deck creation limit per period>
  link make-deck-band-size-date, void date
    note <Last time deck was created in time period>

  link make-deck-mark-band-size, like size
    base 0
    note <Deck version creation limit per period>
  link make-deck-mark-band-size-date, void date
    note <Last time deck was created in time period>

  link make-deck-size, like size
    base 0
    note <Deck creation limit>
  link make-deck-size-date, void date
    note <Last time deck was created in time period>

  link make-host-size-band, like size
    base 0
    note <Host creation limit per day>
  link make-host-size-band-date, void date
    note <Last time host was created in time period>

  link make-host-size, like size
    base 0
    note <Host creation limit>
  link make-host-size-date, void date
    note <Last time host was created in time period>

form role
  note <User membership/role>
  link code, like code
    code true
  link mind, like mind
  link team
  link sort, like term
    note <Role type>
    take owner
    take funder

form host
  note <Namespace/organization>
  link code, like code
    code true
  link name, like text
  link hook, like term
  link deck, list deck, link host
  link role, list role, link team
  link deck-code-base, like size
    note <PRNG for generating pseudorandom name>

form deck
  link code, like code
    code true
  link hook, like term
  link host, like host
  link role, list role, link team
  link head, void deck-mark, link deck
  link load-size, like size
    base 0
    note <Number of downloads>
  link mark-size, like size
    base 1
    note <Number of versions published>
  link save-link, like text
    note <Repo link>
  link sort, like term
    note <Whether it's a playground/make or library/tool or app/site>

form deck-mark
  note <Version of deck>
  link code, like code
    code true
  link hint, like text
    note <Short description>
  link deck, like deck
  link file, list file
  link mark, like text
  link lock, like term
    note <License>
  link date, like date
  link ball-size, like size
    note <Zip file size>
  link load-size, like size
    base 0
    note <Number of downloads>
  link mark-size, like size
    base 1
    note <Number of versions published>
  link read-link, like text
    note <Documentation link>
  link ball-hash, like text
    note <SHA-512 hash base64 encoded>

form hook-vercel
  note <Vercel integration>
  link code, like code
    code true
  link mark, like text
    note <Token>

form hook-github
  note <GitHub integration, for login>
  link code, like code
    code true
  link mark, like text
    note <Token>

form turn
  note <Session>
  link code, like code
    code true
  link mark, like text
    note <Token>

form slot
  note <IP address>
  link code, like code
    code true
  link link, like text
    note <IP address itself>
  link lock, like wave
    note <Whether they are locked out>

form file
  link code, like code
    code true
  link link, like text
  link size, like size
  link sort, like term # encoding

form view
  note <Image>
  link code, like code
    code true
  link link, like text
  link size, like size

form film
  note <video>
  link code, like code
    code true
  link link, like text
  link size, like size
```

## Inspiration

- https://github.com/ariga/atlas
  ([explore](https://gh.atlasgo.cloud/explore/0083bc5b))
