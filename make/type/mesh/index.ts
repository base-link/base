import {
  AST,
  ASTAssertionPotentialType,
  ASTBindPotentialType,
  ASTBindableObjectType,
  ASTBindableStringType,
  ASTBookModulePotentialType,
  ASTBorrowVariablePotentialType,
  ASTCallPotentialType,
  ASTCallbackPotentialType,
  ASTClassInterfaceFunctionPotentialType,
  ASTClassInterfaceImplementationPotentialType,
  ASTClassInterfacePotentialType,
  ASTClassPotentialType,
  ASTClassReferencePotentialType,
  ASTCloneVariablePotentialType,
  ASTCodeModulePotentialType,
  ASTComponentPotentialType,
  ASTConstantPotentialType,
  ASTDependencyPartType,
  ASTDependencyType,
  ASTElementPotentialType,
  ASTExportPotentialType,
  ASTFunctionPotentialType,
  ASTImportPotentialType,
  ASTImportVariablePotentialType,
  ASTImportVariableRenamePotentialType,
  ASTInjectPotentialType,
  ASTInputPotentialType,
  ASTLexicalScopeType,
  ASTMoveVariablePotentialType,
  ASTNativeClassInterfacePotentialType,
  ASTPackageLicensePotentialType,
  ASTPackageModulePotentialType,
  ASTPackagePotentialType,
  ASTPackageUserPotentialType,
  ASTScopeType,
  ASTStringPotentialType,
  ASTTemplatePotentialType,
  ASTTermPotentialType,
  ASTTestPotentialType,
  ASTUnsignedIntegerPotentialType,
} from '~'

export * from './book'
export * from './card'
export * from './code'
export * from './deck'
export * from './dependency'
export * from './list'

export type ASTNodeMappingType = {
  'ast-assertion': ASTAssertionPotentialType
  'ast-bind': ASTBindPotentialType
  'ast-bindable-object': ASTBindableObjectType
  'ast-bindable-string': ASTBindableStringType
  'ast-book-module': ASTBookModulePotentialType
  'ast-borrow-variable': ASTBorrowVariablePotentialType
  'ast-call': ASTCallPotentialType
  'ast-callback': ASTCallbackPotentialType
  'ast-class': ASTClassPotentialType
  'ast-class-interface': ASTClassInterfacePotentialType
  'ast-class-interface-function': ASTClassInterfaceFunctionPotentialType
  'ast-class-interface-implementation': ASTClassInterfaceImplementationPotentialType
  'ast-class-reference': ASTClassReferencePotentialType
  'ast-clone-variable': ASTCloneVariablePotentialType
  'ast-code-module': ASTCodeModulePotentialType
  'ast-component': ASTComponentPotentialType
  'ast-constant': ASTConstantPotentialType
  'ast-dependency': ASTDependencyType
  'ast-dependency-part': ASTDependencyPartType
  'ast-element': ASTElementPotentialType
  'ast-export': ASTExportPotentialType
  'ast-function': ASTFunctionPotentialType
  'ast-import': ASTImportPotentialType
  'ast-import-variable': ASTImportVariablePotentialType
  'ast-import-variable-rename': ASTImportVariableRenamePotentialType
  'ast-inject': ASTInjectPotentialType
  'ast-input': ASTInputPotentialType
  'ast-lexical-scope': ASTLexicalScopeType
  'ast-move-variable': ASTMoveVariablePotentialType
  'ast-native-class-interface': ASTNativeClassInterfacePotentialType
  'ast-package': ASTPackagePotentialType
  'ast-package-license': ASTPackageLicensePotentialType
  'ast-package-module': ASTPackageModulePotentialType
  'ast-package-user': ASTPackageUserPotentialType
  'ast-scope': ASTScopeType
  'ast-string': ASTStringPotentialType
  'ast-template': ASTTemplatePotentialType
  'ast-term': ASTTermPotentialType
  'ast-test': ASTTestPotentialType
  'ast-unsigned-integer': ASTUnsignedIntegerPotentialType
}

export type ASTType<T extends AST> = ASTNodeMappingType[T]
