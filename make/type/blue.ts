import { Color, Mesh, MeshBaseType, SiteModuleBaseType } from '~'

export type BlueAssertionType = BlueBaseType & {
  type: Mesh.Assertion
}

export type BlueBaseType = MeshBaseType & {
  color: Color.Blue
}

export type BlueBindType = BlueBaseType & {
  bond?: BlueValueType
  name?: BlueTermLinkType
  type: Mesh.Bind
}

export type BlueBooleanLinkType =
  | BlueBooleanType
  | BluePathType
  | BlueStringArrayType
  | BlueTermType
  | BlueStringType

export type BlueBooleanType = BlueBaseType & {
  type: Mesh.Boolean
  value: boolean
}

export type BlueCallType = BlueBaseType & {
  type: Mesh.Call
}

export type BlueCallbackType = BlueBaseType & {
  type: Mesh.Callback
}

export type BlueClassInputType = BlueBaseType & {
  type: Mesh.ClassInput
}

export type BlueClassInterfaceImplementationType = BlueBaseType & {
  type: Mesh.ClassInterfaceImplementation
}

export type BlueClassInterfaceType = BlueBaseType & {
  type: Mesh.ClassInterface
}

export type BlueClassReferenceType = BlueBaseType & {
  bind: Array<BlueClassReferenceType>
  bond?: BlueClassType
  name?: BlueTermLinkType
  type: Mesh.ClassReference
}

export type BlueClassType = BlueBaseType & {
  type: Mesh.Class
}

export type BlueCodeModuleType = BlueBaseType & {
  callbacks: Record<string, BlueCallbackType>
  classInterfaces: Record<string, BlueClassInterfaceType>
  classes: Record<string, BlueClassType>
  components: Record<string, BlueComponentType>
  constants: Record<string, BlueConstantType>
  exports: Array<BlueExportType>
  functions: Record<string, BlueFunctionType>
  imports: Array<BlueImportType>
  nativeClassInterfaces: Record<string, BlueNativeClassInterfaceType>
  public: {
    classInterfaces: Record<string, BlueClassInterfaceType>
    classes: Record<string, BlueClassType>
    components: Record<string, BlueComponentType>
    constants: Record<string, BlueConstantType>
    functions: Record<string, BlueFunctionType>
    nativeClassInterfaces: Record<string, BlueNativeClassInterfaceType>
    templates: Record<string, BlueTemplateType>
    tests: Record<string, BlueTestType>
  }
  templates: Record<string, BlueTemplateType>
  tests: Record<string, BlueTestType>
  type: Mesh.CodeModule
}

export type BlueComponentType = BlueBaseType & {
  type: Mesh.Component
}

export type BlueConstantType = BlueBaseType & {
  type: Mesh.Constant
}

export type BlueDecimalType = BlueBaseType & {
  type: Mesh.Decimal
}

export type BlueElementType = BlueBaseType & {
  type: Mesh.Element
}

export type BlueExportType = BlueBaseType & {
  absolutePath?: BlueTextLinkType
  hides: Array<BlueHideExportVariableType>
  type: Mesh.Export
}

export type BlueFunctionType = BlueBaseType & {
  type: Mesh.Function
}

export type BlueGatherType = BlueBaseType & {
  type: Mesh.Gather
}

export type BlueHideExportVariableType = BlueBaseType & {
  name?: BlueTermLinkType
  scopeName?: BlueTermLinkType
  type: Mesh.HideExportVariable
}

export type BlueImportType = BlueBaseType & {
  type: Mesh.Import
}

export type BlueImportVariableRenameType = BlueBaseType & {
  type: Mesh.ImportVariableRename
}

export type BlueImportVariableType = BlueBaseType & {
  type: Mesh.ImportVariable
}

export type BlueInjectType = BlueBaseType & {
  type: Mesh.Inject
}

export type BlueInputType = BlueBaseType & {
  type: Mesh.Input
}

export type BlueNativeClassInterfaceType = BlueBaseType & {
  type: Mesh.NativeClassInterface
}

export type BlueOutputType = BlueBaseType & {
  type: Mesh.Output
}

export type BluePackageLicenseType = BlueBaseType & {
  type: Mesh.PackageLicense
}

export type BluePackageModuleType = SiteModuleBaseType &
  BlueBaseType & {
    deck: BluePackageType
    type: Mesh.PackageModule
  }

export type BluePackageType = BlueBaseType & {
  type: Mesh.Package
}

export type BluePackageUserType = BlueBaseType & {
  type: Mesh.PackageUser
}

export type BluePathLinkType =
  | BluePathType
  | BlueStringArrayType
  | BlueTermType
  | BlueStringType

export type BluePathType = BlueBaseType & {
  type: Mesh.Path
}

export type BluePlaceholderType = BlueBaseType & {
  type: Mesh.Placeholder
}

export type BlueSignedIntegerType = BlueBaseType & {
  type: Mesh.SignedInteger
}

export type BlueStepType = BlueCallType | BlueAssertionType

export type BlueStringArrayType = BlueBaseType & {
  type: Mesh.StringArray
}

export type BlueStringType = BlueBaseType & {
  type: Mesh.String
  value: string
}

export type BlueTemplateType = BlueBaseType & {
  type: Mesh.Template
}

export type BlueTermLinkType = BlueTermType | BlueStringType

export type BlueTermType = BlueBaseType & {
  type: Mesh.Term
}

export type BlueTestType = BlueBaseType & {
  type: Mesh.Test
}

export type BlueTextLinkType = BlueTextType | BlueStringType

export type BlueTextType = BlueBaseType & {
  type: Mesh.Text
}

export type BlueType =
  | BlueAssertionType
  | BlueBindType
  | BlueBooleanType
  | BlueCallType
  | BlueCallbackType
  | BlueClassInputType
  | BlueClassInterfaceImplementationType
  | BlueClassInterfaceType
  | BlueClassReferenceType
  | BlueClassType
  | BlueComponentType
  | BlueConstantType
  | BlueDecimalType
  | BlueElementType
  | BlueExportType
  | BlueFunctionType
  | BlueGatherType
  | BlueHideExportVariableType
  | BlueImportType
  | BlueImportVariableRenameType
  | BlueImportVariableType
  | BlueInjectType
  | BlueInputType
  | BlueNativeClassInterfaceType
  | BlueOutputType
  | BluePackageLicenseType
  | BluePackageType
  | BluePackageUserType
  | BluePathType
  | BluePlaceholderType
  | BlueSignedIntegerType
  | BlueStringArrayType
  | BlueStringType
  | BlueTemplateType
  | BlueTermType
  | BlueTestType
  | BlueTextType
  | BlueUnsignedIntegerType
  | BlueVariableType
  | BlueCodeModuleType

export type BlueUnsignedIntegerType = BlueBaseType & {
  type: Mesh.UnsignedInteger
}

export type BlueValueType =
  | BlueStringType
  | BlueUnsignedIntegerType
  | BlueSignedIntegerType
  | BlueDecimalType
  | BlueBooleanType

export type BlueVariableType = BlueBaseType & {
  type: Mesh.Variable
}
