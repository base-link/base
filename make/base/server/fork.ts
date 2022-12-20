export default {
  extendObject(x: Object, a: Object) {
    const p = { __proto__: x }
    Object.assign(p, a)
    return p
  },
}
