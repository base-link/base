
module.exports = mintNest

function mintNest(base) {
  const stem = []

  push(base)

  function push(base) {
    stem.push({
      form: 'term',
      name: base.name
    })

    if (base.link[0]) {
      push(base.link[0])
    }
  }

  return {
    form: 'nest',
    stem
  }
}
