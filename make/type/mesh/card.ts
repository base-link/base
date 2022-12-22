import {
  Base,
  InternalDependencyWatcherType,
  Mesh,
  MeshBearType,
  MeshDeckType,
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
  TreeNestType,
} from '~'

export type MeshBookCardType = MeshCardBaseType & {
  abstract: string
  like: Mesh.BookCard
  tags: Array<string>
  title: string
  // text: Array<MeshBookSectionType>
}

export type MeshCardBaseType = {
  base: Base
  dependencyWatcherMap: Map<
    string,
    InternalDependencyWatcherType
  >
  directory: string
  parseTree: TreeNestType
  path: string
  textByLine: Array<string>
}

export type MeshCodeCardType = MeshCardBaseType & {
  allSuitMesh: Record<string, MeshSuitType>
  allTaskMesh: Record<string, MeshTaskType>
  allTestMesh: Record<string, MeshTestType>
  allTreeMesh: Record<string, MeshTreeType>
  allZoneMesh: Record<string, MeshZoneType>
  bearList: Array<MeshBearType>
  faceMesh: Record<string, MeshFaceType>
  formMesh: Record<string, MeshFormType>
  hookMesh: Record<string, MeshHookType>
  hostMesh: Record<string, MeshHostType>
  like: Mesh.CodeCard
  loadList: Array<MeshLoadType>
  parseTree: TreeNestType
  publicFaceMesh: Record<string, MeshFaceType>
  publicFormMesh: Record<string, MeshFormType>
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
