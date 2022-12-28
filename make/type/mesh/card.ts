import {
  ASTExport_Type,
  ASTImport_FullType,
  ASTImport_Type,
  Base,
} from '~'
import type {
  ASTCallback_FullType,
  ASTCallback_Type,
  ASTClassInterface_FullType,
  ASTClassInterface_Type,
  ASTClass_FullType,
  ASTClass_Type,
  ASTComponent_FullType,
  ASTComponent_Type,
  ASTConstant_FullType,
  ASTConstant_Type,
  ASTExport_FullType,
  ASTFunction_FullType,
  ASTFunction_Type,
  ASTNativeClassInterface_FullType,
  ASTNativeClassInterface_Type,
  ASTPackage_FullType,
  ASTPackage_Type,
  ASTTemplate_FullType,
  ASTTemplate_Type,
  ASTTest_FullType,
  ASTTest_Type,
  AST_FullTypeMixin,
  AST_PartialTypeMixin,
  TreeNodeType,
} from '~'

import { AST } from './list.js'

export type ASTBookModule_FullType = AST_FullTypeMixin &
  ASTModuleBaseType & {
    abstract: string
    like: AST.BookModule
    tags: Array<string>
    title: string
    // text: Array<ASTBookSection_PartialType>
  }

export type ASTBookModule_PartialType = AST_PartialTypeMixin & {
  children: Array<unknown>
  like: AST.BookModule
}

export type ASTBookModule_Type =
  | ASTBookModule_FullType
  | ASTBookModule_PartialType

export type ASTCodeModule_FullType = AST_FullTypeMixin &
  ASTModuleBaseType & {
    allClassAST: Record<string, ASTClass_FullType>
    allClassInterfaceAST: Record<
      string,
      ASTClassInterface_FullType
    >
    allComponentAST: Record<string, ASTComponent_FullType>
    allConstantAST: Record<string, ASTConstant_FullType>
    allFunctionAST: Record<string, ASTFunction_FullType>
    allTemplateAST: Record<string, ASTTemplate_FullType>
    allTestAST: Record<string, ASTTest_FullType>
    callbackAST: Record<string, ASTCallback_FullType>
    constantAST: Record<string, ASTConstant_FullType>
    exportList: Array<ASTExport_FullType>
    importTree: Array<ASTImport_FullType>
    like: AST.CodeModule
    nativeClassInterfaceAST: Record<
      string,
      ASTNativeClassInterface_FullType
    >
    publicClassAST: Record<string, ASTClass_FullType>
    publicClassInterfaceAST: Record<
      string,
      ASTClassInterface_FullType
    >
    publicComponentAST: Record<string, ASTComponent_FullType>
    publicConstantAST: Record<string, ASTConstant_FullType>
    publicFunctionAST: Record<string, ASTFunction_FullType>
    publicNativeClassInterfaceAST: Record<
      string,
      ASTNativeClassInterface_FullType
    >
    publicTemplateAST: Record<string, ASTTemplate_FullType>
    publicTestAST: Record<string, ASTTest_FullType>
  }

export type ASTCodeModule_PartialType = ASTModuleBaseType &
  AST_PartialTypeMixin & {
    children: Array<
      | ASTClassInterface_Type
      | ASTFunction_Type
      | ASTTest_Type
      | ASTTemplate_Type
      | ASTComponent_Type
      | ASTNativeClassInterface_Type
      | ASTClass_Type
      | ASTCallback_Type
      | ASTConstant_Type
      | ASTImport_Type
      | ASTExport_Type
    >
    like: AST.CodeModule
  }

export type ASTCodeModule_Type =
  | ASTCodeModule_FullType
  | ASTCodeModule_PartialType

export type ASTModuleBaseType = {
  base: Base
  directory: string
  parseTree: TreeNodeType
  path: string
  textByLine: Array<string>
}

export type ASTModule_FullType =
  | ASTCodeModule_FullType
  | ASTPackageModule_FullType

export type ASTModule_PartialType =
  | ASTCodeModule_PartialType
  | ASTPackageModule_PartialType

export type ASTModule_Type =
  | ASTModule_FullType
  | ASTModule_PartialType

export type ASTPackageModule_FullType = ASTModuleBaseType &
  AST_FullTypeMixin & {
    deck: ASTPackage_FullType
    like: AST.PackageModule
  }

export type ASTPackageModule_PartialType = ASTModuleBaseType &
  AST_PartialTypeMixin & {
    children: Array<ASTPackage_Type>
    like: AST.PackageModule
  }

export type ASTPackageModule_Type =
  | ASTPackageModule_FullType
  | ASTPackageModule_PartialType

export const CARD_TYPE = [
  AST.CodeModule,
  AST.BookModule,
  AST.PackageModule,
] as const
