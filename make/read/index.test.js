
const assert = require('assert')
const format = require('./read.format')
const read = require('./read')

test(
`foo bar`,
`start(
  foo(
    bar
  )
)`
)

test(
`foo bar baz`,
`start(
  foo(
    bar(
      baz
    )
  )
)`
)

test(
`foo <bar>`,
`start(
  foo(
    'bar'
  )
)`
)

test(
`foo <bar {baz}>`,
`start(
  foo(
    'bar '    baz
  )
)`
)


test(
`foo <bar {baz}!>`,
`start(
  foo(
    'bar '    baz    '!'
  )
)`
)

test(
`foo <bar {baz}!>, bing`,
`start(
  foo(
    'bar '    baz    '!',
    bing
  )
)`
)

test(
`foo #u1232, 123`,
`start(
  foo(
    #u1232,
    123
  )
)`
)

test(
`weave string
  state symbol
  weave esc
    stack symbol
  leave build, share symbol`,
`start(
  weave(
    string,
    state(
      symbol
    ),
    weave(
      esc,
      stack(
        symbol
      )
    ),
    leave(
      build,
      share(
        symbol
      )
    )
  )
)`
)

test(
`check test
  mount start, share minus
  mount front, share true
  catch test
    shift multiply
      mount start, write -1
      mount front, share number
      store number`,
`start(
  check(
    test,
    mount(
      start,
      share(
        minus
      )
    ),
    mount(
      front,
      share(
        true
      )
    ),
    catch(
      test,
      shift(
        multiply,
        mount(
          start,
          write(
            -1
          )
        ),
        mount(
          front,
          share(
            number
          )
        ),
        store(
          number
        )
      )
    )
  )
)`
)

// test(
//   `foo <bar {baz beep <boop>}!>`,
//   `start(
//     foo(
//       'bar '    baz'!'
//     )
//   )`
//   )

function test(a, b) {
  assert.strictEqual(format(read(a)).trim(), b.trim())
}
