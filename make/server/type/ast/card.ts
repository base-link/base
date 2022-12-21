import { ParserNodeType } from '~parse'

import {
  ASTBearType,
  ASTDeckType,
  ASTFaceType,
  ASTFormType,
  ASTHookType,
  ASTHostType,
  ASTLoadType,
  ASTSuitType,
  ASTTaskType,
  ASTTestType,
  ASTTreeType,
  ASTZoneType,
  Base,
  CompilerDependencyWatcherType,
  Scope,
} from '~server'

export type ASTBookCardType = ASTCardBaseType & {
  abstract: string
  like: 'book-card'
  tags: Array<string>
  title: string
  // text: Array<ASTBookSectionType>
}

export type ASTCardBaseType = {
  base: Base
  dependencyWatcherMap: Map<
    string,
    CompilerDependencyWatcherType
  >
  directory: string
  parseTree: ParserNodeType
  path: string
  textByLine: Array<string>
}

export type ASTCodeCardType = ASTCardBaseType & {
  allSuitMesh: Record<string, ASTSuitType>
  allTaskMesh: Record<string, ASTTaskType>
  allTestMesh: Record<string, ASTTestType>
  allTextTree: ParserNodeType
  allTreeMesh: Record<string, ASTTreeType>
  allZoneMesh: Record<string, ASTZoneType>
  bearList: Array<ASTBearType>
  faceMesh: Record<string, ASTFaceType>
  formMesh: Record<string, ASTFormType>
  hookMesh: Record<string, ASTHookType>
  hostMesh: Record<string, ASTHostType>
  like: 'code-card'
  loadList: Array<ASTLoadType>
  publicFaceMesh: Record<string, ASTFaceType>
  publicFormMesh: Record<string, ASTFormType>
  publicHostMesh: Record<string, ASTHostType>
  publicSuitMesh: Record<string, ASTSuitType>
  publicTaskMesh: Record<string, ASTTaskType>
  publicTestMesh: Record<string, ASTTestType>
  publicTreeMesh: Record<string, ASTTreeType>
  publicZoneMesh: Record<string, ASTZoneType>
}

export type ASTDeckCardType = ASTCardBaseType & {
  deck: ASTDeckType
  like: Scope.DeckCard
}
