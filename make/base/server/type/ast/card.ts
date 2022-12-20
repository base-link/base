import { ParserNodeType } from '~parse'
import {
  Base,
  CompilerKnitType,
  CompilerListType,
  CompilerMeshType,
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
  ASTCordType,
} from '~base/server'

export type ASTCardBaseType = {
  base: Base
  'link-text-line': Array<string>
  'link-text-tree': ParserNodeType
  link: ASTCordType
  'link-host': ASTCordType
}

export type ASTDeckCardType = ASTCardBaseType & {
  like: 'deck-card'
  deck: CompilerKnitType<ASTDeckType>
}

export type ASTCodeCardType = ASTCardBaseType & {
  like: 'code-card'
  link: ASTCordType
  'link-host': ASTCordType
  'text-tree': ParserNodeType
  'load-list': CompilerListType<ASTLoadType>
  'bear-list': CompilerListType<ASTBearType>
  'tree-mesh': CompilerMeshType<Record<string, ASTTreeType>>
  'form-mesh': CompilerMeshType<Record<string, ASTFormType>>
  'suit-mesh': CompilerMeshType<Record<string, ASTSuitType>>
  'task-mesh': CompilerMeshType<Record<string, ASTTaskType>>
  'host-mesh': CompilerMeshType<Record<string, ASTHostType>>
  'face-mesh': CompilerMeshType<Record<string, ASTFaceType>>
  'zone-mesh': CompilerMeshType<Record<string, ASTZoneType>>
  'test-mesh': CompilerMeshType<Record<string, ASTTestType>>
  'load-mesh': CompilerMeshType<Record<string, ASTLoadType>>
  'show-tree-mesh': CompilerMeshType<
    Record<string, ASTTreeType>
  >
  'show-form-mesh': CompilerMeshType<
    Record<string, ASTFormType>
  >
  'show-suit-mesh': CompilerMeshType<
    Record<string, ASTSuitType>
  >
  'show-task-mesh': CompilerMeshType<
    Record<string, ASTTaskType>
  >
  'show-host-mesh': CompilerMeshType<
    Record<string, ASTHostType>
  >
  'show-face-mesh': CompilerMeshType<
    Record<string, ASTFaceType>
  >
  'show-test-mesh': CompilerMeshType<
    Record<string, ASTTestType>
  >
  'show-zone-mesh': CompilerMeshType<
    Record<string, ASTZoneType>
  >
  'hook-mesh': CompilerMeshType<Record<string, ASTHookType>>
}

export type ASTBookCardType = ASTCardBaseType & {
  like: 'book-card'
  title: ASTCordType
  tags: Array<ASTCordType>
  abstract: ASTCordType
  // text: Array<ASTBookSectionType>
}
