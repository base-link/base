import Look from './index.js'
import Fill from './fill.js'
import BindSite from './bind/site.js'
import BindList from './bind/list.js'
import BindSink from './bind/sink.js'

const look = new Look()
const fill = new Fill({ look, name: 'start' })

fill.on('take', () => {
  console.log('resolved')
})

const site = new BindSite()

look.seek('a').seek('b').seek('c1')
look.seek('a').seek('b').seek('c2')
look.seek('a').seek('b').seek('d').seek('c3')
look.seek('a').seek('x').seek('y')

fill.hold(site)

const a = new BindSite()
const b = new BindList()
const b_a = new BindSite()
const b_a_c1 = new BindSink('b_a_c1')
const b_a_c2 = new BindSink('b_a_c2')
const b_a_c3 = new BindSink('b_a_c3')
const b_b = new BindSite()
const b_b_c1 = new BindSink('b_b_c1')
const b_b_c2 = new BindSink('b_b_c2')
const b_b_c3 = new BindSink('b_b_c3')
const b_c = new BindSite()
const b_c_c1 = new BindSink('b_c_c1')
const b_c_c2 = new BindSink('b_c_c2')
const b_c_c3 = new BindSink('b_c_c3')
const x = new BindSite()
const y = new BindSink('y')
const d = new BindList()
const d_a = new BindSite()
const d_a_c3 = new BindSink('d_a_c3')
b_a.save('c1', b_a_c1)
b_a.save('c2', b_a_c2)
// b_a.save('c3', b_a_c3)
b_b.save('c1', b_b_c1)
b_b.save('c2', b_b_c2)
// b_b.save('c3', b_b_c3)
b_c.save('c1', b_c_c1)
b_c.save('c2', b_c_c2)
// b_c.save('c3', b_c_c3)
b.saveHead(b_a)
// b.saveHead(b_b)
// b.saveHead(b_c)
x.save('y', y)
a.save('b', b)
a.save('x', x)
d_a.save('c3', d_a_c3)
d.saveHead(d_a)
d.seal()
b_a.save('d', d)

site.save('a', a)

b.seal()

console.log('done')
