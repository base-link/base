import {
  ASTCallbackType,
  ASTClassInterfaceType,
  ASTClassPotentialType,
  ASTComponentType,
  ASTConstantType,
  ASTDependencyType,
  ASTExportType,
  ASTFunctionType,
  ASTImportPotentialType,
  ASTNativeClassInterfaceType,
  ASTPackageType,
  ASTTemplateType,
  ASTTestType,
  Base,
  PartialState,
  TreeNodeType,
} from '~'

import { AST } from './list'

export type ASTBookModulePartialType = PartialState<
  ASTBookModuleType,
  {
    like: 1
  },
  true
>

export type ASTBookModulePotentialType =
  | ASTBookModulePartialType
  | ASTBookModuleType

export type ASTBookModuleType = ASTModuleBaseType & {
  abstract: string
  like: AST.BookModule
  tags: Array<string>
  title: string
  // text: Array<ASTBookSectionType>
}

export type ASTCodeModulePartialType = PartialState<
  ASTCodeModuleType,
  {
    allSuitAST: 1
    allTaskAST: 1
    allTestAST: 1
    allTreeAST: 1
    allZoneAST: 1
    bearList: 1
    faceAST: 1
    formAST: 1
    hookAST: 1
    hostAST: 1
    like: 1
    loadList: 1
    publicFaceAST: 1
    publicFormAST: 1
    publicHostAST: 1
    publicSuitAST: 1
    publicTaskAST: 1
    publicTestAST: 1
    publicTreeAST: 1
    publicZoneAST: 1
  },
  true
>

export type ASTCodeModulePotentialType =
  | ASTCodeModulePartialType
  | ASTCodeModuleType

export type ASTCodeModuleType = ASTModuleBaseType & {
  allSuitAST: Record<string, ASTClassInterfaceType>
  allTaskAST: Record<string, ASTFunctionType>
  allTestAST: Record<string, ASTTestType>
  allTreeAST: Record<string, ASTTemplateType>
  allZoneAST: Record<string, ASTComponentType>
  bearList: Array<ASTExportType>
  faceAST: Record<string, ASTNativeClassInterfaceType>
  formAST: Record<string, ASTClassPotentialType>
  hookAST: Record<string, ASTCallbackType>
  hostAST: Record<string, ASTConstantType>
  like: AST.CodeModule
  loadList: Array<ASTImportPotentialType>
  publicFaceAST: Record<string, ASTNativeClassInterfaceType>
  publicFormAST: Record<string, ASTClassPotentialType>
  publicHostAST: Record<string, ASTConstantType>
  publicSuitAST: Record<string, ASTClassInterfaceType>
  publicTaskAST: Record<string, ASTFunctionType>
  publicTestAST: Record<string, ASTTestType>
  publicTreeAST: Record<string, ASTTemplateType>
  publicZoneAST: Record<string, ASTComponentType>
}

export type ASTModuleBaseType = {
  base: Base
  dependencyList: Array<ASTDependencyType>
  directory: string
  parseTree: TreeNodeType
  path: string
  textByLine: Array<string>
}

export type ASTModuleType =
  | ASTCodeModuleType
  | ASTPackageModuleType

export type ASTPackageModulePartialType = ASTModuleBaseType &
  PartialState<
    ASTPackageModuleType,
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

export type ASTPackageModulePotentialType =
  | ASTPackageModulePartialType
  | ASTPackageModuleType

export type ASTPackageModuleType = ASTModuleBaseType & {
  deck: ASTPackageType
  like: AST.PackageModule
}

export const CARD_TYPE = [
  AST.CodeModule,
  AST.BookModule,
  AST.PackageModule,
] as const
