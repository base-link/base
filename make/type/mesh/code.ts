import { AST, PartialState, TreeNestType } from '~'

export type ASTAssertionPartialType = PartialState<
  ASTAssertionType,
  {
    like: 1
  },
  true
>

export type ASTAssertionPotentialType =
  | ASTAssertionPartialType
  | ASTAssertionType

export type ASTAssertionType = {
  like: AST.Assertion
}

export type ASTBindPartialType = PartialState<
  ASTBindType,
  {
    like: 1
  },
  true
>

export type ASTBindPotentialType =
  | ASTBindPartialType
  | ASTBindType

export type ASTBindType = {
  bond: ASTValueType
  like: AST.Bind
  name: string
}

export type ASTBorrowVariablePartialType = PartialState<
  ASTBorrowVariableType,
  {
    like: 1
  },
  true
>

export type ASTBorrowVariablePotentialType =
  | ASTBorrowVariablePartialType
  | ASTBorrowVariableType

// borrow
export type ASTBorrowVariableType = ASTMutableMixinType & {
  like: AST.BorrowVariable
  link: TreeNestType
}

export type ASTCallPartialType = PartialState<
  ASTCallType,
  {
    bind: 1
    like: 1
  },
  true
>

export type ASTCallPotentialType =
  | ASTCallPartialType
  | ASTCallType

export type ASTCallType = {
  bind: Record<string, ASTBindType>
  like: AST.Call
}

export type ASTCallbackPartialType = PartialState<
  ASTCallbackType,
  {
    flow: 1
    like: 1
    parameter: 1
  },
  true
>

export type ASTCallbackPotentialType =
  | ASTCallbackPartialType
  | ASTCallbackType

export type ASTCallbackType = {
  flow: Array<ASTFunctionFlowPotentialType>
  like: AST.Callback
  name: string
  parameter: Record<string, ASTInputPotentialType>
}

export type ASTClassInterfaceFunctionPartialType = PartialState<
  ASTClassInterfaceFunctionType,
  {
    like: 1
  },
  true
>

export type ASTClassInterfaceFunctionPotentialType =
  | ASTClassInterfaceFunctionPartialType
  | ASTClassInterfaceFunctionType

export type ASTClassInterfaceFunctionType = {
  like: AST.ClassInterfaceFunction
}

export type ASTClassInterfaceImplementationPartialType =
  PartialState<
    ASTClassInterfaceImplementationType,
    {
      like: 1
      method: 1
      property: 1
    },
    true
  >

export type ASTClassInterfaceImplementationPotentialType =
  | ASTClassInterfaceImplementationPartialType
  | ASTClassInterfaceImplementationType

export type ASTClassInterfaceImplementationType = {
  like: AST.ClassInterfaceImplementation
  method: Record<string, ASTFunctionType>
  name: string
  property: Record<string, ASTInputType>
}

export type ASTClassInterfacePartialType = PartialState<
  ASTClassInterfaceType,
  {
    like: 1
    method: 1
    property: 1
  },
  true
>

export type ASTClassInterfacePotentialType =
  | ASTClassInterfacePartialType
  | ASTClassInterfaceType

export type ASTClassInterfaceType = {
  like: AST.ClassInterface
  method: Record<string, ASTClassInterfaceFunctionType>
  property: Record<string, ASTInputType>
}

export type ASTClassPartialType = PartialState<
  ASTClassType,
  {
    callback: 1
    interface: 1
    like: 1
    method: 1
    parent: 1
    property: 1
  },
  true
>

export type ASTClassPotentialType =
  | ASTClassPartialType
  | ASTClassType

export type ASTClassReferencePartialType = PartialState<
  ASTClassReferenceType,
  {
    bind: 1
    like: 1
  },
  true
>

export type ASTClassReferencePotentialType =
  | ASTClassReferencePartialType
  | ASTClassReferenceType

export type ASTClassReferenceType = {
  bind: Record<
    string,
    ASTClassReferenceType | ASTClassReferencePartialType
  >
  like: AST.ClassReference
  name: string
}

export type ASTClassType = {
  callback: Record<string, ASTCallbackType>
  interface: Record<string, ASTClassInterfaceImplementationType>
  like: AST.Class
  method: Record<string, ASTFunctionType>
  name: string
  parent: Array<ASTClassType>
  property: Record<string, ASTInputType>
}

export type ASTCloneVariablePartialType = PartialState<
  ASTCloneVariableType,
  {
    like: 1
  },
  true
>

export type ASTCloneVariablePotentialType =
  | ASTCloneVariablePartialType
  | ASTCloneVariableType

// clone
export type ASTCloneVariableType = ASTMutableMixinType & {
  like: AST.CloneVariable
  link: TreeNestType
}

export type ASTComponentPartialType = PartialState<
  ASTComponentType,
  {
    element: 1
    like: 1
  },
  true
>

export type ASTComponentPotentialType =
  | ASTComponentPartialType
  | ASTComponentType

export type ASTComponentType = {
  element: Array<ASTElementType>
  like: AST.Component
  name: string
}

export type ASTConstantPartialType = PartialState<
  ASTConstantType,
  {
    like: 1
  },
  true
>

export type ASTConstantPotentialType =
  | ASTConstantPartialType
  | ASTConstantType

export type ASTConstantType = {
  like: AST.Constant
}

export type ASTElementPartialType = PartialState<
  ASTElementType,
  {
    like: 1
  },
  true
>

export type ASTElementPotentialType =
  | ASTElementPartialType
  | ASTElementType

export type ASTElementType = {
  component: ASTComponentType
  like: AST.Element
}

export type ASTExportPartialType = PartialState<
  ASTExportType,
  {
    like: 1
  },
  true
>

export type ASTExportPotentialType =
  | ASTExportPartialType
  | ASTExportType

export type ASTExportType = {
  like: AST.Export
  link: string
}

export type ASTFunctionFlowPotentialType =
  | ASTCallPotentialType
  | ASTAssertionPotentialType

export type ASTFunctionFlowType = ASTCallType | ASTAssertionType

export type ASTFunctionPartialType = PartialState<
  ASTFunctionType,
  {
    flow: 1
    function: 1
    like: 1
    parameter: 1
  },
  true
>

export type ASTFunctionPotentialType =
  | ASTFunctionPartialType
  | ASTFunctionType

export type ASTFunctionType = {
  flow: Array<ASTFunctionFlowType>
  function: Record<string, ASTFunctionType>
  like: AST.Function
  parameter: Record<string, ASTInputType>
}

export type ASTImportPartialType = PartialState<
  ASTImportType,
  {
    like: 1
    variable: 1
  },
  true
>

export type ASTImportPotentialType =
  | ASTImportPartialType
  | ASTImportType

export type ASTImportType = {
  absolutePath: string
  like: AST.Import
  variable: Array<ASTImportVariablePotentialType>
}

export type ASTImportVariablePartialType = PartialState<
  ASTImportVariableType,
  {
    like: 1
  },
  true
>

export type ASTImportVariablePotentialType =
  | ASTImportVariablePartialType
  | ASTImportVariableType

export type ASTImportVariableRenamePartialType = PartialState<
  ASTImportVariableRenameType,
  {
    like: 1
  },
  true
>

export type ASTImportVariableRenamePotentialType =
  | ASTImportVariableRenamePartialType
  | ASTImportVariableRenameType

export type ASTImportVariableRenameType = {
  like: AST.ImportVariableRename
  name: string
}

export type ASTImportVariableType = {
  like: AST.ImportVariable
  name: string
  rename?: ASTImportVariableRenamePotentialType
}

export type ASTInjectPartialType = PartialState<
  ASTInjectType,
  {
    bind: 1
    like: 1
  },
  true
>

export type ASTInjectPotentialType =
  | ASTInjectPartialType
  | ASTInjectType

export type ASTInjectType = {
  bind: Array<ASTBindPotentialType>
  like: AST.Inject
  name: string
}

export type ASTInputPartialType = PartialState<
  ASTInputType,
  {
    like: 1
  },
  true
>

export type ASTInputPotentialType =
  | ASTInputPartialType
  | ASTInputType

export type ASTInputType = {
  inputLike: ASTClassReferenceType
  like: AST.Input
  name: string
}

export type ASTMoveVariablePartialType = PartialState<
  ASTMoveVariableType,
  {
    like: 1
  },
  true
>

export type ASTMoveVariablePotentialType =
  | ASTMoveVariablePartialType
  | ASTMoveVariableType

// move
export type ASTMoveVariableType = ASTMutableMixinType & {
  like: AST.MoveVariable
  path: TreeNestType
}

export type ASTMutableMixinType = {
  isMutable: boolean
}

export type ASTNativeClassInterfacePartialType = PartialState<
  ASTNativeClassInterfaceType,
  {
    like: 1
  },
  true
>

export type ASTNativeClassInterfacePotentialType =
  | ASTNativeClassInterfacePartialType
  | ASTNativeClassInterfaceType

export type ASTNativeClassInterfaceType = {
  like: AST.NativeClassInterface
}

export type ASTReferenceVariableType =
  | ASTMoveVariableType
  | ASTBorrowVariableType
  | ASTCloneVariableType

export type ASTScopeType = {
  data: Record<string, unknown>
  like: AST.Scope
  parent?: ASTScopeType
  partial: false
}

export type ASTStringPartialType = PartialState<
  ASTStringType,
  {
    like: 1
  },
  true
>

export type ASTStringPotentialType =
  | ASTStringPartialType
  | ASTStringType

export type ASTStringType = {
  like: AST.String
  string: string
}

export type ASTTemplatePartialType = PartialState<
  ASTTemplateType,
  {
    input: 1
    like: 1
  },
  true
>

export type ASTTemplatePotentialType =
  | ASTTemplatePartialType
  | ASTTemplateType

export type ASTTemplateType = {
  input: Record<string, ASTInputPotentialType>
  like: AST.Template
}

export type ASTTermPartialType = PartialState<
  ASTTermType,
  {
    like: 1
  },
  true
>

export type ASTTermPotentialType =
  | ASTTermPartialType
  | ASTTermType

export type ASTTermType = {
  like: AST.Term
  name: string
}

export type ASTTestPartialType = PartialState<
  ASTTestType,
  {
    like: 1
  },
  true
>

export type ASTTestPotentialType =
  | ASTTestPartialType
  | ASTTestType

export type ASTTestType = {
  like: AST.Test
}

export type ASTUnsignedIntegerPartialType = PartialState<
  ASTUnsignedIntegerType,
  {
    like: 1
  },
  true
>

export type ASTUnsignedIntegerPotentialType =
  | ASTUnsignedIntegerPartialType
  | ASTUnsignedIntegerType

export type ASTUnsignedIntegerType = {
  like: AST.UnsignedInteger
  value: number
}

export type ASTValueType =
  | ASTStringType
  | ASTUnsignedIntegerType
