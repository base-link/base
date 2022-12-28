import { AST } from '~'
import type { TreeNestType } from '~'

export type ASTAssertion_FullType = AST_FullTypeMixin & {
  bind: Array<ASTBind_FullType | ASTValue_FullType>
  like: AST.Assertion
  name: string
}

export type ASTAssertion_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTTerm_Type | ASTBind_Type | ASTValue_Type>
  like: AST.Assertion
}

export type ASTAssertion_Type =
  | ASTAssertion_PartialType
  | ASTAssertion_FullType

export type ASTBind_FullType = AST_FullTypeMixin & {
  bond: ASTValue_FullType
  like: AST.Bind
  name: string
}

export type ASTBind_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTTerm_Type | ASTValue_Type>
  like: AST.Bind
}

export type ASTBind_Type =
  | ASTBind_PartialType
  | ASTBind_FullType

export type ASTBoolean_FullType = AST_FullTypeMixin & {
  boolean: boolean
  like: AST.Boolean
}

export type ASTBoolean_PartialType = AST_PartialTypeMixin & {
  children: Array<boolean>
  like: AST.Boolean
}

export type ASTBoolean_Type =
  | ASTBoolean_FullType
  | ASTBoolean_PartialType

export type ASTBorrowVariable_FullType = AST_FullTypeMixin &
  Partial<AST_MutableTypeMixin> & {
    like: AST.BorrowVariable
    link: ASTTerm_FullType
  }

export type ASTBorrowVariable_PartialType =
  AST_PartialTypeMixin &
    AST_MutableTypeMixin & {
      children: Array<ASTTerm_Type>
      like: AST.BorrowVariable
    }

// borrow
export type ASTBorrowVariable_Type =
  | ASTBorrowVariable_PartialType
  | ASTBorrowVariable_FullType

export type ASTCall_FullType = AST_FullTypeMixin & {
  bind: Record<string, ASTBind_FullType>
  function: ASTFunction_FullType
  like: AST.Call
}

export type ASTCall_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTTerm_Type | ASTValue_Type | ASTBind_Type>
  like: AST.Call
}

export type ASTCall_Type =
  | ASTCall_PartialType
  | ASTCall_FullType

export type ASTCallback_FullType = AST_FullTypeMixin & {
  flow: Array<ASTFunctionFlow_FullType>
  function: Record<string, ASTFunctionFlow_FullType>
  like: AST.Callback
  name: string
  parameter: Record<string, ASTInput_FullType>
}

export type ASTCallback_PartialType = AST_PartialTypeMixin & {
  children: Array<
    ASTFunctionFlow_Type | ASTInput_Type | ASTTerm_Type
  >
  like: AST.Callback
}

export type ASTCallback_Type =
  | ASTCallback_PartialType
  | ASTCallback_FullType

export type ASTClassInterfaceFunction_FullType =
  AST_FullTypeMixin & {
    function: Record<string, ASTFunction_FullType>
    like: AST.ClassInterfaceFunction
    name: string
  }

export type ASTClassInterfaceFunction_PartialType =
  AST_PartialTypeMixin & {
    children: Array<ASTTerm_Type | ASTFunction_Type>
    like: AST.ClassInterfaceFunction
  }

export type ASTClassInterfaceFunction_Type =
  | ASTClassInterfaceFunction_FullType
  | ASTClassInterfaceFunction_PartialType

export type ASTClassInterfaceImplementation_FullType =
  AST_FullTypeMixin & {
    like: AST.ClassInterfaceImplementation
    method: Record<string, ASTFunction_Type>
    name: string
    property: Record<string, ASTInput_Type>
  }

export type ASTClassInterfaceImplementation_PartialType =
  AST_PartialTypeMixin & {
    children: Array<ASTFunction_Type | ASTInput_Type>
    like: AST.ClassInterfaceImplementation
  }

export type ASTClassInterfaceImplementation_Type =
  | ASTClassInterfaceImplementation_FullType
  | ASTClassInterfaceImplementation_PartialType

export type ASTClassInterface_FullType = AST_FullTypeMixin & {
  hidden: boolean
  like: AST.ClassInterface
  method: Record<string, ASTClassInterfaceFunction_FullType>
  name: string
  property: Record<string, ASTInput_Type>
}

export type ASTClassInterface_PartialType =
  AST_PartialTypeMixin & {
    children: Array<
      ASTClassInterfaceFunction_Type | ASTInput_Type
    >
    like: AST.ClassInterface
  }

export type ASTClassInterface_Type =
  | ASTClassInterface_PartialType
  | ASTClassInterface_FullType

export type ASTClassReference_FullType = AST_FullTypeMixin & {
  bind: Record<string, ASTClassReference_FullType>
  class: ASTClass_FullType
  like: AST.ClassReference
}

export type ASTClassReference_PartialType =
  AST_PartialTypeMixin & {
    children: Array<ASTClassReference_Type>
    like: AST.ClassReference
  }

export type ASTClassReference_Type =
  | ASTClassReference_PartialType
  | ASTClassReference_FullType

export type ASTClass_FullType = AST_FullTypeMixin & {
  callback: Record<string, ASTCallback_FullType>
  hidden: boolean
  interface: Record<
    string,
    ASTClassInterfaceImplementation_FullType
  >
  like: AST.Class
  method: Record<string, ASTFunction_FullType>
  name: string
  parent: Array<ASTClass_FullType>
  property: Record<string, ASTInput_FullType>
}

export type ASTClass_PartialType = AST_PartialTypeMixin & {
  children: Array<
    | ASTCallback_Type
    | ASTClassInterfaceImplementation_Type
    | ASTFunction_Type
    | ASTClassReference_Type
    | ASTInput_Type
  >
  like: AST.Class
}

export type ASTClass_Type =
  | ASTClass_PartialType
  | ASTClass_FullType

export type ASTCloneVariable_FullType = AST_FullTypeMixin &
  AST_MutableTypeMixin & {
    like: AST.CloneVariable
    link: TreeNestType
  }

export type ASTCloneVariable_PartialType =
  AST_PartialTypeMixin &
    Partial<AST_MutableTypeMixin> & {
      children: Array<ASTTerm_Type>
      like: AST.CloneVariable
    }

// clone
export type ASTCloneVariable_Type =
  | ASTCloneVariable_PartialType
  | ASTCloneVariable_PartialType

export type ASTComponent_FullType = AST_FullTypeMixin & {
  element: Array<ASTElement_Type>
  like: AST.Component
  name: string
}

export type ASTComponent_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTElement_Type | ASTTerm_Type>
  like: AST.Component
}

export type ASTComponent_Type =
  | ASTComponent_PartialType
  | ASTComponent_FullType

export type ASTConstant_FullType = AST_FullTypeMixin & {
  hidden: boolean
  like: AST.Constant
  name: string
  value: ASTValue_FullType | Array<ASTConstant_FullType>
}

export type ASTConstant_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTTerm_Type | ASTConstant_Type>
  like: AST.Constant
}

export type ASTConstant_Type =
  | ASTConstant_PartialType
  | ASTConstant_FullType

export type ASTElement_FullType = AST_FullTypeMixin & {
  component: ASTComponent_FullType
  like: AST.Element
}

export type ASTElement_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTComponent_Type>
  like: AST.Element
}

export type ASTElement_Type =
  | ASTElement_PartialType
  | ASTElement_FullType

export type ASTExport_FullType = AST_FullTypeMixin & {
  absolutePath: string
  like: AST.Export
}

export type ASTExport_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTString_Type>
  like: AST.Export
}

export type ASTExport_Type =
  | ASTExport_PartialType
  | ASTExport_FullType

export type ASTFunctionFlow_FullType =
  | ASTBorrowVariable_FullType
  | ASTMoveVariable_FullType
  | ASTCloneVariable_FullType

export type ASTFunctionFlow_Type =
  | ASTBorrowVariable_Type
  | ASTMoveVariable_Type
  | ASTCloneVariable_Type

export type ASTFunction_FullType = AST_FullTypeMixin & {
  flow: Array<ASTFunctionFlow_FullType>
  function: Record<string, ASTFunction_FullType>
  hidden: boolean
  like: AST.Function
  name: string
  parameter: Record<string, ASTInput_FullType>
}

export type ASTFunction_PartialType = AST_PartialTypeMixin & {
  children: Array<
    | ASTTerm_Type
    | ASTFunctionFlow_Type
    | ASTFunction_Type
    | ASTInput_Type
    | ASTConstant_Type
  >
  like: AST.Function
}

export type ASTFunction_Type =
  | ASTFunction_PartialType
  | ASTFunction_FullType

export type ASTImportVariableRename_FullType =
  AST_FullTypeMixin & {
    like: AST.ImportVariableRename
    name: string
  }

export type ASTImportVariableRename_PartialType =
  AST_PartialTypeMixin & {
    children: Array<ASTTerm_Type>
    like: AST.ImportVariableRename
  }

export type ASTImportVariableRename_Type =
  | ASTImportVariableRename_PartialType
  | ASTImportVariableRename_FullType

export type ASTImportVariable_FullType = AST_FullTypeMixin & {
  like: AST.ImportVariable
  name: string
  rename: ASTImportVariableRename_FullType
  scope: string
}

export type ASTImportVariable_PartialType =
  AST_PartialTypeMixin & {
    children: Array<
      ASTConstant_Type | ASTImportVariableRename_Type
    >
    like: AST.ImportVariable
  }

export type ASTImportVariable_Type =
  | ASTImportVariable_PartialType
  | ASTImportVariable_FullType

export type ASTImport_FullType = AST_FullTypeMixin & {
  absolutePath: string
  import: Array<ASTImport_FullType>
  like: AST.Import
  variable: Array<ASTImportVariable_FullType>
}

export type ASTImport_PartialType = AST_PartialTypeMixin & {
  children: Array<
    | ASTString_Type
    | ASTImportVariable_Type
    | ASTConstant_Type
    | ASTImport_Type
  >
  like: AST.Import
}

export type ASTImport_Type =
  | ASTImport_PartialType
  | ASTImport_FullType

export type ASTInject_FullType = AST_FullTypeMixin & {
  bind: Array<ASTBind_FullType>
  like: AST.Inject
  name: string
}

export type ASTInject_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTBind_Type | ASTValue_Type | ASTTerm_Type>
  like: AST.Inject
}

export type ASTInject_Type =
  | ASTInject_PartialType
  | ASTInject_FullType

export type ASTInput_FullType = AST_FullTypeMixin & {
  inputLike: ASTClassReference_Type
  like: AST.Input
  name: string
}

export type ASTInput_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTClassReference_Type | ASTTerm_Type>
  like: AST.Input
}

export type ASTInput_Type =
  | ASTInput_PartialType
  | ASTInput_FullType

export type ASTMoveVariable_FullType = AST_FullTypeMixin &
  AST_MutableTypeMixin & {
    like: AST.MoveVariable
    nest: ASTTerm_FullType
  }

export type ASTMoveVariable_PartialType = AST_PartialTypeMixin &
  Partial<AST_MutableTypeMixin> & {
    children: Array<ASTTerm_Type>
    like: AST.MoveVariable
  }

// move
export type ASTMoveVariable_Type =
  | ASTMoveVariable_PartialType
  | ASTMoveVariable_PartialType

export type ASTNativeClassInterface_FullType =
  AST_FullTypeMixin & {
    like: AST.NativeClassInterface
  }

export type ASTNativeClassInterface_PartialType =
  AST_PartialTypeMixin & {
    children: Array<ASTTerm_Type>
    like: AST.NativeClassInterface
  }

export type ASTNativeClassInterface_Type =
  | ASTNativeClassInterface_PartialType
  | ASTNativeClassInterface_FullType

export type ASTString_FullType = AST_FullTypeMixin & {
  like: AST.String
  string: string
}

export type ASTString_PartialType = AST_PartialTypeMixin & {
  children: Array<string>
  like: AST.String
}

export type ASTString_Type =
  | ASTString_FullType
  | ASTString_PartialType

export type ASTTemplate_FullType = AST_FullTypeMixin & {
  hidden: boolean
  input: Record<string, ASTInput_PartialType>
  like: AST.Template
  name: string
}

export type ASTTemplate_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTInput_PartialType | ASTTerm_Type>
  like: AST.Template
}

export type ASTTemplate_Type =
  | ASTTemplate_PartialType
  | ASTTemplate_FullType

export type ASTTerm_FullType = AST_FullTypeMixin & {
  dive: boolean
  like: AST.Term
  name: string
  nest: Array<ASTTerm_FullType>
}

export type ASTTerm_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTString_Type | ASTTerm_Type>
  like: AST.Term
}

export type ASTTerm_Type =
  | ASTTerm_PartialType
  | ASTTerm_FullType

export type ASTTest_FullType = AST_FullTypeMixin & {
  like: AST.Test
}

export type ASTTest_PartialType = AST_PartialTypeMixin & {
  children: Array<ASTTerm_Type | ASTString_Type>
  like: AST.Test
}

export type ASTTest_Type =
  | ASTTest_PartialType
  | ASTTest_FullType

export type ASTText_FullType = AST_FullTypeMixin & {
  like: AST.String
  text: TreeNestType
}

export type ASTText_Type = ASTText_FullType

export type ASTUnsignedInteger_FullType = AST_FullTypeMixin & {
  like: AST.UnsignedInteger
  value: number
}

export type ASTUnsignedInteger_PartialType =
  AST_PartialTypeMixin & {
    children: Array<number>
    like: AST.UnsignedInteger
  }

export type ASTUnsignedInteger_Type =
  | ASTUnsignedInteger_PartialType
  | ASTUnsignedInteger_FullType

export type ASTValue_FullType =
  | ASTString_FullType
  | ASTUnsignedInteger_FullType
  | ASTBoolean_FullType

export type ASTValue_PartialType =
  | ASTString_Type
  | ASTUnsignedInteger_Type
  | ASTBoolean_PartialType

export type ASTValue_Type =
  | ASTValue_FullType
  | ASTValue_PartialType
  | ASTBoolean_Type

export type AST_FullTypeMixin = {
  complete: boolean
  partial: false
}

export type AST_MutableTypeMixin = {
  isMutable: boolean
}

export type AST_PartialTypeMixin = {
  partial: true
}
