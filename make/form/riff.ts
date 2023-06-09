
export enum RiffRiseMark {
  CollectionGathered = 'collection-gathered',
  Initialized = 'initialized',
  RuntimeComplete = 'runtime-complete',
  StaticComplete = 'static-complete',
}

export type RiffBase = {
  // how it is passed down.
  name: string
  // id
  code: string
  base?: RiffBase
  // state of how complete the AST node is.
  riseMark: RiffRiseMark
  // whether or not the type form is accepted
  workFormTake: boolean
  // runtime type
  workForm?: RiffName
}

export enum RiffName {
  Bind = 'bind',
  Text = 'text',
  Call = 'call',
  Form = 'form',
  FormHead = 'form-head',
  Hook = 'hook',
  Take = 'take',
  CodeCard = 'code-card',
  Wear = 'wear',
  Suit = 'suit',
  Cite = 'cite',
  Dock = 'dock',
  Host = 'host',
  Bear = 'bear',
  Task = 'task',
  HideBear = 'hide-bear',
  Load = 'load',
  LoadFindTake = 'load-find-take',
  LoadFind = 'load-find',
  Fuse = 'fuse',
  DeckLock = 'deck-lock',
  DeckCard = 'deck-card',
  Deck = 'deck',
  DeckFace = 'deck-face',
  Line = 'line',
  SideSize = 'side-size',
  TextList = 'text-list',
  Tree = 'tree',
  Wave = 'wave',
  TermLink = 'term-link',
  Test = 'test',
  TextLink = 'text-link',
  Comb = 'comb',
  Hold = 'hold',
  Size = 'size',
  Link = 'link',
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

export type RiffText = RiffBase & {
  form: RiffName.Text
  link: {
    bond: string
  }
}

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

export type RiffForm = RiffBase & {
  form: RiffName.Form
  link: {
    hook: Array<RiffHook>
    hide?: RiffWave
    wear: Array<RiffWear>
    task: Array<RiffTask>
    name?: RiffTermLink
    link: Array<RiffTake>
    head: Array<RiffFormHead>
  }
}

export type RiffFormHead = RiffBase & {
  form: RiffName.FormHead
  link: {
    base?: RiffCite
    name?: RiffTermLink
  }
}

export type RiffHook = RiffBase & {
  form: RiffName.Hook
  link: {
    task: Array<RiffTask>
    take: Array<RiffTake>
    name?: RiffTermLink
    call: Array<RiffCall>
  }
}

export type RiffTake = RiffBase & {
  form: RiffName.Take
  link: {
    name?: RiffText
  }
}

export type RiffCodeCard = RiffBase & {
  form: RiffName.CodeCard
  link: {
    hook: Array<RiffHook>
    suit: Array<RiffSuit>
    form: Array<RiffForm>
    dock: Array<RiffDock>
    host: Array<RiffHost>
    bear: Array<RiffBear>
    task: Array<RiffTask>
    load: Array<RiffLoad>
    tree: Array<RiffTree>
    fuse: Array<RiffFuse>
    test: Array<RiffTest>
  }
}

export type RiffWear = RiffBase & {
  form: RiffName.Wear
}

export type RiffSuit = RiffBase & {
  form: RiffName.Suit
  link: {
    hide?: RiffWave
    task: Array<RiffTask>
    name?: RiffTermLink
    link: Array<RiffTake>
    head: Array<RiffFormHead>
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

export type RiffDock = RiffBase & {
  form: RiffName.Dock
}

export type RiffHost = RiffBase & {
  form: RiffName.Host
  link: {
    hide?: RiffWave
    name?: RiffTermLink
    bond?: RiffBond | Array<RiffHost>
  }
}

// export type RiffComb = RiffBase & {
  // form: RiffName.Comb
//   type: Mesh.Decimal
// }

export type RiffBear = RiffBase & {
  form: RiffName.Bear
  link: {
    link?: RiffText
    hide: Array<RiffHideBear>
  }
}

export type RiffTask = RiffBase & {
  form: RiffName.Task
  link: {
    base?: RiffTask
    like?: RiffCite
    task: Array<RiffTask>
    hide?: RiffWave
    take: Array<RiffTake>
    name?: RiffTermLink
    risk?: RiffWave
    call: Array<RiffCall>
    head: Array<RiffFormHead>
    wait?: RiffWave
  }
}

export type RiffHideBear = RiffBase & {
  form: RiffName.HideBear
  link: {
    name?: RiffTermLink
    hostName?: RiffTermLink
  }
}

export type RiffLoad = RiffBase & {
  form: RiffName.Load
  link: {
    link?: RiffText
    find: Array<RiffLoadFind>
  }
}

export type RiffLoadFindTake = RiffBase & {
  form: RiffName.LoadFindTake

}

export type RiffLoadFind = RiffBase & {
  form: RiffName.LoadFind
  link: {
    name?: RiffTermLink
    take?: RiffLoadFindTake
    forkName?: RiffTermLink
  }
}

export type RiffFuse = RiffBase & {
  form: RiffName.Fuse
  link: {
    bind: Array<RiffBind>
    name?: RiffTermLink
  }
}

export type RiffDeckLock = RiffBase & {
  form: RiffName.DeckLock

}

export type RiffDeckCard = RiffBase & {
  form: RiffName.DeckCard
  link: {
    deck?: RiffDeck
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

export type RiffDeckFace = RiffBase & {
  form: RiffName.DeckFace
  link: {
    name?: RiffText
    site?: RiffText
  }
}

export type RiffLineForm =
  | RiffLine
  | RiffTermLink
  | RiffText

export type RiffLine = RiffBase & {
  form: RiffName.Line
  link: {
    bond: LinkPath
  }
}

export type RiffSideSize = RiffBase & {
  form: RiffName.SideSize
  link: {
    bond: number
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
    take: Array<RiffTake>
    name?: RiffTermLink
  }
}

export type RiffWave = RiffBase & {
  form: RiffName.Wave
  link: {
    bond: boolean
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
  link: {

  }
}

export type RiffTextLink = RiffBase & {
  form: RiffName.TextLink
  link: {
    bond: LinkText
  }
}

export type RiffComb = RiffBase & {
  form: RiffName.Comb
  link: {
    bond: number
  }
}

// assertion
export type RiffHold = RiffBase & {
  form: RiffName.Hold
  link: {

  }
}

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

export type RiffSize = RiffBase & {
  form: RiffName.Size
  link: {
    bond: number
  }
}

export type RiffLink = RiffBase & {
  form: RiffName.Link
  link: {
    bond: RiffWave // dereference
    flex: RiffWave // mutable
    have: RiffWave // owner
    cite: RiffWave // reference
    time?: string
    path: RiffLineForm
  }
}
