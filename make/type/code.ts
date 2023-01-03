import { Mesh, SiteScopeType } from '~'
import type { LinkTreeType } from '~'

export type MeshAssertion_FullType = Mesh_FullTypeMixin & {
  bind: Array<MeshBind_FullType | MeshValue_FullType>
  like: Mesh.Assertion
  name: string
}

export type MeshAssertion_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<
      MeshTerm_Type | MeshBind_Type | MeshValue_Type
    >
    like: Mesh.Assertion
  }

export type MeshAssertion_Type =
  | MeshAssertion_PartialType
  | MeshAssertion_FullType

export type MeshBind_FullType = Mesh_FullTypeMixin & {
  bond: MeshValue_FullType
  like: Mesh.Bind
  name: string
}

export type MeshBind_PartialType = Mesh_PartialTypeMixin & {
  children: Array<MeshTerm_Type | MeshValue_Type>
  like: Mesh.Bind
}

export type MeshBind_Type =
  | MeshBind_PartialType
  | MeshBind_FullType

export type MeshBoolean_FullType = Mesh_FullTypeMixin & {
  boolean: boolean
  like: Mesh.Boolean
}

export type MeshBoolean_PartialType = Mesh_PartialTypeMixin & {
  children: Array<boolean>
  like: Mesh.Boolean
}

export type MeshBoolean_Type =
  | MeshBoolean_FullType
  | MeshBoolean_PartialType

export type MeshBorrowVariable_FullType = Mesh_FullTypeMixin &
  Partial<Mesh_MutableTypeMixin> & {
    like: Mesh.BorrowVariable
    link: MeshTerm_FullType
  }

export type MeshBorrowVariable_PartialType =
  Mesh_PartialTypeMixin &
    Mesh_MutableTypeMixin & {
      children: Array<MeshTerm_Type>
      like: Mesh.BorrowVariable
    }

// borrow
export type MeshBorrowVariable_Type =
  | MeshBorrowVariable_PartialType
  | MeshBorrowVariable_FullType

export type MeshCall_FullType = Mesh_FullTypeMixin & {
  bind: Record<string, MeshBind_FullType>
  function: MeshFunction_FullType
  like: Mesh.Call
}

export type MeshCall_PartialType = Mesh_PartialTypeMixin & {
  children: Array<
    | MeshTerm_Type
    | MeshValue_Type
    | MeshBind_Type
    | MeshConstant_Type
  >
  like: Mesh.Call
}

export type MeshCall_Type =
  | MeshCall_PartialType
  | MeshCall_FullType

export type MeshCallback_FullType = Mesh_FullTypeMixin & {
  flow: Array<MeshFunctionFlow_FullType>
  function: Record<string, MeshFunctionFlow_FullType>
  like: Mesh.Callback
  name: string
  parameter: Record<string, MeshInput_FullType>
}

export type MeshCallback_PartialType = Mesh_PartialTypeMixin & {
  children: Array<
    MeshFunctionFlow_Type | MeshInput_Type | MeshTerm_Type
  >
  like: Mesh.Callback
}

export type MeshCallback_Type =
  | MeshCallback_PartialType
  | MeshCallback_FullType

export type MeshClassInterfaceFunction_FullType =
  Mesh_FullTypeMixin & {
    function: Record<string, MeshFunction_FullType>
    like: Mesh.ClassInterfaceFunction
    name: string
  }

export type MeshClassInterfaceFunction_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<MeshTerm_Type | MeshFunction_Type>
    like: Mesh.ClassInterfaceFunction
  }

export type MeshClassInterfaceFunction_Type =
  | MeshClassInterfaceFunction_FullType
  | MeshClassInterfaceFunction_PartialType

export type MeshClassInterfaceImplementation_FullType =
  Mesh_FullTypeMixin & {
    like: Mesh.ClassInterfaceImplementation
    method: Record<string, MeshFunction_Type>
    name: string
    property: Record<string, MeshInput_Type>
  }

export type MeshClassInterfaceImplementation_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<MeshFunction_Type | MeshInput_Type>
    like: Mesh.ClassInterfaceImplementation
  }

export type MeshClassInterfaceImplementation_Type =
  | MeshClassInterfaceImplementation_FullType
  | MeshClassInterfaceImplementation_PartialType

export type MeshClassInterface_FullType = Mesh_FullTypeMixin & {
  hidden: boolean
  like: Mesh.ClassInterface
  method: Record<string, MeshClassInterfaceFunction_FullType>
  name: string
  property: Record<string, MeshInput_Type>
}

export type MeshClassInterface_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<
      | MeshClassInterfaceFunction_Type
      | MeshInput_Type
      | MeshTerm_Type
    >
    like: Mesh.ClassInterface
  }

export type MeshClassInterface_Type =
  | MeshClassInterface_PartialType
  | MeshClassInterface_FullType

export type MeshClassReference_FullType = Mesh_FullTypeMixin & {
  bind: Record<string, MeshClassReference_FullType>
  class: MeshClass_FullType
  like: Mesh.ClassReference
}

export type MeshClassReference_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<MeshClassReference_Type | MeshConstant_Type>
    like: Mesh.ClassReference
  }

export type MeshClassReference_Type =
  | MeshClassReference_PartialType
  | MeshClassReference_FullType

export type MeshClass_FullType = Mesh_FullTypeMixin & {
  callback: Record<string, MeshCallback_FullType>
  hidden: boolean
  interface: Record<
    string,
    MeshClassInterfaceImplementation_FullType
  >
  like: Mesh.Class
  method: Record<string, MeshFunction_FullType>
  name: string
  parent: Array<MeshClass_FullType>
  property: Record<string, MeshInput_FullType>
}

export type MeshClass_PartialType = Mesh_PartialTypeMixin & {
  children: Array<
    | MeshCallback_Type
    | MeshClassInterfaceImplementation_Type
    | MeshFunction_Type
    | MeshClassReference_Type
    | MeshInput_Type
  >
  like: Mesh.Class
}

export type MeshClass_Type =
  | MeshClass_PartialType
  | MeshClass_FullType

export type MeshCloneVariable_FullType = Mesh_FullTypeMixin &
  Mesh_MutableTypeMixin & {
    like: Mesh.CloneVariable
    link: LinkTreeType
  }

export type MeshCloneVariable_PartialType =
  Mesh_PartialTypeMixin &
    Partial<Mesh_MutableTypeMixin> & {
      children: Array<MeshTerm_Type>
      like: Mesh.CloneVariable
    }

// clone
export type MeshCloneVariable_Type =
  | MeshCloneVariable_PartialType
  | MeshCloneVariable_PartialType

export type MeshComponent_FullType = Mesh_FullTypeMixin & {
  element: Array<MeshElement_Type>
  like: Mesh.Component
  name: string
}

export type MeshComponent_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<MeshElement_Type | MeshTerm_Type>
    like: Mesh.Component
  }

export type MeshComponent_Type =
  | MeshComponent_PartialType
  | MeshComponent_FullType

export type MeshConstant_FullType = Mesh_FullTypeMixin & {
  hidden: boolean
  like: Mesh.Constant
  name: string
  value: MeshValue_FullType | Array<MeshConstant_FullType>
}

export type MeshConstant_PartialType = Mesh_PartialTypeMixin & {
  children: Array<MeshTerm_Type | MeshConstant_Type>
  like: Mesh.Constant
}

export type MeshConstant_Type =
  | MeshConstant_PartialType
  | MeshConstant_FullType

export type MeshElement_FullType = Mesh_FullTypeMixin & {
  component: MeshComponent_FullType
  like: Mesh.Element
}

export type MeshElement_PartialType = Mesh_PartialTypeMixin & {
  children: Array<MeshComponent_Type>
  like: Mesh.Element
}

export type MeshElement_Type =
  | MeshElement_PartialType
  | MeshElement_FullType

export type MeshExport_FullType = Mesh_FullTypeMixin & {
  absolutePath: string
  like: Mesh.Export
}

export type MeshExport_PartialType = Mesh_PartialTypeMixin & {
  children: Array<MeshString_Type>
  like: Mesh.Export
}

export type MeshExport_Type =
  | MeshExport_PartialType
  | MeshExport_FullType

export type MeshFunctionFlow_FullType =
  | MeshBorrowVariable_FullType
  | MeshMoveVariable_FullType
  | MeshCloneVariable_FullType

export type MeshFunctionFlow_Type =
  | MeshBorrowVariable_Type
  | MeshMoveVariable_Type
  | MeshCloneVariable_Type

export type MeshFunction_FullType = Mesh_FullTypeMixin & {
  flow: Array<MeshFunctionFlow_FullType>
  function: Record<string, MeshFunction_FullType>
  hidden: boolean
  like: Mesh.Function
  name: string
  parameter: Record<string, MeshInput_FullType>
}

export type MeshFunction_PartialType = Mesh_PartialTypeMixin & {
  children: Array<
    | MeshTerm_Type
    | MeshFunctionFlow_Type
    | MeshFunction_Type
    | MeshInput_Type
    | MeshConstant_Type
  >
  like: Mesh.Function
}

export type MeshFunction_Type =
  | MeshFunction_PartialType
  | MeshFunction_FullType

export type MeshImportVariableRename_FullType =
  Mesh_FullTypeMixin & {
    like: Mesh.ImportVariableRename
    name: string
  }

export type MeshImportVariableRename_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<MeshTerm_Type>
    like: Mesh.ImportVariableRename
  }

export type MeshImportVariableRename_Type =
  | MeshImportVariableRename_PartialType
  | MeshImportVariableRename_FullType

export type MeshImportVariable_FullType = Mesh_FullTypeMixin & {
  like: Mesh.ImportVariable
  name: string
  rename: MeshImportVariableRename_FullType
  scope: string
}

export type MeshImportVariable_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<
      MeshConstant_Type | MeshImportVariableRename_Type
    >
    like: Mesh.ImportVariable
  }

export type MeshImportVariable_Type =
  | MeshImportVariable_PartialType
  | MeshImportVariable_FullType

export type MeshImport_FullType = Mesh_FullTypeMixin & {
  absolutePath: string
  import: Array<MeshImport_FullType>
  like: Mesh.Import
  variable: Array<MeshImportVariable_FullType>
}

export type MeshImport_PartialType = Mesh_PartialTypeMixin & {
  children: Array<
    | MeshString_Type
    | MeshImportVariable_Type
    | MeshConstant_Type
    | MeshImport_Type
  >
  like: Mesh.Import
}

export type MeshImport_Type =
  | MeshImport_PartialType
  | MeshImport_FullType

export type MeshInject_FullType = Mesh_FullTypeMixin & {
  bind: Array<MeshBind_FullType>
  like: Mesh.Inject
  name: string
}

export type MeshInject_PartialType = Mesh_PartialTypeMixin & {
  children: Array<
    | MeshBind_Type
    | MeshValue_Type
    | MeshTerm_Type
    | MeshConstant_Type
  >
  like: Mesh.Inject
}

export type MeshInject_Type =
  | MeshInject_PartialType
  | MeshInject_FullType

export type MeshInput_FullType = Mesh_FullTypeMixin & {
  inputLike: MeshClassReference_Type
  like: Mesh.Input
  name: string
}

export type MeshInput_PartialType = Mesh_PartialTypeMixin & {
  children: Array<
    MeshClassReference_Type | MeshTerm_Type | MeshConstant_Type
  >
  like: Mesh.Input
}

export type MeshInput_Type =
  | MeshInput_PartialType
  | MeshInput_FullType

export type MeshMoveVariable_FullType = Mesh_FullTypeMixin &
  Mesh_MutableTypeMixin & {
    like: Mesh.MoveVariable
    nest: MeshTerm_FullType
  }

export type MeshMoveVariable_PartialType =
  Mesh_PartialTypeMixin &
    Partial<Mesh_MutableTypeMixin> & {
      children: Array<MeshTerm_Type>
      like: Mesh.MoveVariable
    }

// move
export type MeshMoveVariable_Type =
  | MeshMoveVariable_PartialType
  | MeshMoveVariable_PartialType

export type MeshNativeClassInterface_FullType =
  Mesh_FullTypeMixin & {
    like: Mesh.NativeClassInterface
  }

export type MeshNativeClassInterface_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<MeshTerm_Type>
    like: Mesh.NativeClassInterface
  }

export type MeshNativeClassInterface_Type =
  | MeshNativeClassInterface_PartialType
  | MeshNativeClassInterface_FullType

export type MeshOutput_FullType = Mesh_FullTypeMixin & {
  like: Mesh.Output
  name: string
  sourceLike: MeshClassReference_Type
}

export type MeshOutput_PartialType = Mesh_PartialTypeMixin & {
  children: Array<
    MeshClassReference_Type | MeshTerm_Type | MeshConstant_Type
  >
  like: Mesh.Output
}

export type MeshOutput_Type =
  | MeshOutput_PartialType
  | MeshOutput_FullType

export type MeshString_FullType = Mesh_FullTypeMixin & {
  like: Mesh.String
  string: string
}

export type MeshString_PartialType = Mesh_PartialTypeMixin & {
  children: Array<string>
  like: Mesh.String
}

export type MeshString_Type =
  | MeshString_FullType
  | MeshString_PartialType

export type MeshTemplate_FullType = Mesh_FullTypeMixin & {
  hidden: boolean
  input: Record<string, MeshInput_PartialType>
  like: Mesh.Template
  name: string
}

export type MeshTemplate_PartialType = Mesh_PartialTypeMixin & {
  children: Array<MeshInput_PartialType | MeshTerm_Type>
  like: Mesh.Template
}

export type MeshTemplate_Type =
  | MeshTemplate_PartialType
  | MeshTemplate_FullType

export type MeshTerm_FullType = Mesh_FullTypeMixin & {
  dive: boolean
  like: Mesh.Term
  name: string
  nest: Array<MeshTerm_FullType>
}

export type MeshTerm_PartialType = Mesh_PartialTypeMixin & {
  children: Array<MeshString_Type | MeshTerm_Type>
  like: Mesh.Term
}

export type MeshTerm_Type =
  | MeshTerm_PartialType
  | MeshTerm_FullType

export type MeshTest_FullType = Mesh_FullTypeMixin & {
  like: Mesh.Test
}

export type MeshTest_PartialType = Mesh_PartialTypeMixin & {
  children: Array<MeshTerm_Type | MeshString_Type>
  like: Mesh.Test
}

export type MeshTest_Type =
  | MeshTest_PartialType
  | MeshTest_FullType

export type MeshText_FullType = Mesh_FullTypeMixin & {
  like: Mesh.String
  text: LinkTreeType
}

export type MeshText_Type = MeshText_FullType

export type MeshUnsignedInteger_FullType =
  Mesh_FullTypeMixin & {
    like: Mesh.UnsignedInteger
    value: number
  }

export type MeshUnsignedInteger_PartialType =
  Mesh_PartialTypeMixin & {
    children: Array<number>
    like: Mesh.UnsignedInteger
  }

export type MeshUnsignedInteger_Type =
  | MeshUnsignedInteger_PartialType
  | MeshUnsignedInteger_FullType

export type MeshValue_FullType =
  | MeshString_FullType
  | MeshUnsignedInteger_FullType
  | MeshBoolean_FullType

export type MeshValue_PartialType =
  | MeshString_Type
  | MeshUnsignedInteger_Type
  | MeshBoolean_PartialType

export type MeshValue_Type =
  | MeshValue_FullType
  | MeshValue_PartialType
  | MeshBoolean_Type

export type Mesh_FullTypeMixin = {
  complete: boolean
  lexicalScope?: SiteScopeType
  partial: false
}

export type Mesh_MutableTypeMixin = {
  isMutable: boolean
}

export type Mesh_PartialTypeMixin = {
  lexicalScope?: SiteScopeType
  partial: true
}
