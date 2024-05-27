import { Form } from './form'

export type Tree =
  | TreeBear
  | TreeBind
  | TreeCall
  | TreeLike
  | TreeCodeCard
  | TreeComb
  | TreeDeck
  | TreeDeckCard
  | TreeDeckFace
  | TreeDeckLock
  | TreeDock
  | TreeForm
  | TreeFormHead
  | TreeFuse
  | TreeHideBear
  | TreeHold
  | TreeHook
  | TreeHost
  | TreeLine
  | TreeLink
  | TreeLoad
  | TreeLoadFind
  | TreeLoadFindTake
  | TreeSideSize
  | TreeSize
  | TreeSuit
  | TreeTake
  | TreeTask
  | TreeLine
  | TreeTest
  | TreeText
  | TreeTextLink
  | TreeTree
  | TreeWave
  | TreeWear
  | TreeDeckLink

export type TreeBase = {
  // id
  // code: string
  // parent, so we can build paths
  base?: Tree
  // module associated with this, for easier error reporting
  card?: TreeCard
  // scope associated with this node.
  fork: any
  // unprocessed yet
  needSize: number
  // state of how complete the AST node is.
  riseMark: TreeRiseMark
  // list of children values which are dynamic unparsed terms
  // list: Array<LinkTreeType>
  // how it is passed down.
  slot: string
  // the link tree (parsed text) associated with this
  // tree: LinkTreeType
  // runtime type
  workForm?: TreeName
  // whether or not the type form is accepted
  workFormTake: boolean
}

// export type TreeComb = TreeBase & {
// form: `tree-${Form.Comb}`
//   type: Mesh.Decimal
// }
export type TreeBear = TreeBase & {
  form: `tree-${Form.Bear}`
  link: {
    hide: TreeList<TreeHideBear>
    link?: TreeText
  }
}

export type TreeBind = TreeBase & {
  form: `tree-${Form.Bind}`
  link: {
    bond?: TreeBond // or more
    name?: TreeLine
  }
}

export type TreeBond =
  | TreeText
  | TreeSize
  | TreeSideSize
  | TreeComb
  | TreeWave

export type TreeCall = TreeBase & {
  form: `tree-${Form.Call}`
  link: {
    bind: TreeList<TreeBind>
    line?: TreeLineForm
    risk?: TreeWave
    wait?: TreeWave
  }
}

export type TreeCard = TreeCodeCard | TreeDeckCard

export type TreeCodeCard = TreeBase & {
  form: `tree-${Form.CodeCard}`
  link: {
    bear: TreeList<TreeBear>
    dock: TreeList<TreeDock>
    form: TreeList<TreeForm>
    fuse: TreeList<TreeFuse>
    hook: TreeList<TreeHook>
    host: TreeList<TreeHost>
    line: string
    lineText: Array<string>
    linkTree: LinkTreeType
    load: TreeList<TreeLoad>
    suit: TreeList<TreeSuit>
    task: TreeList<TreeTask>
    test: TreeList<TreeTest>
    text: string
    tree: TreeList<TreeTree>
  }
}

export type TreeComb = TreeBase & {
  form: `tree-${Form.Comb}`
  link: {
    bond: number
  }
}

export type TreeDeck = TreeBase & {
  form: `tree-${Form.Deck}`
  link: {
    bear?: TreeText
    deck: TreeList<TreeDeckLink>
    face: TreeList<TreeDeckFace>
    host?: TreeText
    mark?: TreeText
    name?: TreeText
    read?: TreeText
    term: TreeList<TreeText>
    test?: TreeText
  }
}

export type TreeDeckCard = TreeBase & {
  form: `tree-${Form.DeckCard}`
  link: {
    deck?: TreeDeck
    line: string
  }
}

export type TreeDeckFace = TreeBase & {
  form: `tree-${Form.DeckFace}`
  link: {
    name?: TreeText
    site?: TreeText
  }
}

export type TreeDeckLink = TreeBase & {
  form: `tree-${Form.DeckLink}`
  link: {
    mark?: TreeText
    name?: TreeText
  }
}

export type TreeDeckLock = TreeBase & {
  form: `tree-${Form.DeckLock}`
  link: {}
}

export type TreeDock = TreeBase & {
  form: `tree-${Form.Dock}`
  link: {}
}

// a placeholder unparsed yet.
export type TreeFoldList = TreeBase & {
  link: {}
}

export type TreeForm = TreeBase & {
  form: `tree-${Form.Form}`
  link: {
    head: TreeList<TreeFormHead>
    hide?: TreeWave
    hook: TreeList<TreeHook>
    link: TreeList<TreeTake>
    name?: TreeLine
    task: TreeList<TreeTask>
    wear: TreeList<TreeWear>
  }
}

export type TreeFormHead = TreeBase & {
  form: `tree-${Form.FormHead}`
  link: {
    base?: TreeLike
    name?: TreeLine
  }
}

export type TreeFuse = TreeBase & {
  form: `tree-${Form.Fuse}`
  link: {
    bind: TreeList<TreeBind>
    name?: TreeLine
  }
}

export type TreeHash = {
  bear: TreeBear
  bind: TreeBind
  call: TreeCall
  cite: TreeLike
  'code-card': TreeCodeCard
  comb: TreeComb
  deck: TreeDeck
  'deck-card': TreeDeckCard
  'deck-face': TreeDeckFace
  'deck-link': TreeDeckLink
  'deck-lock': TreeDeckLock
  dock: TreeDock
  form: TreeForm
  'form-head': TreeFormHead
  fuse: TreeFuse
  'hide-bear': TreeHideBear
  hold: TreeHold
  hook: TreeHook
  host: TreeHost
  line: TreeLine
  link: TreeLink
  load: TreeLoad
  'load-find': TreeLoadFind
  'load-find-take': TreeLoadFindTake
  'side-size': TreeSideSize
  size: TreeSize
  suit: TreeSuit
  take: TreeTake
  task: TreeTask
  test: TreeTest
  text: TreeText
  tree: TreeTree
  wave: TreeWave
}

export type TreeHideBear = TreeBase & {
  form: `tree-${Form.HideBear}`
  link: {
    hostName?: TreeLine
    name?: TreeLine
  }
}

// assertion
export type TreeHold = TreeBase & {
  form: `tree-${Form.Hold}`
  link: {}
}

export type TreeHook = TreeBase & {
  form: `tree-${Form.Hook}`
  link: {
    call: TreeList<TreeCall>
    name?: TreeLine
    take: TreeList<TreeTake>
    task: TreeList<TreeTask>
  }
}

export type TreeHost = TreeBase & {
  form: `tree-${Form.Host}`
  link: {
    bond?: TreeBond | TreeList<TreeHost>
    hide?: TreeWave
    name?: TreeLine
  }
}

export type TreeLike = TreeBase & {
  form: `tree-${Form.Cite}`
  link: {
    bind: TreeList<TreeLike>
    name?: TreeLine
  }
}

export type TreeLine = TreeBase & {
  form: `tree-${Form.Line}`
  link: {
    // bond: LinkPathType
  }
}

export type TreeLineForm = TreeLine | TreeLine

export type TreeLink = TreeBase & {
  form: `tree-${Form.Link}`
  link: {
    bond: TreeWave
    // dereference
    cite: TreeWave
    // mutable
    flex: TreeWave
    // owner
    have: TreeWave
    line: TreeLineForm
    // reference
    time?: string
  }
}

export type TreeList<Form extends Tree> = {
  bond: Array<Form>
  form: `tree-${Form.List}`
  headSize: number
  leadSize: number
}

export type TreeLoad = TreeBase & {
  form: `tree-${Form.Load}`
  link: {
    find: TreeList<TreeLoadFind>
    link?: TreeText
  }
}

export type TreeLoadFind = TreeBase & {
  form: `tree-${Form.LoadFind}`
  link: {
    forkName?: TreeLine
    name?: TreeLine
    take?: TreeLoadFindTake
  }
}

export type TreeLoadFindTake = TreeBase & {
  form: `tree-${Form.LoadFindTake}`
  link: {}
}

export enum TreeName {
  Bear = 'riff-bear',
  Bind = 'riff-bind',
  Call = 'riff-call',
  Cite = 'riff-cite',
  CodeCard = 'riff-code-card',
  Comb = 'riff-comb',
  Deck = 'riff-deck',
  DeckCard = 'riff-deck-card',
  DeckFace = 'riff-deck-face',
  DeckLock = 'riff-deck-lock',
  Dock = 'riff-dock',
  Form = 'riff-form',
  FormHead = 'riff-form-head',
  Fuse = 'riff-fuse',
  HideBear = 'riff-hide-bear',
  Hold = 'riff-hold',
  Hook = 'riff-hook',
  Host = 'riff-host',
  Line = 'riff-line',
  Link = 'riff-link',
  Load = 'riff-load',
  LoadFind = 'riff-load-find',
  LoadFindTake = 'riff-load-find-take',
  SideSize = 'riff-side-size',
  Size = 'riff-size',
  Suit = 'riff-suit',
  Take = 'riff-take',
  Task = 'riff-task',
  Test = 'riff-test',
  Text = 'riff-text',
  TextLink = 'riff-text-link',
  TextList = 'riff-text-list',
  Tree = 'riff-tree',
  Wave = 'riff-wave',
  Wear = 'riff-wear',
}

export enum TreeNote {
  CollectionGathered = 'collection-gathered',
  Initialized = 'initialized',
  RuntimeComplete = 'runtime-complete',
  StaticComplete = 'static-complete',
}

export enum TreeRiseMark {
  CollectionGathered = 'collection-gathered',
  Initialized = 'initialized',
  RuntimeComplete = 'runtime-complete',
  StaticComplete = 'static-complete',
}

export type TreeSideSize = TreeBase & {
  form: `tree-${Form.SideSize}`
  link: {
    bond: number
  }
}

export type TreeSize = TreeBase & {
  form: `tree-${Form.Size}`
  link: {
    bond: number
  }
}

export type TreeSuit = TreeBase & {
  form: `tree-${Form.Suit}`
  link: {
    bind?: TreeList<TreeBind>
    head: TreeList<TreeFormHead>
    hide?: TreeWave
    link: TreeList<TreeTake>
    name?: TreeLine
    task: TreeList<TreeTask>
  }
}

export type TreeTake = TreeBase & {
  form: `tree-${Form.Take}`
  link: {
    name?: TreeText
  }
}

export type TreeTask = TreeBase & {
  form: `tree-${Form.Task}`
  link: {
    base?: TreeTask
    call: TreeList<TreeCall>
    head: TreeList<TreeFormHead>
    hide?: TreeWave
    like?: TreeLike
    name?: TreeLine
    risk?: TreeWave
    take: TreeList<TreeTake>
    task: TreeList<TreeTask>
    wait?: TreeWave
  }
}

export type TreeTest = TreeBase & {
  form: `tree-${Form.Test}`
  link: {}
}

export type TreeText = TreeBase & {
  form: `tree-${Form.Text}`
  link: {
    bond: string
  }
}

export type TreeTextLink = TreeBase & {
  form: `tree-${Form.TextLink}`
  link: {
    // bond: LinkTextType
  }
}

export type TreeTree = TreeBase & {
  form: `tree-${Form.Tree}`
  link: {
    hide?: TreeWave
    hook: TreeList<TreeHook>
    name?: TreeLine
    take: TreeList<TreeTake>
  }
}

export type TreeWave = TreeBase & {
  form: `tree-${Form.Wave}`
  link: {
    bond: boolean
  }
}

export type TreeWear = TreeBase & {
  form: `tree-${Form.Wear}`
  link: {}
}

// eslint-disable-next-line sort-exports/sort-exports
export const SITE_OBSERVER_STATE = [
  TreeNote.Initialized,
  TreeNote.StaticComplete,
  TreeNote.RuntimeComplete,
]

// eslint-disable-next-line sort-exports/sort-exports
export const SITE_OBSERVER_COMPLETE_STATE = [
  TreeNote.StaticComplete,
  TreeNote.RuntimeComplete,
]
