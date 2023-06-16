import { Form } from './form'
import { RiffHash, RiffText, RiffWave } from './tree'

export type RiffDeck = {
  form: RiffName.Deck
  link: {
    bear?: RiffText
    face: Array<RiffDeckFace>
    host?: RiffText
    mark?: RiffText
    name?: RiffText
    read?: RiffText
    term: Array<RiffText>
    test?: RiffText
  }
}

export type RiffDeckCard = {
  form: RiffName.DeckCard
  link: {
    deck?: RiffDeck
    line: string
  }
}

export type RiffDeckFace = {
  form: RiffName.DeckFace
  link: {
    name?: RiffText
    site?: RiffText
  }
}

export type RiffDeckLock = {
  form: RiffName.DeckLock
  link: {}
}

export type RiffDock = {
  form: RiffName.Dock
  link: {}
}

// a placeholder unparsed yet.
export type RiffFoldList = {
  link: {}
}

export type RiffForm = {
  form: RiffName.Form
  link: {
    head: Array<RiffFormHead>
    hide?: RiffWave
    hook: Array<RiffHook>
    link: Array<RiffTake>
    name?: RiffTermLink
    task: Array<RiffTask>
    wear: Array<RiffWear>
  }
}

export type RiffFormHead = {
  form: RiffName.FormHead
  link: {
    base?: RiffCite
    name?: RiffTermLink
  }
}

export type SinkBear = {
  form: `sink-${Form.Bear}`
  link: {
    hide: Array<RiffHideBear>
    link?: RiffText
  }
}

export type SinkBind = {
  form: `sink-${Form.Bind}`
  link: {
    bond?: RiffBond
    name?: RiffTermLink
  }
}

export type SinkBond<
  Form extends keyof SinkHash,
  List extends boolean = false,
> = {
  bond: List extends true ? Array<SinkLink<Form>> : SinkLink<Form>
  form: 'sink-link'
  headSize: number
  leadSize: number
  // unprocessed yet
  needSize: number
  // progressively build it up
  // nick: Array<Nick>
  // how many children are left incomplete
  // if needSize === 0, it is done.
  tree: RiffHash[Form]
}

export type SinkCall = {
  form: `sink-${Form.Call}`
  link: {
    bind: SinkBond<Form.Bind, true>
    line?: SinkBond<Form.Line>
    link?: RiffLineForm
    risk?: RiffWave
    wait?: RiffWave
  }
}

export type SinkCodeCard = {
  bear: SinkBond<'bear', true>
  dock: SinkBond<'dock', true>
  form: SinkBond<'form', true>
  fuse: SinkBond<'fuse', true>
  hook: SinkBond<'hook', true>
  host: SinkBond<'host', true>
  load: SinkBond<'load', true>
  suit: SinkBond<'suit', true>
  task: SinkBond<'task', true>
  test: SinkBond<'test', true>
  tree: SinkBond<'tree', true>
}

export type SinkComb = {
  form: RiffName.Comb
  link: {
    bond: number
  }
}

export type SinkHash = {
  take: SinkTake
  task: SinkTask
}

export type SinkLink<T extends keyof SinkHash> = {
  link: SinkHash[T]
  // index it came in.
  slot: number
}

export type SinkTake = {
  like: SinkBond<'like'>
  name: RiffText
}

export type SinkTask = {
  take: SinkBond<'take'>
}
