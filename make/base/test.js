
const Base = require('.')

const base = new Base()

// hook up the data configurations.
base.hook('<hash>', () => {
  const c1 = base.card(1)
  const c2 = base.card(2)

  const c1_tree = {
    form: {
      foo: {
        take: {
          bar: {}
        },
        task: {
          log(msg) {
            console.log('foo', msg)
          }
        }
      }
    },
    x: 111
  }

  const c2_tree = {
    form: {
      bar: {
        take: {
          foo: {
            take_form: c1_tree.form.foo,
          }
        }
      }
    }
  }

  c1_tree.form.foo.take.bar.take_form = c2_tree.form.bar

  c1.bind(c1_tree)
  c2.bind(c2_tree)

  return () => {
    c1.free()
    c2.free()
  }
})

// // tell which ones depend on this.
base.link('<hash>', ['<hash2>', '<hash3>'])

// // trigger a cascading update.
base.bind('<hash>')

base.card(1).tree.form.foo.task.log('hello')

// on hot module reload, free the old module.
base.free('<hash>')
