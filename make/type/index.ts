import type {
  MeshAssertion_FullType,
  MeshAssertion_PartialType,
  MeshAssertion_Type,
  MeshBind_FullType,
  MeshBind_PartialType,
  MeshBind_Type,
  MeshBookModule_FullType,
  MeshBookModule_PartialType,
  MeshBookModule_Type,
  MeshBoolean_FullType,
  MeshBoolean_PartialType,
  MeshBoolean_Type,
  MeshBorrowVariable_FullType,
  MeshBorrowVariable_PartialType,
  MeshBorrowVariable_Type,
  MeshCall_FullType,
  MeshCall_PartialType,
  MeshCall_Type,
  MeshCallback_FullType,
  MeshCallback_PartialType,
  MeshCallback_Type,
  MeshClassInterfaceFunction_FullType,
  MeshClassInterfaceFunction_PartialType,
  MeshClassInterfaceFunction_Type,
  MeshClassInterfaceImplementation_FullType,
  MeshClassInterfaceImplementation_PartialType,
  MeshClassInterfaceImplementation_Type,
  MeshClassInterface_FullType,
  MeshClassInterface_PartialType,
  MeshClassInterface_Type,
  MeshClassReference_FullType,
  MeshClassReference_PartialType,
  MeshClassReference_Type,
  MeshClass_FullType,
  MeshClass_PartialType,
  MeshClass_Type,
  MeshCloneVariable_FullType,
  MeshCloneVariable_PartialType,
  MeshCloneVariable_Type,
  MeshCodeModule_FullType,
  MeshCodeModule_PartialType,
  MeshCodeModule_Type,
  MeshComponent_FullType,
  MeshComponent_PartialType,
  MeshComponent_Type,
  MeshConstant_FullType,
  MeshConstant_PartialType,
  MeshConstant_Type,
  MeshElement_FullType,
  MeshElement_PartialType,
  MeshElement_Type,
  MeshExport_FullType,
  MeshExport_PartialType,
  MeshExport_Type,
  MeshFunction_FullType,
  MeshFunction_PartialType,
  MeshFunction_Type,
  MeshImportVariableRename_FullType,
  MeshImportVariableRename_PartialType,
  MeshImportVariableRename_Type,
  MeshImportVariable_FullType,
  MeshImportVariable_PartialType,
  MeshImportVariable_Type,
  MeshImport_FullType,
  MeshImport_PartialType,
  MeshImport_Type,
  MeshInject_FullType,
  MeshInject_PartialType,
  MeshInject_Type,
  MeshInput_FullType,
  MeshInput_PartialType,
  MeshInput_Type,
  MeshModuleBaseType,
  MeshMoveVariable_FullType,
  MeshMoveVariable_PartialType,
  MeshMoveVariable_Type,
  MeshNativeClassInterface_FullType,
  MeshNativeClassInterface_PartialType,
  MeshNativeClassInterface_Type,
  MeshOutput_FullType,
  MeshOutput_PartialType,
  MeshOutput_Type,
  MeshPackageLicense_FullType,
  MeshPackageLicense_PartialType,
  MeshPackageLicense_Type,
  MeshPackageModule_FullType,
  MeshPackageModule_PartialType,
  MeshPackageModule_Type,
  MeshPackageUser_FullType,
  MeshPackageUser_PartialType,
  MeshPackageUser_Type,
  MeshPackage_FullType,
  MeshPackage_PartialType,
  MeshPackage_Type,
  MeshString_FullType,
  MeshString_PartialType,
  MeshString_Type,
  MeshTemplate_FullType,
  MeshTemplate_PartialType,
  MeshTemplate_Type,
  MeshTerm_FullType,
  MeshTerm_PartialType,
  MeshTerm_Type,
  MeshTest_FullType,
  MeshTest_PartialType,
  MeshTest_Type,
  MeshUnsignedInteger_FullType,
  MeshUnsignedInteger_PartialType,
  MeshUnsignedInteger_Type,
  SiteScopeType,
} from '~'

export * from './book.js'
export * from './card.js'
export * from './code.js'
export * from './deck.js'
export * from './site.js'

export enum Mesh {
  Assertion = 'mesh-assertion',
  Bind = 'mesh-bind',
  BookModule = 'mesh-book-module',
  Boolean = 'mesh-boolean',
  BorrowVariable = 'mesh-borrow-variable',
  Call = 'mesh-call',
  Callback = 'mesh-callback',
  Class = 'mesh-class',
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
export const CARD_TYPE = [
  Mesh.CodeModule,
  Mesh.BookModule,
  Mesh.PackageModule,
] as const

export type MeshFullType<T extends Mesh> =
  MeshMappingFullType[T]

export type MeshInputType = {
  card: MeshModuleBaseType
  lexicalScope: SiteScopeType
  nestScope?: SiteScopeType
  objectScope: SiteScopeType
}

export type MeshMappingFullType = {
  'mesh-assertion': MeshAssertion_FullType
  'mesh-bind': MeshBind_FullType
  'mesh-book-module': MeshBookModule_FullType
  'mesh-boolean': MeshBoolean_FullType
  'mesh-borrow-variable': MeshBorrowVariable_FullType
  'mesh-call': MeshCall_FullType
  'mesh-callback': MeshCallback_FullType
  'mesh-class': MeshClass_FullType
  'mesh-class-interface': MeshClassInterface_FullType
  'mesh-class-interface-function': MeshClassInterfaceFunction_FullType
  'mesh-class-interface-implementation': MeshClassInterfaceImplementation_FullType
  'mesh-class-reference': MeshClassReference_FullType
  'mesh-clone-variable': MeshCloneVariable_FullType
  'mesh-code-module': MeshCodeModule_FullType
  'mesh-component': MeshComponent_FullType
  'mesh-constant': MeshConstant_FullType
  'mesh-element': MeshElement_FullType
  'mesh-export': MeshExport_FullType
  'mesh-function': MeshFunction_FullType
  'mesh-import': MeshImport_FullType
  'mesh-import-variable': MeshImportVariable_FullType
  'mesh-import-variable-rename': MeshImportVariableRename_FullType
  'mesh-inject': MeshInject_FullType
  'mesh-input': MeshInput_FullType
  'mesh-move-variable': MeshMoveVariable_FullType
  'mesh-native-class-interface': MeshNativeClassInterface_FullType
  'mesh-output': MeshOutput_FullType
  'mesh-package': MeshPackage_FullType
  'mesh-package-license': MeshPackageLicense_FullType
  'mesh-package-module': MeshPackageModule_FullType
  'mesh-package-user': MeshPackageUser_FullType
  'mesh-string': MeshString_FullType
  'mesh-template': MeshTemplate_FullType
  'mesh-term': MeshTerm_FullType
  'mesh-test': MeshTest_FullType
  'mesh-unsigned-integer': MeshUnsignedInteger_FullType
}

export type MeshMappingPartialType = {
  'mesh-assertion': MeshAssertion_PartialType
  'mesh-bind': MeshBind_PartialType
  'mesh-book-module': MeshBookModule_PartialType
  'mesh-boolean': MeshBoolean_PartialType
  'mesh-borrow-variable': MeshBorrowVariable_PartialType
  'mesh-call': MeshCall_PartialType
  'mesh-callback': MeshCallback_PartialType
  'mesh-class': MeshClass_PartialType
  'mesh-class-interface': MeshClassInterface_PartialType
  'mesh-class-interface-function': MeshClassInterfaceFunction_PartialType
  'mesh-class-interface-implementation': MeshClassInterfaceImplementation_PartialType
  'mesh-class-reference': MeshClassReference_PartialType
  'mesh-clone-variable': MeshCloneVariable_PartialType
  'mesh-code-module': MeshCodeModule_PartialType
  'mesh-component': MeshComponent_PartialType
  'mesh-constant': MeshConstant_PartialType
  'mesh-element': MeshElement_PartialType
  'mesh-export': MeshExport_PartialType
  'mesh-function': MeshFunction_PartialType
  'mesh-import': MeshImport_PartialType
  'mesh-import-variable': MeshImportVariable_PartialType
  'mesh-import-variable-rename': MeshImportVariableRename_PartialType
  'mesh-inject': MeshInject_PartialType
  'mesh-input': MeshInput_PartialType
  'mesh-move-variable': MeshMoveVariable_PartialType
  'mesh-native-class-interface': MeshNativeClassInterface_PartialType
  'mesh-output': MeshOutput_PartialType
  'mesh-package': MeshPackage_PartialType
  'mesh-package-license': MeshPackageLicense_PartialType
  'mesh-package-module': MeshPackageModule_PartialType
  'mesh-package-user': MeshPackageUser_PartialType
  'mesh-partial': MeshOutput_PartialType
  'mesh-scope': SiteScopeType
  'mesh-string': MeshString_PartialType
  'mesh-template': MeshTemplate_PartialType
  'mesh-term': MeshTerm_PartialType
  'mesh-test': MeshTest_PartialType
  'mesh-unsigned-integer': MeshUnsignedInteger_PartialType
}

export type MeshMappingType = {
  'mesh-assertion': MeshAssertion_Type
  'mesh-bind': MeshBind_Type
  'mesh-book-module': MeshBookModule_Type
  'mesh-boolean': MeshBoolean_Type
  'mesh-borrow-variable': MeshBorrowVariable_Type
  'mesh-call': MeshCall_Type
  'mesh-callback': MeshCallback_Type
  'mesh-class': MeshClass_Type
  'mesh-class-interface': MeshClassInterface_Type
  'mesh-class-interface-function': MeshClassInterfaceFunction_Type
  'mesh-class-interface-implementation': MeshClassInterfaceImplementation_Type
  'mesh-class-reference': MeshClassReference_Type
  'mesh-clone-variable': MeshCloneVariable_Type
  'mesh-code-module': MeshCodeModule_Type
  'mesh-component': MeshComponent_Type
  'mesh-constant': MeshConstant_Type
  'mesh-element': MeshElement_Type
  'mesh-export': MeshExport_Type
  'mesh-function': MeshFunction_Type
  'mesh-import': MeshImport_Type
  'mesh-import-variable': MeshImportVariable_Type
  'mesh-import-variable-rename': MeshImportVariableRename_Type
  'mesh-inject': MeshInject_Type
  'mesh-input': MeshInput_Type
  'mesh-move-variable': MeshMoveVariable_Type
  'mesh-native-class-interface': MeshNativeClassInterface_Type
  'mesh-output': MeshOutput_Type
  'mesh-package': MeshPackage_Type
  'mesh-package-license': MeshPackageLicense_Type
  'mesh-package-module': MeshPackageModule_Type
  'mesh-package-user': MeshPackageUser_Type
  'mesh-string': MeshString_Type
  'mesh-template': MeshTemplate_Type
  'mesh-term': MeshTerm_Type
  'mesh-test': MeshTest_Type
  'mesh-unsigned-integer': MeshUnsignedInteger_Type
}

export type MeshPartialType<T extends Mesh> =
  MeshMappingPartialType[T]

export type MeshType<T extends Mesh> = MeshMappingType[T]
