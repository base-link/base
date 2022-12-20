import { BaseForkMixinType } from './type'

export default <BaseForkMixinType>{
  extendObject(x: Object, a: Object): Object {
    const p = { __proto__: x }
    Object.assign(p, a)
    return p
  },
}
