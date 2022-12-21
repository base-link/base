import {
  ASTCodeCardType,
  ASTDeckCardType,
  ASTFormType,
  PickPartial,
} from '..'

export type InitialCodeCardType = ASTCodeCardType

export type InitialDeckCardType = PickPartial<
  ASTDeckCardType,
  {
    base: 1
    deck: {
      face: 1
      like: 1
      term: 1
    }
    dependencyWatcherMap: 1
    directory: 1
    like: 1
    parseTree: 1
    path: 1
    textByLine: 1
  }
>

export type InitialFormType = PickPartial<
  ASTFormType,
  {
    base: 1
    hook: 1
    like: 1
    link: 1
    task: 1
    wear: 1
  }
>
