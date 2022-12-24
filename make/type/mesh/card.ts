import {
  Base,
  MeshBearType,
  MeshDeckType,
  MeshDependencyType,
  MeshFaceType,
  MeshFormPotentialType,
  MeshHookType,
  MeshHostType,
  MeshLoadPotentialType,
  MeshSuitType,
  MeshTaskType,
  MeshTestType,
  MeshTreeType,
  MeshZoneType,
  PartialState,
  TreeNodeType,
} from '~'

import { Mesh } from './list'

export const CARD_TYPE = [
  Mesh.CodeCard,
  Mesh.BookCard,
  Mesh.DeckCard,
] as const

export type MeshBookCardPartialType = PartialState<
  MeshBookCardType,
  {
    like: 1
  },
  true
>

export type MeshBookCardPotentialType =
  | MeshBookCardPartialType
  | MeshBookCardType

export type MeshBookCardType = MeshCardBaseType & {
  abstract: string
  like: Mesh.BookCard
  tags: Array<string>
  title: string
  // text: Array<MeshBookSectionType>
}

export type MeshCardBaseType = {
  base: Base
  dependencyList: Array<MeshDependencyType>
  directory: string
  parseTree: TreeNodeType
  path: string
  textByLine: Array<string>
}

export type MeshCardType = MeshCodeCardType | MeshDeckCardType

export type MeshCodeCardPartialType = PartialState<
  MeshCodeCardType,
  {
    like: 1
  },
  true
>

export type MeshCodeCardPotentialType =
  | MeshCodeCardPartialType
  | MeshCodeCardType

export type MeshCodeCardType = MeshCardBaseType & {
  allSuitMesh: Record<string, MeshSuitType>
  allTaskMesh: Record<string, MeshTaskType>
  allTestMesh: Record<string, MeshTestType>
  allTreeMesh: Record<string, MeshTreeType>
  allZoneMesh: Record<string, MeshZoneType>
  bearList: Array<MeshBearType>
  faceMesh: Record<string, MeshFaceType>
  formMesh: Record<string, MeshFormPotentialType>
  hookMesh: Record<string, MeshHookType>
  hostMesh: Record<string, MeshHostType>
  like: Mesh.CodeCard
  loadList: Array<MeshLoadPotentialType>
  publicFaceMesh: Record<string, MeshFaceType>
  publicFormMesh: Record<string, MeshFormPotentialType>
  publicHostMesh: Record<string, MeshHostType>
  publicSuitMesh: Record<string, MeshSuitType>
  publicTaskMesh: Record<string, MeshTaskType>
  publicTestMesh: Record<string, MeshTestType>
  publicTreeMesh: Record<string, MeshTreeType>
  publicZoneMesh: Record<string, MeshZoneType>
}

export type MeshDeckCardPartialType = MeshCardBaseType &
  PartialState<
    MeshDeckCardType,
    {
      deck: {
        face: 1
        like: 1
        term: 1
      }
      like: 1
    },
    true
  >

export type MeshDeckCardPotentialType =
  | MeshDeckCardPartialType
  | MeshDeckCardType

export type MeshDeckCardType = MeshCardBaseType & {
  deck: MeshDeckType
  like: Mesh.DeckCard
}
