import {
  AST,
  ASTAssertion_FullType,
  ASTAssertion_PartialType,
  ASTAssertion_Type,
  ASTBind_FullType,
  ASTBind_PartialType,
  ASTBind_Type,
  ASTBookModule_FullType,
  ASTBookModule_PartialType,
  ASTBookModule_Type,
  ASTBorrowVariable_FullType,
  ASTBorrowVariable_PartialType,
  ASTBorrowVariable_Type,
  ASTCall_FullType,
  ASTCall_PartialType,
  ASTCall_Type,
  ASTCallback_FullType,
  ASTCallback_PartialType,
  ASTCallback_Type,
  ASTClassInterfaceFunction_FullType,
  ASTClassInterfaceFunction_PartialType,
  ASTClassInterfaceFunction_Type,
  ASTClassInterfaceImplementation_FullType,
  ASTClassInterfaceImplementation_PartialType,
  ASTClassInterfaceImplementation_Type,
  ASTClassInterface_FullType,
  ASTClassInterface_PartialType,
  ASTClassInterface_Type,
  ASTClassReference_FullType,
  ASTClassReference_PartialType,
  ASTClassReference_Type,
  ASTClass_FullType,
  ASTClass_PartialType,
  ASTClass_Type,
  ASTCloneVariable_FullType,
  ASTCloneVariable_PartialType,
  ASTCloneVariable_Type,
  ASTCodeModule_FullType,
  ASTCodeModule_PartialType,
  ASTCodeModule_Type,
  ASTComponent_FullType,
  ASTComponent_PartialType,
  ASTComponent_Type,
  ASTConstant_FullType,
  ASTConstant_PartialType,
  ASTConstant_Type,
  ASTElement_FullType,
  ASTElement_PartialType,
  ASTElement_Type,
  ASTExport_FullType,
  ASTExport_PartialType,
  ASTExport_Type,
  ASTFunction_FullType,
  ASTFunction_PartialType,
  ASTFunction_Type,
  ASTImportVariableRename_FullType,
  ASTImportVariableRename_PartialType,
  ASTImportVariableRename_Type,
  ASTImportVariable_FullType,
  ASTImportVariable_PartialType,
  ASTImportVariable_Type,
  ASTImport_FullType,
  ASTImport_PartialType,
  ASTImport_Type,
  ASTInject_FullType,
  ASTInject_PartialType,
  ASTInject_Type,
  ASTInput_FullType,
  ASTInput_PartialType,
  ASTInput_Type,
  ASTMoveVariable_FullType,
  ASTMoveVariable_PartialType,
  ASTMoveVariable_Type,
  ASTNativeClassInterface_FullType,
  ASTNativeClassInterface_PartialType,
  ASTNativeClassInterface_Type,
  ASTPackageLicense_FullType,
  ASTPackageLicense_PartialType,
  ASTPackageLicense_Type,
  ASTPackageModule_FullType,
  ASTPackageModule_PartialType,
  ASTPackageModule_Type,
  ASTPackageUser_FullType,
  ASTPackageUser_PartialType,
  ASTPackageUser_Type,
  ASTPackage_FullType,
  ASTPackage_PartialType,
  ASTPackage_Type,
  ASTString_FullType,
  ASTString_PartialType,
  ASTString_Type,
  ASTTemplate_FullType,
  ASTTemplate_PartialType,
  ASTTemplate_Type,
  ASTTerm_FullType,
  ASTTerm_PartialType,
  ASTTerm_Type,
  ASTTest_FullType,
  ASTTest_PartialType,
  ASTTest_Type,
  ASTUnsignedInteger_FullType,
  ASTUnsignedInteger_PartialType,
  ASTUnsignedInteger_Type,
  InternalScopeType,
} from '~'

export * from './book.js'
export * from './card.js'
export * from './code.js'
export * from './deck.js'
export * from './internal.js'
export * from './list.js'

export type ASTFullType<T extends AST> = ASTMappingFullType[T]

export type ASTMappingFullType = {
  'ast-assertion': ASTAssertion_FullType
  'ast-bind': ASTBind_FullType
  'ast-book-module': ASTBookModule_FullType
  'ast-borrow-variable': ASTBorrowVariable_FullType
  'ast-call': ASTCall_FullType
  'ast-callback': ASTCallback_FullType
  'ast-class': ASTClass_FullType
  'ast-class-interface': ASTClassInterface_FullType
  'ast-class-interface-function': ASTClassInterfaceFunction_FullType
  'ast-class-interface-implementation': ASTClassInterfaceImplementation_FullType
  'ast-class-reference': ASTClassReference_FullType
  'ast-clone-variable': ASTCloneVariable_FullType
  'ast-code-module': ASTCodeModule_FullType
  'ast-component': ASTComponent_FullType
  'ast-constant': ASTConstant_FullType
  'ast-element': ASTElement_FullType
  'ast-export': ASTExport_FullType
  'ast-function': ASTFunction_FullType
  'ast-import': ASTImport_FullType
  'ast-import-variable': ASTImportVariable_FullType
  'ast-import-variable-rename': ASTImportVariableRename_FullType
  'ast-inject': ASTInject_FullType
  'ast-input': ASTInput_FullType
  'ast-move-variable': ASTMoveVariable_FullType
  'ast-native-class-interface': ASTNativeClassInterface_FullType
  'ast-package': ASTPackage_FullType
  'ast-package-license': ASTPackageLicense_FullType
  'ast-package-module': ASTPackageModule_FullType
  'ast-package-user': ASTPackageUser_FullType
  'ast-string': ASTString_FullType
  'ast-template': ASTTemplate_FullType
  'ast-term': ASTTerm_FullType
  'ast-test': ASTTest_FullType
  'ast-unsigned-integer': ASTUnsignedInteger_FullType
}

export type ASTMappingPartialType = {
  'ast-assertion': ASTAssertion_PartialType
  'ast-bind': ASTBind_PartialType
  'ast-book-module': ASTBookModule_PartialType
  'ast-borrow-variable': ASTBorrowVariable_PartialType
  'ast-call': ASTCall_PartialType
  'ast-callback': ASTCallback_PartialType
  'ast-class': ASTClass_PartialType
  'ast-class-interface': ASTClassInterface_PartialType
  'ast-class-interface-function': ASTClassInterfaceFunction_PartialType
  'ast-class-interface-implementation': ASTClassInterfaceImplementation_PartialType
  'ast-class-reference': ASTClassReference_PartialType
  'ast-clone-variable': ASTCloneVariable_PartialType
  'ast-code-module': ASTCodeModule_PartialType
  'ast-component': ASTComponent_PartialType
  'ast-constant': ASTConstant_PartialType
  'ast-element': ASTElement_PartialType
  'ast-export': ASTExport_PartialType
  'ast-function': ASTFunction_PartialType
  'ast-import': ASTImport_PartialType
  'ast-import-variable': ASTImportVariable_PartialType
  'ast-import-variable-rename': ASTImportVariableRename_PartialType
  'ast-inject': ASTInject_PartialType
  'ast-input': ASTInput_PartialType
  'ast-move-variable': ASTMoveVariable_PartialType
  'ast-native-class-interface': ASTNativeClassInterface_PartialType
  'ast-package': ASTPackage_PartialType
  'ast-package-license': ASTPackageLicense_PartialType
  'ast-package-module': ASTPackageModule_PartialType
  'ast-package-user': ASTPackageUser_PartialType
  'ast-scope': InternalScopeType
  'ast-string': ASTString_PartialType
  'ast-template': ASTTemplate_PartialType
  'ast-term': ASTTerm_PartialType
  'ast-test': ASTTest_PartialType
  'ast-unsigned-integer': ASTUnsignedInteger_PartialType
}

export type ASTMappingType = {
  'ast-assertion': ASTAssertion_Type
  'ast-bind': ASTBind_Type
  'ast-book-module': ASTBookModule_Type
  'ast-borrow-variable': ASTBorrowVariable_Type
  'ast-call': ASTCall_Type
  'ast-callback': ASTCallback_Type
  'ast-class': ASTClass_Type
  'ast-class-interface': ASTClassInterface_Type
  'ast-class-interface-function': ASTClassInterfaceFunction_Type
  'ast-class-interface-implementation': ASTClassInterfaceImplementation_Type
  'ast-class-reference': ASTClassReference_Type
  'ast-clone-variable': ASTCloneVariable_Type
  'ast-code-module': ASTCodeModule_Type
  'ast-component': ASTComponent_Type
  'ast-constant': ASTConstant_Type
  'ast-element': ASTElement_Type
  'ast-export': ASTExport_Type
  'ast-function': ASTFunction_Type
  'ast-import': ASTImport_Type
  'ast-import-variable': ASTImportVariable_Type
  'ast-import-variable-rename': ASTImportVariableRename_Type
  'ast-inject': ASTInject_Type
  'ast-input': ASTInput_Type
  'ast-move-variable': ASTMoveVariable_Type
  'ast-native-class-interface': ASTNativeClassInterface_Type
  'ast-package': ASTPackage_Type
  'ast-package-license': ASTPackageLicense_Type
  'ast-package-module': ASTPackageModule_Type
  'ast-package-user': ASTPackageUser_Type
  'ast-string': ASTString_Type
  'ast-template': ASTTemplate_Type
  'ast-term': ASTTerm_Type
  'ast-test': ASTTest_Type
  'ast-unsigned-integer': ASTUnsignedInteger_Type
}

export type ASTPartialType<T extends AST> =
  ASTMappingPartialType[T]

export type ASTType<T extends AST> = ASTMappingType[T]
