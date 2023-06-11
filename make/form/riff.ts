export type Riff =
  | RiffHold
  | RiffBind
  | RiffWave
  | RiffCall
  | RiffHook
  | RiffFormHead
  | RiffSuit
  | RiffSuit
  | RiffCite
  | RiffForm
  | RiffDock
  | RiffHost
  | RiffComb
  | RiffBear
  | RiffTask
  | RiffHideBear
  | RiffLoad
  | RiffLoadFindTake
  | RiffLoadFind
  | RiffFuse
  | RiffTake
  | RiffDeckLock
  | RiffDeck
  | RiffDeckFace
  | RiffLine
  | RiffSideSize
  | RiffTextList
  | RiffText
  | RiffTree
  | RiffTermLink
  | RiffTest
  | RiffText
  | RiffSize
  | RiffLink
  | RiffCodeCard
  | RiffDeckCard
  | RiffHook
  | RiffLink

export type RiffBase = {
  base?: RiffBase
  // id
  code: string
  // how it is passed down.
  name: string
  // state of how complete the AST node is.
  riseMark: RiffRiseMark
  // runtime type
  workForm?: RiffName
  // whether or not the type form is accepted
  workFormTake: boolean
}

// export type RiffComb = RiffBase & {
// form: RiffName.Comb
//   type: Mesh.Decimal
// }
export type RiffBear = RiffBase & {
  form: RiffName.Bear
  link: {
    hide: Array<RiffHideBear>
    link?: RiffText
  }
}

export type RiffBind = RiffBase & {
  form: RiffName.Bind
  link: {
    bond?: RiffBond
    name?: RiffTermLink
  }
}

export type RiffBond =
  | RiffText
  | RiffSize
  | RiffSideSize
  | RiffComb
  | RiffWave

// export type RiffWave =
//   | RiffWave
//   | RiffLine
//   | RiffTextList
//   | RiffTermLink
//   | RiffText
// export type RiffWave = RiffBase & {
//   type: Mesh.Boolean
//   value: boolean
// }
export type RiffCall = RiffBase & {
  form: RiffName.Call
  link: {
    bind: Array<RiffBind>
    bond?: RiffTask
    link?: RiffLineForm
    risk?: RiffWave
    wait?: RiffWave
  }
}

export type RiffCite = RiffBase & {
  form: RiffName.Cite
  link: {
    bind: Array<RiffCite>
    bond?: RiffForm
    name?: RiffTermLink
  }
}

export type RiffCodeCard = RiffBase & {
  form: RiffName.CodeCard
  link: {
    bear: Array<RiffBear>
    dock: Array<RiffDock>
    form: Array<RiffForm>
    fuse: Array<RiffFuse>
    hook: Array<RiffHook>
    host: Array<RiffHost>
    load: Array<RiffLoad>
    suit: Array<RiffSuit>
    task: Array<RiffTask>
    test: Array<RiffTest>
    tree: Array<RiffTree>
  }
}

export type RiffComb = RiffBase & {
  form: RiffName.Comb
  link: {
    bond: number
  }
}

export type RiffDeck = RiffBase & {
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

export type RiffDeckCard = RiffBase & {
  form: RiffName.DeckCard
  link: {
    deck?: RiffDeck
  }
}

export type RiffDeckFace = RiffBase & {
  form: RiffName.DeckFace
  link: {
    name?: RiffText
    site?: RiffText
  }
}

export type RiffDeckLock = RiffBase & {
  form: RiffName.DeckLock
}

export type RiffDock = RiffBase & {
  form: RiffName.Dock
}

export type RiffForm = RiffBase & {
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

export type RiffFormHead = RiffBase & {
  form: RiffName.FormHead
  link: {
    base?: RiffCite
    name?: RiffTermLink
  }
}

export type RiffFuse = RiffBase & {
  form: RiffName.Fuse
  link: {
    bind: Array<RiffBind>
    name?: RiffTermLink
  }
}

export type RiffHideBear = RiffBase & {
  form: RiffName.HideBear
  link: {
    hostName?: RiffTermLink
    name?: RiffTermLink
  }
}

// assertion
export type RiffHold = RiffBase & {
  form: RiffName.Hold
  link: {}
}

export type RiffHook = RiffBase & {
  form: RiffName.Hook
  link: {
    call: Array<RiffCall>
    name?: RiffTermLink
    take: Array<RiffTake>
    task: Array<RiffTask>
  }
}

export type RiffHost = RiffBase & {
  form: RiffName.Host
  link: {
    bond?: RiffBond | Array<RiffHost>
    hide?: RiffWave
    name?: RiffTermLink
  }
}

export type RiffLine = RiffBase & {
  form: RiffName.Line
  link: {
    bond: LinkPath
  }
}

export type RiffLineForm = RiffLine | RiffTermLink | RiffText

export type RiffLink = RiffBase & {
  form: RiffName.Link
  link: {
    bond: RiffWave
    // owner
    cite: RiffWave
    // dereference
    flex: RiffWave
    // mutable
    have: RiffWave
    path: RiffLineForm
    // reference
    time?: string
  }
}

export type RiffLoad = RiffBase & {
  form: RiffName.Load
  link: {
    find: Array<RiffLoadFind>
    link?: RiffText
  }
}

export type RiffLoadFind = RiffBase & {
  form: RiffName.LoadFind
  link: {
    forkName?: RiffTermLink
    name?: RiffTermLink
    take?: RiffLoadFindTake
  }
}

export type RiffLoadFindTake = RiffBase & {
  form: RiffName.LoadFindTake
}

export enum RiffName {
  Bear = 'bear',
  Bind = 'bind',
  Call = 'call',
  Cite = 'cite',
  CodeCard = 'code-card',
  Comb = 'comb',
  Deck = 'deck',
  DeckCard = 'deck-card',
  DeckFace = 'deck-face',
  DeckLock = 'deck-lock',
  Dock = 'dock',
  Form = 'form',
  FormHead = 'form-head',
  Fuse = 'fuse',
  HideBear = 'hide-bear',
  Hold = 'hold',
  Hook = 'hook',
  Host = 'host',
  Line = 'line',
  Link = 'link',
  Load = 'load',
  LoadFind = 'load-find',
  LoadFindTake = 'load-find-take',
  SideSize = 'side-size',
  Size = 'size',
  Suit = 'suit',
  Take = 'take',
  Task = 'task',
  TermLink = 'term-link',
  Test = 'test',
  Text = 'text',
  TextLink = 'text-link',
  TextList = 'text-list',
  Tree = 'tree',
  Wave = 'wave',
  Wear = 'wear',
}

export enum RiffRiseMark {
  CollectionGathered = 'collection-gathered',
  Initialized = 'initialized',
  RuntimeComplete = 'runtime-complete',
  StaticComplete = 'static-complete',
}

export type RiffSideSize = RiffBase & {
  form: RiffName.SideSize
  link: {
    bond: number
  }
}

export type RiffSize = RiffBase & {
  form: RiffName.Size
  link: {
    bond: number
  }
}

export type RiffSuit = RiffBase & {
  form: RiffName.Suit
  link: {
    head: Array<RiffFormHead>
    hide?: RiffWave
    link: Array<RiffTake>
    name?: RiffTermLink
    task: Array<RiffTask>
  }
}

export type RiffTake = RiffBase & {
  form: RiffName.Take
  link: {
    name?: RiffText
  }
}

export type RiffTask = RiffBase & {
  form: RiffName.Task
  link: {
    base?: RiffTask
    call: Array<RiffCall>
    head: Array<RiffFormHead>
    hide?: RiffWave
    like?: RiffCite
    name?: RiffTermLink
    risk?: RiffWave
    take: Array<RiffTake>
    task: Array<RiffTask>
    wait?: RiffWave
  }
}

export type RiffTermLink = RiffBase & {
  form: RiffName.TermLink
  link: {
    bond: LinkTerm
  }
}

export type RiffTest = RiffBase & {
  form: RiffName.Test
  link: {}
}

export type RiffText = RiffBase & {
  form: RiffName.Text
  link: {
    bond: string
  }
}

export type RiffTextLink = RiffBase & {
  form: RiffName.TextLink
  link: {
    bond: LinkText
  }
}

export type RiffTextList = RiffBase & {
  form: RiffName.TextList
  link: {
    bond: Array<string>
  }
}

export type RiffTree = RiffBase & {
  form: RiffName.Tree
  link: {
    hide?: RiffWave
    hook: Array<RiffHook>
    name?: RiffTermLink
    take: Array<RiffTake>
  }
}

export type RiffWave = RiffBase & {
  form: RiffName.Wave
  link: {
    bond: boolean
  }
}

export type RiffWear = RiffBase & {
  form: RiffName.Wear
}
