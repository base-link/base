import {
  LinkNodeType,
  LinkPathType,
  LinkTermType,
  LinkTreeType,
  SiteModuleBaseType,
  SiteStepScopeType,
} from '~'

export enum Mesh {
  Assertion = 'mesh-assertion',
  Bind = 'mesh-bind',
  BookModule = 'mesh-book-module',
  Boolean = 'mesh-boolean',
  BorrowVariable = 'mesh-borrow-variable',
  Call = 'mesh-call',
  Callback = 'mesh-callback',
  Class = 'mesh-class',
  ClassInput = 'mesh-class-input',
  ClassInterface = 'mesh-class-interface',
  ClassInterfaceFunction = 'mesh-class-interface-function',
  ClassInterfaceImplementation = 'mesh-class-interface-implementation',
  ClassReference = 'mesh-class-reference',
  CloneVariable = 'mesh-clone-variable',
  CodeModule = 'mesh-code-module',
  Component = 'mesh-component',
  Constant = 'mesh-constant',
  Element = 'mesh-element',
  Export = 'mesh-export',
  Function = 'mesh-function',
  Import = 'mesh-import',
  ImportVariable = 'mesh-import-variable',
  ImportVariableRename = 'mesh-import-variable-rename',
  Inject = 'mesh-inject',
  Input = 'mesh-input',
  MoveVariable = 'mesh-move-variable',
  NativeClassInterface = 'mesh-native-class-interface',
  Output = 'mesh-output',
  Package = 'mesh-package',
  PackageLicense = 'mesh-package-license',
  PackageModule = 'mesh-package-module',
  PackageUser = 'mesh-package-user',
  String = 'mesh-string',
  Template = 'mesh-template',
  Term = 'mesh-term',
  Test = 'mesh-test',
  UnsignedInteger = 'mesh-unsigned-integer',
}

// eslint-disable-next-line sort-exports/sort-exports
export const MESH_TYPE = [
  Mesh.Assertion,
  Mesh.Bind,
  Mesh.BookModule,
  Mesh.Boolean,
  Mesh.BorrowVariable,
  Mesh.Call,
  Mesh.Callback,
  Mesh.Class,
  Mesh.ClassInput,
  Mesh.ClassInterface,
  Mesh.ClassInterfaceFunction,
  Mesh.ClassInterfaceImplementation,
  Mesh.ClassReference,
  Mesh.CloneVariable,
  Mesh.CodeModule,
  Mesh.Component,
  Mesh.Constant,
  Mesh.Element,
  Mesh.Export,
  Mesh.Function,
  Mesh.Import,
  Mesh.ImportVariable,
  Mesh.ImportVariableRename,
  Mesh.Inject,
  Mesh.Input,
  Mesh.MoveVariable,
  Mesh.NativeClassInterface,
  Mesh.Output,
  Mesh.Package,
  Mesh.PackageLicense,
  Mesh.PackageModule,
  Mesh.PackageUser,
  Mesh.String,
  Mesh.Template,
  Mesh.Term,
  Mesh.Test,
  Mesh.UnsignedInteger,
]

export type MeshAssertionType = MeshBaseType & {
  bind: Array<MeshBindType | MeshValueType>
  like: Mesh.Assertion
  name: string
}

export type MeshBaseType = {
  complete: boolean
  scope?: SiteStepScopeType
}

export type MeshBindType = MeshBaseType & {
  bond: MeshValueType
  like: Mesh.Bind
  name: string
}

export type MeshBookModuleType = SiteModuleBaseType &
  MeshBaseType & {
    abstract: string
    like: Mesh.BookModule
    tags: Array<string>
    title: string
    // text: Array<MeshBookSection_PartialType>
  }

export type MeshBooleanType = MeshBaseType & {
  boolean: boolean
  like: Mesh.Boolean
}

export type MeshBorrowVariableType = MeshBaseType & {
  like: Mesh.BorrowVariable
  link: MeshTermType
}

export type MeshCallType = MeshBaseType & {
  bind: Record<string, MeshBindType>
  function: MeshFunctionType
  like: Mesh.Call
}

export type MeshCallbackType = MeshBaseType & {
  flow: Array<MeshFunctionFlowType>
  function: Record<string, MeshFunctionFlowType>
  like: Mesh.Callback
  name: string
  parameter: Record<string, MeshInputType>
}

export type MeshClassInputType = MeshBaseType & {
  base?: MeshClassReferenceType
  like: Mesh.ClassInput
  name: string
  sourceLike?: MeshClassReferenceType
}

export type MeshClassInterfaceFunctionType = MeshBaseType & {
  function: Record<string, MeshFunctionType>
  like: Mesh.ClassInterfaceFunction
  name: string
}

export type MeshClassInterfaceImplementationType = MeshBaseType & {
  like: Mesh.ClassInterfaceImplementation
  method: Record<string, MeshFunctionType>
  name: string
  property: Record<string, MeshInputType>
}

export type MeshClassInterfaceType = MeshBaseType & {
  hidden: boolean
  like: Mesh.ClassInterface
  method: Record<string, MeshClassInterfaceFunctionType>
  name: string
  property: Record<string, MeshInputType>
}

export type MeshClassReferenceType = MeshBaseType & {
  bind: Array<MeshClassReferenceType>
  bond?: MeshClassType
  like: Mesh.ClassReference
  name: string
}

export type MeshClassType = MeshBaseType & {
  callbacks: Record<string, MeshCallbackType>
  hidden: boolean
  interfaces: Record<string, MeshClassInterfaceImplementationType>
  like: Mesh.Class
  methods: Record<string, MeshFunctionType>
  name: string
  parents: Array<MeshClassType>
  properties: Record<string, MeshInputType>
}

export type MeshCloneVariableType = MeshBaseType & {
  like: Mesh.CloneVariable
  link: LinkTermType | LinkPathType
}

export type MeshCodeModuleType = SiteModuleBaseType &
  MeshBaseType & {
    allClassInterfaceMesh: Record<string, MeshClassInterfaceType>
    allClassMesh: Record<string, MeshClassType>
    allComponentMesh: Record<string, MeshComponentType>
    allConstantMesh: Record<string, MeshConstantType>
    allFunctionMesh: Record<string, MeshFunctionType>
    allTemplateMesh: Record<string, MeshTemplateType>
    allTestMesh: Record<string, MeshTestType>
    callbackMesh: Record<string, MeshCallbackType>
    constantMesh: Record<string, MeshConstantType>
    exportList: Array<MeshExportType>
    importTree: Array<MeshImportType>
    like: Mesh.CodeModule
    nativeClassInterfaceMesh: Record<
      string,
      MeshNativeClassInterfaceType
    >
    publicClassInterfaceMesh: Record<string, MeshClassInterfaceType>
    publicClassMesh: Record<string, MeshClassType>
    publicComponentMesh: Record<string, MeshComponentType>
    publicConstantMesh: Record<string, MeshConstantType>
    publicFunctionMesh: Record<string, MeshFunctionType>
    publicNativeClassInterfaceMesh: Record<
      string,
      MeshNativeClassInterfaceType
    >
    publicTemplateMesh: Record<string, MeshTemplateType>
    publicTestMesh: Record<string, MeshTestType>
  }

export type MeshComponentType = MeshBaseType & {
  element: Array<MeshElementType>
  like: Mesh.Component
  name: string
}

export type MeshConstantType = MeshBaseType & {
  hidden: boolean
  like: Mesh.Constant
  name: string
  value: MeshValueType | Array<MeshConstantType>
}

export type MeshElementType = MeshBaseType & {
  component: MeshComponentType
  like: Mesh.Element
}

export type MeshExportType = MeshBaseType & {
  absolutePath: string
  like: Mesh.Export
}

export type MeshFunctionFlowType =
  | MeshBorrowVariableType
  | MeshMoveVariableType
  | MeshCloneVariableType

export type MeshFunctionType = MeshBaseType & {
  flow: Array<MeshFunctionFlowType>
  function: Record<string, MeshFunctionType>
  hidden: boolean
  like: Mesh.Function
  name: string
  parameter: Record<string, MeshInputType>
}

export type MeshImportType = MeshBaseType & {
  absolutePath: string
  import: Array<MeshImportType>
  like: Mesh.Import
  variable: Array<MeshImportVariableType>
}

export type MeshImportVariableRenameType = MeshBaseType & {
  like: Mesh.ImportVariableRename
  name: string
}

export type MeshImportVariableType = MeshBaseType & {
  like: Mesh.ImportVariable
  name: string
  rename: string
  scopeName: string
}

export type MeshInjectType = MeshBaseType & {
  bind: Array<MeshBindType>
  like: Mesh.Inject
  name: string
}

export type MeshInputType = MeshBaseType & {
  like: Mesh.Input
  name: string
  sourceLike?: MeshClassReferenceType
}

export type MeshMappingType = {
  'mesh-assertion': MeshAssertionType
  'mesh-bind': MeshBindType
  'mesh-book-module': MeshBookModuleType
  'mesh-boolean': MeshBooleanType
  'mesh-borrow-variable': MeshBorrowVariableType
  'mesh-call': MeshCallType
  'mesh-callback': MeshCallbackType
  'mesh-class': MeshClassType
  'mesh-class-input': MeshClassInputType
  'mesh-class-interface': MeshClassInterfaceType
  'mesh-class-interface-function': MeshClassInterfaceFunctionType
  'mesh-class-interface-implementation': MeshClassInterfaceImplementationType
  'mesh-class-reference': MeshClassReferenceType
  'mesh-clone-variable': MeshCloneVariableType
  'mesh-code-module': MeshCodeModuleType
  'mesh-component': MeshComponentType
  'mesh-constant': MeshConstantType
  'mesh-element': MeshElementType
  'mesh-export': MeshExportType
  'mesh-function': MeshFunctionType
  'mesh-import': MeshImportType
  'mesh-import-variable': MeshImportVariableType
  'mesh-import-variable-rename': MeshImportVariableRenameType
  'mesh-inject': MeshInjectType
  'mesh-input': MeshInputType
  'mesh-move-variable': MeshMoveVariableType
  'mesh-native-class-interface': MeshNativeClassInterfaceType
  'mesh-output': MeshOutputType
  'mesh-package': MeshPackageType
  'mesh-package-license': MeshPackageLicenseType
  'mesh-package-module': MeshPackageModuleType
  'mesh-package-user': MeshPackageUserType
  'mesh-string': MeshStringType
  'mesh-template': MeshTemplateType
  'mesh-term': MeshTermType
  'mesh-test': MeshTestType
  'mesh-unsigned-integer': MeshUnsignedIntegerType
}

export type MeshModuleType =
  | (SiteModuleBaseType & MeshCodeModuleType)
  | MeshPackageModuleType

export type MeshMoveVariableType = MeshBaseType & {
  like: Mesh.MoveVariable
  nest: MeshTermType
}

export type MeshNativeClassInterfaceType = MeshBaseType & {
  like: Mesh.NativeClassInterface
}

export type MeshNodeType =
  | MeshAssertionType
  | MeshBindType
  | MeshBookModuleType
  | MeshBooleanType
  | MeshBorrowVariableType
  | MeshCallType
  | MeshCallbackType
  | MeshClassType
  | MeshClassInputType
  | MeshClassInterfaceType
  | MeshClassInterfaceFunctionType
  | MeshClassInterfaceImplementationType
  | MeshClassReferenceType
  | MeshCloneVariableType
  | MeshCodeModuleType
  | MeshComponentType
  | MeshConstantType
  | MeshElementType
  | MeshExportType
  | MeshFunctionType
  | MeshImportType
  | MeshImportVariableType
  | MeshImportVariableRenameType
  | MeshInjectType
  | MeshInputType
  | MeshMoveVariableType
  | MeshNativeClassInterfaceType
  | MeshOutputType
  | MeshPackageType
  | MeshPackageLicenseType
  | MeshPackageModuleType
  | MeshPackageUserType
  | MeshStringType
  | MeshTemplateType
  | MeshTermType
  | MeshTestType
  | MeshUnsignedIntegerType

export type MeshOutputType = MeshBaseType & {
  like: Mesh.Output
  name: string
  sourceLike?: MeshClassReferenceType
}

export type MeshPackageLicenseType = MeshBaseType & {
  like: Mesh.PackageLicense
  name: string
}

export type MeshPackageModuleType = SiteModuleBaseType &
  MeshBaseType & {
    deck: MeshPackageType
    like: Mesh.PackageModule
  }

export type MeshPackageType = MeshBaseType & {
  bear?: string
  face: Array<MeshPackageUserType>
  host: string
  like: Mesh.Package
  mark: string
  name: string
  read?: string
  site?: string
  term: Array<MeshPackageLicenseType>
  test?: string
}

export type MeshPackageUserType = MeshBaseType & {
  email?: string
  like: Mesh.PackageUser
  name?: string
}

export type MeshStringType = MeshBaseType & {
  like: Mesh.String
  string: string
}

export type MeshTemplateType = MeshBaseType & {
  hidden: boolean
  inputs: Record<string, MeshInputType>
  like: Mesh.Template
  link: Array<LinkNodeType>
  name: string
}

export type MeshTermType = MeshBaseType & {
  dive: boolean
  like: Mesh.Term
  name: string
  nest: Array<MeshTermType>
}

export type MeshTestType = MeshBaseType & {
  like: Mesh.Test
}

export type MeshTextType = MeshBaseType & {
  like: Mesh.String
  text: LinkTreeType
}

export type MeshType<T extends Mesh> = MeshMappingType[T]

export type MeshUnsignedIntegerType = MeshBaseType & {
  like: Mesh.UnsignedInteger
  value: number
}

export type MeshValueType =
  | MeshStringType
  | MeshUnsignedIntegerType
  | MeshBooleanType
