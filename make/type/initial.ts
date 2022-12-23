import {
  MeshCodeCardType,
  MeshDeckCardType,
  MeshFormType,
  PickPartial,
} from '~'

export type InitialMeshCodeCardType = MeshCodeCardType

export type InitialMeshDeckCardType = PickPartial<
  MeshDeckCardType,
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

export type InitialMeshFormType = PickPartial<
  MeshFormType,
  {
    base: 1
    hook: 1
    like: 1
    link: 1
    task: 1
    wear: 1
  }
>

export type InitialMeshTaskType = PickPartial<
  MeshFormType,
  {
    base: 1
    call: 1
    like: 1
    take: 1
    task: 1
    wear: 1
  }
>
