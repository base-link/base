Generic algorithm for rendering link text from the data.

    {
      form: 'link-term',
      text: 'site',
      nest: [
        {
          form: 'link-text',
          text: [
            {
              form: 'link-cord'
            }
          ]
        }
      ]
    }

You have it go down. The source of the AST you decorate with the colors
you want. So we build a CST

    lace term, term note
      bind fill, term gray
      lace text, loan kink/note
        bind fill, term red
      lace line # blank line

A default implementation would render the syntax highlighting basically.

The implementation is specified in JS for now. The implementation is for
converting data into link text. It's as if we have a toJSON method, to
toLink().

The toLink() method is also colorized.

You are essentially creating custom views for each term. So you need to
specify it in detail.

You have a default thing for most of it, but otherwise prettier takes
care of it. The default is everything outside the header and footer
basically, like a markup document.

    site: [
      {
        file: '',
        call: '',
      }
    ]

The first one goes in the text slot. The next ones get named nested
inside.

    note: 'foo',
    code: 123,
    need: [],
    text: '', // if the text is multiline, then nest it.
    site: [],
