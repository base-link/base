import {
  AST,
  ASTAssertionPartialType,
  ASTAssertionPotentialType,
  ASTBindPartialType,
  ASTBindPotentialType,
  ASTBindableObjectType,
  ASTBindableStringType,
  ASTBookModulePartialType,
  ASTBookModulePotentialType,
  ASTBorrowVariablePartialType,
  ASTBorrowVariablePotentialType,
  ASTCallPartialType,
  ASTCallPotentialType,
  ASTCallbackPartialType,
  ASTCallbackPotentialType,
  ASTClassInterfaceFunctionPartialType,
  ASTClassInterfaceFunctionPotentialType,
  ASTClassInterfaceImplementationPartialType,
  ASTClassInterfaceImplementationPotentialType,
  ASTClassInterfacePartialType,
  ASTClassInterfacePotentialType,
  ASTClassPartialType,
  ASTClassPotentialType,
  ASTClassReferencePartialType,
  ASTClassReferencePotentialType,
  ASTCloneVariablePartialType,
  ASTCloneVariablePotentialType,
  ASTCodeModulePartialType,
  ASTCodeModulePotentialType,
  ASTComponentPartialType,
  ASTComponentPotentialType,
  ASTConstantPartialType,
  ASTConstantPotentialType,
  ASTDependencyPartType,
  ASTDependencyType,
  ASTElementPartialType,
  ASTElementPotentialType,
  ASTExportPartialType,
  ASTExportPotentialType,
  ASTFunctionPartialType,
  ASTFunctionPotentialType,
  ASTImportPartialType,
  ASTImportPotentialType,
  ASTImportVariablePartialType,
  ASTImportVariablePotentialType,
  ASTImportVariableRenamePartialType,
  ASTImportVariableRenamePotentialType,
  ASTInjectPartialType,
  ASTInjectPotentialType,
  ASTInputPartialType,
  ASTInputPotentialType,
  ASTLexicalScopeType,
  ASTMoveVariablePartialType,
  ASTMoveVariablePotentialType,
  ASTNativeClassInterfacePartialType,
  ASTNativeClassInterfacePotentialType,
  ASTPackageLicensePartialType,
  ASTPackageLicensePotentialType,
  ASTPackageModulePartialType,
  ASTPackageModulePotentialType,
  ASTPackagePartialType,
  ASTPackagePotentialType,
  ASTPackageUserPartialType,
  ASTPackageUserPotentialType,
  ASTScopeType,
  ASTStringPartialType,
  ASTStringPotentialType,
  ASTTemplatePartialType,
  ASTTemplatePotentialType,
  ASTTermPartialType,
  ASTTermPotentialType,
  ASTTestPartialType,
  ASTTestPotentialType,
  ASTUnsignedIntegerPartialType,
  ASTUnsignedIntegerPotentialType,
} from '~'

export * from './book'
export * from './card'
export * from './code'
export * from './deck'
export * from './dependency'
export * from './list'

export type ASTNodeMappingPartialType = {
  'ast-assertion': ASTAssertionPartialType
  'ast-bind': ASTBindPartialType
  'ast-bindable-object': ASTBindableObjectType
  'ast-bindable-string': ASTBindableStringType
  'ast-book-module': ASTBookModulePartialType
  'ast-borrow-variable': ASTBorrowVariablePartialType
  'ast-call': ASTCallPartialType
  'ast-callback': ASTCallbackPartialType
  'ast-class': ASTClassPartialType
  'ast-class-interface': ASTClassInterfacePartialType
  'ast-class-interface-function': ASTClassInterfaceFunctionPartialType
  'ast-class-interface-implementation': ASTClassInterfaceImplementationPartialType
  'ast-class-reference': ASTClassReferencePartialType
  'ast-clone-variable': ASTCloneVariablePartialType
  'ast-code-module': ASTCodeModulePartialType
  'ast-component': ASTComponentPartialType
  'ast-constant': ASTConstantPartialType
  'ast-dependency': ASTDependencyType
  'ast-dependency-part': ASTDependencyPartType
  'ast-element': ASTElementPartialType
  'ast-export': ASTExportPartialType
  'ast-function': ASTFunctionPartialType
  'ast-import': ASTImportPartialType
  'ast-import-variable': ASTImportVariablePartialType
  'ast-import-variable-rename': ASTImportVariableRenamePartialType
  'ast-inject': ASTInjectPartialType
  'ast-input': ASTInputPartialType
  'ast-lexical-scope': ASTLexicalScopeType
  'ast-move-variable': ASTMoveVariablePartialType
  'ast-native-class-interface': ASTNativeClassInterfacePartialType
  'ast-package': ASTPackagePartialType
  'ast-package-license': ASTPackageLicensePartialType
  'ast-package-module': ASTPackageModulePartialType
  'ast-package-user': ASTPackageUserPartialType
  'ast-scope': ASTScopeType
  'ast-string': ASTStringPartialType
  'ast-template': ASTTemplatePartialType
  'ast-term': ASTTermPartialType
  'ast-test': ASTTestPartialType
  'ast-unsigned-integer': ASTUnsignedIntegerPartialType
}

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

export type ASTPartialType<T extends AST> =
  ASTNodeMappingPartialType[T]

export type ASTType<T extends AST> = ASTNodeMappingType[T]
