# UI Components in BaseLink

```
zone home-footer-section
  zone nav
    zone ul
      zone li
        zone link
          bind href, text /code/term
          bind text, text <Terms>
      zone li
        zone link
          bind href, text /code/lock
          bind text, text <Privacy>
```

```
zone verse
  take trace

  host is-title-visible
  host is-entering-title
  host is-leaving-title

  tune x
    move fade-in
      hook update
        base value
        save x, link value
  tune y
    move fade-out

  hook mount-start
    save is-entering-title, link on
    save is-title-visible, link on
  hook leave-start
    save is-leaving-title, link on
  hook leave
    save is-title-visible, link off

  zone title
    test is-entering-title
      tune animate-opacity-and-width
        hook end
          save is-entering-title, link off
    test is-leaving-title
      tune leave
    test is-title-visible
```
