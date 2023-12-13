## API

```
Content-Type: text/note
```

A `seek mint` is only the request parameters, no importing or loading
external code. It allows `host` and interpolation, but not much else.

```
PATCH https://base.surf

# no interpolation
# it comes like this for seek requests by default.
bind nick, term false

seek make-user
  save email, <foo@bar.com>
  save name, <foo>
  take code

seek take
  take user
    sort email, like rise
    move 100
    size 100
    take code
    take email
    take name

seek take
  # take == field to read
  take site, list false
    # link == join
    link link-form-link
      base form-link/base-code
      head code
    link link-host-link
      base host-link/base-code
      head code
    link link-host-name-link
      base host-link/code
      head host-name-link/base-code
    link link-host-name
      base host-name/base-code
      base host-name-link/code

    # find == where clause
    find form-link/name
      text <form>
    find host-link/name
      text <host>
    find host-name/head
      text <org1>

    take code
```

Define what you can fetch.

```
host take
  host user
    host email
    host name
    host story
```

Define what you can query:

```
host find
  host user
    host email
    host name
```

Define the schema

```
load ./user
  find form user
load ./site
  find form site

host base
  host user, loan user
  host site, loan site
```

To send an image or zip with JSON:

```js
const formData = new FormData()

formData.append(
  'items',
  new Blob(
    [
      JSON.stringify({
        name: 'Book',
        quantity: '12',
      }),
    ],
    {
      type: 'application/json',
    },
  ),
)
formData.append('image', imageFile)
```
