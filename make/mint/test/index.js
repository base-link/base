
module.exports = mint

function mint(base) {
  const name = findName(base)
  const test = {
    name
  }
  return test
}

function findName(base) {
  return base.link[0].name.trim()
}
