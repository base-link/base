import {
  Base,
  InitialMeshFormType,
  MeshBearType,
  MeshDeckType,
  MeshDependencyType,
  MeshFaceType,
  MeshFormType,
  MeshHookType,
  MeshHostType,
  MeshLoadType,
  MeshSuitType,
  MeshTaskType,
  MeshTestType,
  MeshTreeType,
  MeshZoneType,
  TreeNodeType,
} from '~'

import { Mesh } from './list'

export const CARD_TYPE = [
  Mesh.CodeCard,
  Mesh.BookCard,
  Mesh.DeckCard,
] as const

export type Card = Mesh.CodeCard | Mesh.DeckCard

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

export type MeshCodeCardType = MeshCardBaseType & {
  allSuitMesh: Record<string, MeshSuitType>
  allTaskMesh: Record<string, MeshTaskType>
  allTestMesh: Record<string, MeshTestType>
  allTreeMesh: Record<string, MeshTreeType>
  allZoneMesh: Record<string, MeshZoneType>
  bearList: Array<MeshBearType>
  faceMesh: Record<string, MeshFaceType>
  formMesh: Record<string, MeshFormType | InitialMeshFormType>
  hookMesh: Record<string, MeshHookType>
  hostMesh: Record<string, MeshHostType>
  like: Mesh.CodeCard
  loadList: Array<MeshLoadType>
  publicFaceMesh: Record<string, MeshFaceType>
  publicFormMesh: Record<
    string,
    MeshFormType | InitialMeshFormType
  >
  publicHostMesh: Record<string, MeshHostType>
  publicSuitMesh: Record<string, MeshSuitType>
  publicTaskMesh: Record<string, MeshTaskType>
  publicTestMesh: Record<string, MeshTestType>
  publicTreeMesh: Record<string, MeshTreeType>
  publicZoneMesh: Record<string, MeshZoneType>
}

export type MeshDeckCardType = MeshCardBaseType & {
  deck: MeshDeckType
  like: Mesh.DeckCard
}
