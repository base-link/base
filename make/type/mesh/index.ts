import {
  AST,
  ASTAssertion_FullType,
  ASTAssertion_PartialType,
  ASTBind_FullType,
  ASTBind_PartialType,
  ASTBindableObjectType,
  ASTBindableStringType,
  ASTBookModule_FullType,
  ASTBookModule_PartialType,
  ASTBorrowVariable_FullType,
  ASTBorrowVariable_PartialType,
  ASTCall_FullType,
  ASTCall_PartialType,
  ASTCallback_FullType,
  ASTCallback_PartialType,
  ASTClassInterfaceFunction_FullType,
  ASTClassInterfaceFunction_PartialType,
  ASTClassInterfaceImplementation_FullType,
  ASTClassInterfaceImplementation_PartialType,
  ASTClassInterface_FullType,
  ASTClassInterface_PartialType,
  ASTClassReference_FullType,
  ASTClassReference_PartialType,
  ASTClass_FullType,
  ASTClass_PartialType,
  ASTCloneVariable_FullType,
  ASTCloneVariable_PartialType,
  ASTCodeModule_FullType,
  ASTCodeModule_PartialType,
  ASTComponent_FullType,
  ASTComponent_PartialType,
  ASTConstant_FullType,
  ASTConstant_PartialType,
  ASTDependencyPartType,
  ASTDependencyType,
  ASTElement_FullType,
  ASTElement_PartialType,
  ASTExport_FullType,
  ASTExport_PartialType,
  ASTFunction_FullType,
  ASTFunction_PartialType,
  ASTImportVariableRename_FullType,
  ASTImportVariableRename_PartialType,
  ASTImportVariable_FullType,
  ASTImportVariable_PartialType,
  ASTImport_FullType,
  ASTImport_PartialType,
  ASTInject_FullType,
  ASTInject_PartialType,
  ASTInput_FullType,
  ASTInput_PartialType,
  ASTLexicalScopeType,
  ASTMoveVariable_FullType,
  ASTMoveVariable_PartialType,
  ASTNativeClassInterface_FullType,
  ASTNativeClassInterface_PartialType,
  ASTPackageLicense_FullType,
  ASTPackageLicense_PartialType,
  ASTPackageModule_FullType,
  ASTPackageModule_PartialType,
  ASTPackageUser_FullType,
  ASTPackageUser_PartialType,
  ASTPackage_FullType,
  ASTPackage_PartialType,
  ASTScopeType,
  ASTString_FullType,
  ASTString_PartialType,
  ASTTemplate_FullType,
  ASTTemplate_PartialType,
  ASTTerm_FullType,
  ASTTerm_PartialType,
  ASTTest_FullType,
  ASTTest_PartialType,
  ASTUnsignedInteger_FullType,
  ASTUnsignedInteger_PartialType,
} from '~'

export * from './book.js'
export * from './card.js'
export * from './code.js'
export * from './deck.js'
export * from './dependency.js'
export * from './list.js'

export type ASTNodeMappingPartialType = {
  'ast-assertion': ASTAssertion_PartialType
  'ast-bind': ASTBind_PartialType
  'ast-bindable-object': ASTBindableObjectType
  'ast-bindable-string': ASTBindableStringType
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
  'ast-dependency': ASTDependencyType
  'ast-dependency-part': ASTDependencyPartType
  'ast-element': ASTElement_PartialType
  'ast-export': ASTExport_PartialType
  'ast-function': ASTFunction_PartialType
  'ast-import': ASTImport_PartialType
  'ast-import-variable': ASTImportVariable_PartialType
  'ast-import-variable-rename': ASTImportVariableRename_PartialType
  'ast-inject': ASTInject_PartialType
  'ast-input': ASTInput_PartialType
  'ast-lexical-scope': ASTLexicalScopeType
  'ast-move-variable': ASTMoveVariable_PartialType
  'ast-native-class-interface': ASTNativeClassInterface_PartialType
  'ast-package': ASTPackage_PartialType
  'ast-package-license': ASTPackageLicense_PartialType
  'ast-package-module': ASTPackageModule_PartialType
  'ast-package-user': ASTPackageUser_PartialType
  'ast-scope': ASTScopeType
  'ast-string': ASTString_PartialType
  'ast-template': ASTTemplate_PartialType
  'ast-term': ASTTerm_PartialType
  'ast-test': ASTTest_PartialType
  'ast-unsigned-integer': ASTUnsignedInteger_PartialType
}

export type ASTNodeMappingType = {
  'ast-assertion': ASTAssertion_FullType
  'ast-bind': ASTBind_FullType
  'ast-bindable-object': ASTBindableObjectType
  'ast-bindable-string': ASTBindableStringType
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
  'ast-dependency': ASTDependencyType
  'ast-dependency-part': ASTDependencyPartType
  'ast-element': ASTElement_FullType
  'ast-export': ASTExport_FullType
  'ast-function': ASTFunction_FullType
  'ast-import': ASTImport_FullType
  'ast-import-variable': ASTImportVariable_FullType
  'ast-import-variable-rename': ASTImportVariableRename_FullType
  'ast-inject': ASTInject_FullType
  'ast-input': ASTInput_FullType
  'ast-lexical-scope': ASTLexicalScopeType
  'ast-move-variable': ASTMoveVariable_FullType
  'ast-native-class-interface': ASTNativeClassInterface_FullType
  'ast-package': ASTPackage_FullType
  'ast-package-license': ASTPackageLicense_FullType
  'ast-package-module': ASTPackageModule_FullType
  'ast-package-user': ASTPackageUser_FullType
  'ast-scope': ASTScopeType
  'ast-string': ASTString_FullType
  'ast-template': ASTTemplate_FullType
  'ast-term': ASTTerm_FullType
  'ast-test': ASTTest_FullType
  'ast-unsigned-integer': ASTUnsignedInteger_FullType
}

export type ASTPartialType<T extends AST> =
  ASTNodeMappingPartialType[T]

export type ASTType<T extends AST> = ASTNodeMappingType[T]
