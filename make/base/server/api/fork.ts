export function extendObject(x: Object, a: Object): Object {
  const p = { __proto__: x }
  Object.assign(p, a)
  return p
}
