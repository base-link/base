import Base from './base'
import treeMixin from './tree'
import forkMixin from './fork'
import nestMixin from './nest'
import knitMixin from './knit'
import textMixin from './text'
import cardDeckMixin from './card/deck'
import cardCodeMixin from './card/code'

applyMixin(Base, treeMixin)
applyMixin(Base, forkMixin)
applyMixin(Base, nestMixin)
applyMixin(Base, knitMixin)
applyMixin(Base, textMixin)
applyMixin(Base, cardCodeMixin)
applyMixin(Base, cardDeckMixin)

export default Base

// This can live anywhere in your codebase:
function applyMixin(derivedCtor: Function, mixin: Object) {
  Object.getOwnPropertyNames(mixin).forEach(name => {
    const desc = Object.getOwnPropertyDescriptor(mixin, name)

    if (desc) {
      Object.defineProperty(derivedCtor.prototype, name, desc)
    }
  })
}
