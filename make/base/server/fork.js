
module.exports = {
  extendObject(x, a) {
    const p = { __proto__: x }
    Object.assign(p, a)
    return p
  },
}
