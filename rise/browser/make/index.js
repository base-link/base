
const makers = {}

const { make: makeMesh } = require('../view/mesh')

module.exports = {
  make,
  register
}

function register(name, maker) {
  makers[name] = maker
}

function make(type, bind, home) {
  let ctor

  if (type.form === 'view') {
    return makeMesh(type)
  }

  if (path.depth > 1) {
    ctor = getFromHome(home, path)
  } else {
    ctor = getFromHome(home, ['form', ...path])
  }

  if (!ctor) throw new Error('No constructor found')

  const maker = makers[ctor.name]
  return maker(bind, home)
}
