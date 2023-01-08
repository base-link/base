import { Mesh, MeshType } from './mesh'
import { SiteModuleBaseType, SiteStepScopeType } from './site'

export enum Nest {
  Assertion = 'nest-assertion',
  Bind = 'nest-bind',
  BookModule = 'nest-book-module',
  Boolean = 'nest-boolean',
  BorrowVariable = 'nest-borrow-variable',
  Call = 'nest-call',
  Callback = 'nest-callback',
  Class = 'nest-class',
  ClassInput = 'nest-class-input',
  ClassInterface = 'nest-class-interface',
  ClassInterfaceFunction = 'nest-class-interface-function',
  ClassInterfaceImplementation = 'nest-class-interface-implementation',
  ClassReference = 'nest-class-reference',
  CloneVariable = 'nest-clone-variable',
  CodeModule = 'nest-code-module',
  Component = 'nest-component',
  Constant = 'nest-constant',
  Element = 'nest-element',
  Export = 'nest-export',
  Function = 'nest-function',
  Import = 'nest-import',
  ImportVariable = 'nest-import-variable',
  ImportVariableRename = 'nest-import-variable-rename',
  Inject = 'nest-inject',
  Input = 'nest-input',
  MoveVariable = 'nest-move-variable',
  NativeClassInterface = 'nest-native-class-interface',
  Output = 'nest-output',
  Package = 'nest-package',
  PackageLicense = 'nest-package-license',
  PackageModule = 'nest-package-module',
  PackageUser = 'nest-package-user',
  String = 'nest-string',
  Template = 'nest-template',
  Term = 'nest-term',
  Test = 'nest-test',
  UnsignedInteger = 'nest-unsigned-integer',
}

// eslint-disable-next-line sort-exports/sort-exports
export const NEST_TYPE = [
  Nest.Assertion,
  Nest.Bind,
  Nest.BookModule,
  Nest.Boolean,
  Nest.BorrowVariable,
  Nest.Call,
  Nest.Callback,
  Nest.Class,
  Nest.ClassInput,
  Nest.ClassInterface,
  Nest.ClassInterfaceFunction,
  Nest.ClassInterfaceImplementation,
  Nest.ClassReference,
  Nest.CloneVariable,
  Nest.CodeModule,
  Nest.Component,
  Nest.Constant,
  Nest.Element,
  Nest.Export,
  Nest.Function,
  Nest.Import,
  Nest.ImportVariable,
  Nest.ImportVariableRename,
  Nest.Inject,
  Nest.Input,
  Nest.MoveVariable,
  Nest.NativeClassInterface,
  Nest.Output,
  Nest.Package,
  Nest.PackageLicense,
  Nest.PackageModule,
  Nest.PackageUser,
  Nest.String,
  Nest.Template,
  Nest.Term,
  Nest.Test,
  // Nest.UnsignedInteger,
]

export type NestAssertionType = NestBaseType & {
  like: Nest.Assertion
}

export type NestBaseType = {
  children: Array<NestType<Nest> | MeshType<Mesh>>
  scope: SiteStepScopeType
}

export type NestBindType = NestBaseType & {
  like: Nest.Bind
}

export type NestBookModuleType = SiteModuleBaseType &
  NestBaseType & {
    like: Nest.BookModule
  }

export type NestBooleanType = NestBaseType & {
  like: Nest.Boolean
}

export type NestBorrowVariableType = NestBaseType & {
  like: Nest.BorrowVariable
}

export type NestCallType = NestBaseType & {
  like: Nest.Call
}

export type NestCallbackType = NestBaseType & {
  like: Nest.Callback
}

export type NestClassInputType = NestBaseType & {
  like: Nest.ClassInput
}

export type NestClassInterfaceFunctionType = NestBaseType & {
  like: Nest.ClassInterfaceFunction
}

export type NestClassInterfaceImplementationType = NestBaseType & {
  like: Nest.ClassInterfaceImplementation
}

export type NestClassInterfaceType = NestBaseType & {
  like: Nest.ClassInterface
}

export type NestClassReferenceType = NestBaseType & {
  like: Nest.ClassReference
}

export type NestClassType = NestBaseType & {
  like: Nest.Class
}

export type NestCloneVariableType = NestBaseType & {
  like: Nest.CloneVariable
}

export type NestCodeModuleType = SiteModuleBaseType &
  NestBaseType & {
    like: Nest.CodeModule
  }

export type NestComponentType = NestBaseType & {
  like: Nest.Component
}

export type NestConstantType = NestBaseType & {
  like: Nest.Constant
}

export type NestElementType = NestBaseType & {
  like: Nest.Element
}

export type NestExportType = NestBaseType & {
  like: Nest.Export
}

export type NestFunctionType = NestBaseType & {
  like: Nest.Function
}

export type NestImportType = NestBaseType & {
  like: Nest.Import
}

export type NestImportVariableRenameType = NestBaseType & {
  like: Nest.ImportVariableRename
}

export type NestImportVariableType = NestBaseType & {
  like: Nest.ImportVariable
}

export type NestInjectType = NestBaseType & {
  like: Nest.Inject
}

export type NestInputType = NestBaseType & {
  like: Nest.Input
}

export type NestMappingType = {
  'nest-assertion': NestAssertionType
  'nest-bind': NestBindType
  'nest-book-module': NestBookModuleType
  'nest-boolean': NestBooleanType
  'nest-borrow-variable': NestBorrowVariableType
  'nest-call': NestCallType
  'nest-callback': NestCallbackType
  'nest-class': NestClassType
  'nest-class-input': NestClassInputType
  'nest-class-interface': NestClassInterfaceType
  'nest-class-interface-function': NestClassInterfaceFunctionType
  'nest-class-interface-implementation': NestClassInterfaceImplementationType
  'nest-class-reference': NestClassReferenceType
  'nest-clone-variable': NestCloneVariableType
  'nest-code-module': NestCodeModuleType
  'nest-component': NestComponentType
  'nest-constant': NestConstantType
  'nest-element': NestElementType
  'nest-export': NestExportType
  'nest-function': NestFunctionType
  'nest-import': NestImportType
  'nest-import-variable': NestImportVariableType
  'nest-import-variable-rename': NestImportVariableRenameType
  'nest-inject': NestInjectType
  'nest-input': NestInputType
  'nest-move-variable': NestMoveVariableType
  'nest-native-class-interface': NestNativeClassInterfaceType
  'nest-output': NestOutputType
  'nest-package': NestPackageType
  'nest-package-license': NestPackageLicenseType
  'nest-package-module': NestPackageModuleType
  'nest-package-user': NestPackageUserType
  'nest-string': NestStringType
  'nest-template': NestTemplateType
  'nest-term': NestTermType
  'nest-test': NestTestType
  'nest-unsigned-integer': NestUnsignedIntegerType
}

export type NestMoveVariableType = NestBaseType & {
  like: Nest.MoveVariable
}

export type NestNativeClassInterfaceType = NestBaseType & {
  like: Nest.NativeClassInterface
}

export type NestNodeType =
  | NestAssertionType
  | NestBindType
  | NestBookModuleType
  | NestBooleanType
  | NestBorrowVariableType
  | NestCallType
  | NestCallbackType
  | NestClassType
  | NestClassInputType
  | NestClassInterfaceType
  | NestClassInterfaceFunctionType
  | NestClassInterfaceImplementationType
  | NestClassReferenceType
  | NestCloneVariableType
  | NestCodeModuleType
  | NestComponentType
  | NestConstantType
  | NestElementType
  | NestExportType
  | NestFunctionType
  | NestImportType
  | NestImportVariableType
  | NestImportVariableRenameType
  | NestInjectType
  | NestInputType
  | NestMoveVariableType
  | NestNativeClassInterfaceType
  | NestOutputType
  | NestPackageType
  | NestPackageLicenseType
  | NestPackageModuleType
  | NestPackageUserType
  | NestStringType
  | NestTemplateType
  | NestTermType
  | NestTestType
  | NestUnsignedIntegerType

export type NestOutputType = NestBaseType & {
  like: Nest.Output
}

export type NestPackageLicenseType = NestBaseType & {
  like: Nest.PackageLicense
}

export type NestPackageModuleType = SiteModuleBaseType &
  NestBaseType & {
    like: Nest.PackageModule
  }

export type NestPackageType = NestBaseType & {
  like: Nest.Package
}

export type NestPackageUserType = NestBaseType & {
  like: Nest.PackageUser
}

export type NestStringType = NestBaseType & {
  like: Nest.String
}

export type NestTemplateType = NestBaseType & {
  like: Nest.Template
}

export type NestTermType = NestBaseType & {
  like: Nest.Term
}

export type NestTestType = NestBaseType & {
  like: Nest.Test
}

export type NestType<T extends Nest> = NestMappingType[T]

export type NestUnsignedIntegerType = NestBaseType & {
  like: Nest.UnsignedInteger
}
