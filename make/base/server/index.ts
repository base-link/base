import Base from './base'
import treeMixin from './tree'
import forkMixin from './fork'
import nestMixin from './nest'
import knitMixin from './knit'
import textMixin from './text'
import cardDeckMixin from './card/deck'
import cardCodeMixin from './card/code'

Object.assign(Base.prototype, treeMixin)
Object.assign(Base.prototype, forkMixin)
Object.assign(Base.prototype, nestMixin)
Object.assign(Base.prototype, knitMixin)
Object.assign(Base.prototype, textMixin)
Object.assign(Base.prototype, cardCodeMixin)
Object.assign(Base.prototype, cardDeckMixin)

export default Base
