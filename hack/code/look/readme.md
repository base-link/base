```ts
const card = new BindSite()
const fill = new FillCard()

fill.bind(card)

const fork = fill.fork()

fork.waitList('form').wait('name')

const fork2 = fill.fork()

fork2.waitList('form').wait('name', 'user')
fork2.hook(() => {
  console.log('resolved fork2')
})

const userForm = new BindSite({
  name: 'user',
})

const formList = new BindList([userForm])

card.save('form', formList)
```

At first you are working with the card fill. Then once it it is ready,
you take the built card out of it and use that.

```ts
fork2.waitList('form').wait('name')
fork2.hook(() => {
  console.log('resolved fork2')
})
```

At first you don't know how large the list is going to be. The list has
potential items, and then it is called `take` on the bind. It's a
bounded list. Or call it `seal`, to close the list from any more
additions.

```ts
fork2.wait('form').wait('name')
fork2.take(() => {
  console.log('resolved fork2')
})

const formList = new BindList([userForm])

formList.seal() // say it's ready
```

```ts
fork.on('seal', () => {
  // do whatever you need to to build the AST further.
})
```

When the objects are ready, then you call `seal` on them to freeze them
from being changed.

So if you call `.seal()` on a list before all items have been sealed,
then it will wait for all items to be sealed.

```ts
saveHead // push

function seal() {
  if (this.seedSealSize === this.length) {
    this.emit('seal')
  } else {
    this.vibeSeal = true
  }
}
```

Or perhaps you don't need that.

So we have Bind and Fill. The fill is just a tree of watchers, which
watches the bind objects. The bind objects are what we set values on.

If the bind object is a `BindList`, then we wait for the `seal` event
before saying it's ready. If the bind object is a `BindSite` (an
object), then we wait until we get the `save` event for each field. When
we get the save event, we increment the `takeSize`. Once that equals the
`bindSize`, then we trigger `take` on the `Fill`. Once we get `take` on
the `Fill`, we have all our properties ready to be evaluated. This could
mean adding another fill fork, since we can have interpolated
interpolated properties, etc..

We then have a FillBase, which monitors the whole set of packages, the
FillDeck, which monitors the cards, and Fill is the card.

The BindHash is a hash table. It is what the base and deck use.

---

```ts
const look = new Look()
look.seek('form').seek('name')

const fill = new Fill(look)

const hash = new BindSite()
fill.load(hash)

const formList = new BindList()
const form = new BindSite()
const name = new BindSink('user')
form.save('name', name)
formList.saveHead(form)
hash.save('form', formList)
```
