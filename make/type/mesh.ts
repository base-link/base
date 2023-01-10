import type {
  LinkNodeType,
  LinkPathType,
  LinkTermType,
  LinkTextType,
  LinkTreeType,
  SiteModuleBaseType,
  SiteStepScopeType,
} from '~'

export enum Mesh {
  Assertion = 'mesh-assertion',
  Bind = 'mesh-bind',
  BookModule = 'mesh-book-module',
  Boolean = 'mesh-boolean',
  Call = 'mesh-call',
  Callback = 'mesh-callback',
  Class = 'mesh-class',
  ClassInput = 'mesh-class-input',
  ClassInterface = 'mesh-class-interface',
  ClassInterfaceImplementation = 'mesh-class-interface-implementation',
  ClassReference = 'mesh-class-reference',
  CodeModule = 'mesh-code-module',
  Component = 'mesh-component',
  Constant = 'mesh-constant',
  Decimal = 'mesh-decimal',
  Element = 'mesh-element',
  Export = 'mesh-export',
  Function = 'mesh-function',
  Gather = 'mesh-gather',
  HideExportVariable = 'mesh-hide-export-variable',
  Import = 'mesh-import',
  ImportVariable = 'mesh-import-variable',
  ImportVariableRename = 'mesh-import-variable-rename',
  Inject = 'mesh-inject',
  Input = 'mesh-input',
  ModuleGather = 'mesh-module-gather',
  NativeClassInterface = 'mesh-native-class-interface',
  Output = 'mesh-output',
  Package = 'mesh-package',
  PackageLicense = 'mesh-package-license',
  PackageModule = 'mesh-package-module',
  PackageUser = 'mesh-package-user',
  Path = 'mesh-path',
  Placeholder = 'mesh-placeholder',
  Pointer = 'mesh-pointer',
  SignedInteger = 'mesh-signed-integer',
  String = 'mesh-string',
  StringArray = 'mesh-string-array',
  Template = 'mesh-template',
  Term = 'mesh-term',
  Test = 'mesh-test',
  Text = 'mesh-text',
  UnsignedInteger = 'mesh-unsigned-integer',
  Variable = 'mesh-variable',
}

// eslint-disable-next-line sort-exports/sort-exports
export const MESH_TERM_LINK_TYPE = [Mesh.Term, Mesh.String]

// eslint-disable-next-line sort-exports/sort-exports
export const MESH_PATH_LINK_TYPE = [
  Mesh.Term,
  Mesh.String,
  Mesh.Path,
  Mesh.StringArray,
]

// eslint-disable-next-line sort-exports/sort-exports
export const MESH_BOOLEAN_LINK_TYPE = [
  Mesh.Boolean,
  Mesh.String,
  Mesh.Term,
  Mesh.StringArray,
  Mesh.Path,
]

// eslint-disable-next-line sort-exports/sort-exports
export const MESH_TYPE = [
  Mesh.Assertion,
  Mesh.Bind,
  Mesh.BookModule,
  Mesh.Boolean,
  Mesh.Variable,
  Mesh.Call,
  Mesh.Callback,
  Mesh.Class,
  Mesh.ClassInput,
  Mesh.ClassInterface,
  Mesh.ClassInterfaceImplementation,
  Mesh.ClassReference,
  Mesh.CodeModule,
  Mesh.Component,
  Mesh.Constant,
  Mesh.Element,
  Mesh.Export,
  Mesh.Function,
  Mesh.SignedInteger,
  Mesh.Decimal,
  Mesh.Import,
  Mesh.ImportVariable,
  Mesh.ImportVariableRename,
  Mesh.Inject,
  Mesh.Input,
  Mesh.NativeClassInterface,
  Mesh.Output,
  Mesh.Package,
  Mesh.PackageLicense,
  Mesh.PackageModule,
  Mesh.PackageUser,
  Mesh.String,
  Mesh.Template,
  Mesh.Test,
  Mesh.UnsignedInteger,
  Mesh.StringArray,
  Mesh.Placeholder,
  Mesh.Term,
  Mesh.Path,
  Mesh.Gather,
  Mesh.ModuleGather,
  Mesh.HideExportVariable,
  Mesh.Text,
  Mesh.Pointer,
]

export type MeshAssertionType = MeshBaseType & {
  bind: Array<
    MeshBindPointerType | MeshValuePointerType | MeshVariablePointerType
  >
  path: MeshPathLinkPointerType
  type: Mesh.Assertion
}

export type MeshBaseType = {
  hint?: MeshHint
  scope?: SiteStepScopeType
}

export type MeshBindPointerType = MeshPointerType<Mesh.Bind>

export type MeshBindType = MeshBaseType & {
  bond: MeshValuePointerType
  name: MeshTermLinkPointerType
  type: Mesh.Bind
}

export type MeshBookModuleType = MeshModuleBaseType &
  MeshBaseType & {
    abstract: string
    tags: Array<string>
    title: string
    type: Mesh.BookModule
    // text: Array<MeshBookSection_PartialType>
  }

export type MeshBooleanLinkPointerType =
  | MeshPointerType<Mesh.Boolean>
  | MeshPointerType<Mesh.Path>
  | MeshPointerType<Mesh.StringArray>
  | MeshPointerType<Mesh.Term>
  | MeshPointerType<Mesh.String>

export type MeshBooleanPointerType = MeshPointerType<Mesh.Boolean>

export type MeshBooleanType = MeshBaseType & {
  type: Mesh.Boolean
  value: boolean
}

export type MeshCallPointerType = MeshPointerType<Mesh.Call>

export type MeshCallType = MeshBaseType & {
  bind: Array<MeshBindPointerType>
  bond?: MeshFunctionPointerType
  path: MeshPathLinkPointerType
  risk: MeshBooleanLinkPointerType
  type: Mesh.Call
  wait: MeshBooleanLinkPointerType
}

export type MeshCallbackPointerType = MeshPointerType<Mesh.Callback>

export type MeshCallbackType = MeshBaseType & {
  functions: Array<MeshFunctionPointerType>
  inputs: Array<MeshInputPointerType>
  name: MeshTermLinkPointerType
  steps: Array<MeshStepPointerType>
  type: Mesh.Callback
}

export type MeshClassInputPointerType = MeshPointerType<Mesh.ClassInput>

export type MeshClassInputType = MeshBaseType & {
  base?: MeshClassReferencePointerType
  name: MeshTermLinkPointerType
  sourceType?: MeshClassReferencePointerType
  type: Mesh.ClassInput
}

export type MeshClassInterfaceImplementationPointerType =
  MeshPointerType<Mesh.ClassInterfaceImplementation>

export type MeshClassInterfaceImplementationType = MeshBaseType & {
  methods: Array<MeshFunctionPointerType>
  name: MeshTermLinkPointerType
  properties: Array<MeshInputPointerType>
  type: Mesh.ClassInterfaceImplementation
}

export type MeshClassInterfacePointerType =
  MeshPointerType<Mesh.ClassInterface>

export type MeshClassInterfaceType = MeshBaseType & {
  hidden: MeshBooleanLinkPointerType
  methods: Array<MeshFunctionPointerType>
  name: MeshTermLinkPointerType
  properties: Array<MeshInputPointerType>
  type: Mesh.ClassInterface
}

export type MeshClassPointerType = MeshPointerType<Mesh.Class>

export type MeshClassReferencePointerType =
  MeshPointerType<Mesh.ClassReference>

export type MeshClassReferenceType = MeshBaseType & {
  bind: Array<MeshClassReferencePointerType>
  bond?: MeshClassPointerType
  name: MeshTermLinkPointerType
  type: Mesh.ClassReference
}

export type MeshClassType = MeshBaseType & {
  callbacks: Array<MeshCallbackPointerType>
  hidden: MeshBooleanLinkPointerType
  interfaces: Array<MeshClassInterfaceImplementationPointerType>
  methods: Array<MeshFunctionPointerType>
  name: MeshTermLinkPointerType
  parents: Array<MeshClassPointerType>
  properties: Array<MeshInputPointerType>
  type: Mesh.Class
}

export type MeshCodeModuleType = MeshModuleBaseType &
  MeshBaseType & {
    callbacks: Record<string, MeshCallbackType>
    classInterfaces: Record<string, MeshClassInterfaceType>
    classes: Record<string, MeshClassType>
    components: Record<string, MeshComponentType>
    constants: Record<string, MeshConstantType>
    exports: Array<MeshExportType>
    functions: Record<string, MeshFunctionType>
    imports: Array<MeshImportType>
    nativeClassInterfaces: Record<string, MeshNativeClassInterfaceType>
    public: {
      classInterfaces: Record<string, MeshClassInterfaceType>
      classes: Record<string, MeshClassType>
      components: Record<string, MeshComponentType>
      constants: Record<string, MeshConstantType>
      functions: Record<string, MeshFunctionType>
      nativeClassInterfaces: Record<
        string,
        MeshNativeClassInterfaceType
      >
      templates: Record<string, MeshTemplateType>
      tests: Record<string, MeshTestType>
    }
    templates: Record<string, MeshTemplateType>
    tests: Record<string, MeshTestType>
    type: Mesh.CodeModule
  }

export type MeshComponentType = MeshBaseType & {
  element: Array<MeshElementType>
  name: MeshTermLinkPointerType
  type: Mesh.Component
}

export type MeshConstantPointerType = MeshPointerType<Mesh.Constant>

export type MeshConstantType = MeshBaseType & {
  hidden: MeshBooleanLinkPointerType
  name: MeshTermLinkPointerType
  type: Mesh.Constant
  value: MeshValuePointerType | Array<MeshConstantPointerType>
}

export type MeshDecimalType = MeshBaseType & {
  type: Mesh.Decimal
  value: number
}

export type MeshElementType = MeshBaseType & {
  bond?: MeshComponentType
  name: MeshTermLinkPointerType
  type: Mesh.Element
}

export type MeshExportPointerType = MeshPointerType<Mesh.Export>

export type MeshExportType = MeshBaseType & {
  absolutePath: MeshTextLinkPointerType
  hides: Array<MeshHideExportVariablePointerType>
  type: Mesh.Export
}

export type MeshFunctionPointerType = MeshPointerType<Mesh.Function>

export type MeshFunctionType = MeshBaseType & {
  base?: MeshFunctionPointerType
  definedOutputType?: MeshClassReferencePointerType
  functions: Array<MeshFunctionType>
  hidden: MeshBooleanLinkPointerType
  inferredOutputType?: MeshClassReferencePointerType
  inputs: Array<MeshInputPointerType>
  name: MeshTermLinkPointerType
  risk: MeshBooleanLinkPointerType
  steps: Array<MeshStepPointerType>
  type: Mesh.Function
  typeInputs: Array<MeshClassInputPointerType>
  wait: MeshBooleanLinkPointerType
}

export type MeshGatherPointerType = MeshPointerType<Mesh.Gather>

export type MeshGatherType = MeshBaseType & {
  children: Array<MeshPointerType>
  name: string
  scope: SiteStepScopeType
  type: Mesh.Gather
}

export type MeshHideExportVariablePointerType =
  MeshPointerType<Mesh.HideExportVariable>

export type MeshHideExportVariableType = MeshBaseType & {
  name: MeshTermLinkPointerType
  scopeName: MeshTermLinkPointerType
  type: Mesh.HideExportVariable
}

export enum MeshHint {
  Dynamic = 'dyanmic',
  Static = 'static',
}

export type MeshImportPointerType = MeshPointerType<Mesh.Import>

export type MeshImportType = MeshBaseType & {
  absolutePath: MeshTextLinkPointerType
  import: Array<MeshImportPointerType>
  type: Mesh.Import
  variable: Array<MeshImportVariablePointerType>
}

export type MeshImportVariablePointerType =
  MeshPointerType<Mesh.ImportVariable>

export type MeshImportVariableRenamePointerType =
  MeshPointerType<Mesh.ImportVariableRename>

export type MeshImportVariableRenameType = MeshBaseType & {
  name: MeshTermLinkPointerType
  type: Mesh.ImportVariableRename
}

export type MeshImportVariableType = MeshBaseType & {
  name: MeshTermLinkPointerType
  rename: MeshImportVariableRenamePointerType
  scopeName: MeshTermLinkPointerType
  type: Mesh.ImportVariable
}

export type MeshInjectPointerType = MeshPointerType<Mesh.Inject>

export type MeshInjectType = MeshBaseType & {
  bind: Array<MeshBindPointerType>
  name: MeshTermLinkPointerType
  type: Mesh.Inject
}

export type MeshInputPointerType = MeshPointerType<Mesh.Input>

export type MeshInputType = MeshBaseType & {
  definedType?: MeshClassReferencePointerType
  inferredType?: MeshClassReferencePointerType
  name: MeshTermLinkPointerType
  type: Mesh.Input
}

export type MeshMappingType = {
  'mesh-assertion': MeshAssertionType
  'mesh-bind': MeshBindType
  'mesh-book-module': MeshBookModuleType
  'mesh-boolean': MeshBooleanType
  'mesh-call': MeshCallType
  'mesh-callback': MeshCallbackType
  'mesh-class': MeshClassType
  'mesh-class-input': MeshClassInputType
  'mesh-class-interface': MeshClassInterfaceType
  'mesh-class-interface-implementation': MeshClassInterfaceImplementationType
  'mesh-class-reference': MeshClassReferenceType
  'mesh-code-module': MeshCodeModuleType
  'mesh-component': MeshComponentType
  'mesh-constant': MeshConstantType
  'mesh-decimal': MeshDecimalType
  'mesh-element': MeshElementType
  'mesh-export': MeshExportType
  'mesh-function': MeshFunctionType
  'mesh-gather': MeshGatherType
  'mesh-hide-export-variable': MeshHideExportVariableType
  'mesh-import': MeshImportType
  'mesh-import-variable': MeshImportVariableType
  'mesh-import-variable-rename': MeshImportVariableRenameType
  'mesh-inject': MeshInjectType
  'mesh-input': MeshInputType
  'mesh-module-gather': MeshModuleGatherType
  'mesh-native-class-interface': MeshNativeClassInterfaceType
  'mesh-output': MeshOutputType
  'mesh-package': MeshPackageType
  'mesh-package-license': MeshPackageLicenseType
  'mesh-package-module': MeshPackageModuleType
  'mesh-package-user': MeshPackageUserType
  'mesh-path': MeshPathType
  'mesh-placeholder': MeshPlaceholderType
  'mesh-pointer': MeshPointerType
  'mesh-signed-integer': MeshSignedIntegerType
  'mesh-string': MeshStringType
  'mesh-string-array': MeshStringArrayType
  'mesh-template': MeshTemplateType
  'mesh-term': MeshTermType
  'mesh-test': MeshTestType
  'mesh-text': MeshTextType
  'mesh-unsigned-integer': MeshUnsignedIntegerType
  'mesh-variable': MeshVariableType
}

export type MeshModuleBaseType = SiteModuleBaseType & {
  public: Record<string, Record<string, unknown>>
}

export type MeshModuleGatherType = SiteModuleBaseType &
  MeshBaseType & {
    children: Array<MeshType<Mesh>>
    scope: SiteStepScopeType
    type: Mesh.ModuleGather
  }

export type MeshModuleType = MeshCodeModuleType | MeshPackageModuleType

export type MeshNativeClassInterfacePointerType =
  MeshPointerType<Mesh.NativeClassInterface>

export type MeshNativeClassInterfaceType = MeshBaseType & {
  name: MeshTermLinkPointerType
  type: Mesh.NativeClassInterface
}

export type MeshOutputPointerType = MeshPointerType<Mesh.Output>

export type MeshOutputType = MeshBaseType & {
  definedType?: MeshClassReferencePointerType
  inferredType?: MeshClassReferencePointerType
  type: Mesh.Output
}

export type MeshPackageLicenseType = MeshBaseType & {
  name: string
  type: Mesh.PackageLicense
}

export type MeshPackageModuleType = MeshModuleBaseType &
  MeshBaseType & {
    deck: MeshPackageType
    type: Mesh.PackageModule
  }

export type MeshPackageType = MeshBaseType & {
  bear?: string
  face: Array<MeshPackageUserType>
  host: string
  mark: string
  name: string
  read?: string
  site?: string
  term: Array<MeshPackageLicenseType>
  test?: string
  type: Mesh.Package
}

export type MeshPackageUserType = MeshBaseType & {
  email?: string
  name?: string
  type: Mesh.PackageUser
}

export type MeshParseType = {
  directory: string
  link: LinkTreeType
  path: string
  text: string
  textByLine: Array<string>
}

export type MeshPathLinkPointerType =
  | MeshPointerType<Mesh.Path>
  | MeshPointerType<Mesh.StringArray>
  | MeshPointerType<Mesh.Term>
  | MeshPointerType<Mesh.String>

export type MeshPathPointerType = MeshPointerType<Mesh.Path>

export type MeshPathType = MeshBaseType & {
  type: Mesh.Path
  value: LinkPathType
}

export type MeshPlaceholderType = MeshBaseType & {
  name: string
  type: Mesh.Placeholder
  value: MeshType<Mesh>
}

/**
 * This is a reference which can be replaced.
 */
export type MeshPointerType<T extends Mesh = Mesh> = MeshBaseType & {
  type: Mesh.Pointer
  value: MeshType<T>
}

export type MeshSignedIntegerType = MeshBaseType & {
  type: Mesh.SignedInteger
  value: number
}

export type MeshStepPointerType = MeshPointerType<
  Mesh.Call | Mesh.Assertion | Mesh.Constant
>

export type MeshStringArrayType = MeshBaseType & {
  type: Mesh.StringArray
  value: Array<string>
}

export type MeshStringType = MeshBaseType & {
  type: Mesh.String
  value: string
}

export type MeshTemplateType = MeshBaseType & {
  hidden: MeshBooleanLinkPointerType
  inputs: Record<string, MeshInputPointerType>
  name: MeshTermLinkPointerType
  tree: Array<LinkNodeType>
  type: Mesh.Template
}

export type MeshTermLinkPointerType = MeshPointerType<
  Mesh.Term | Mesh.String
>

export type MeshTermType = MeshBaseType & {
  type: Mesh.Term
  value: LinkTermType
}

export type MeshTestType = MeshBaseType & {
  functions: Array<MeshStepPointerType>
  inputs: Array<MeshInputPointerType>
  name: MeshTermLinkPointerType
  steps: Array<MeshStepPointerType>
  type: Mesh.Test
}

export type MeshTextLinkPointerType =
  | MeshPointerType<Mesh.String>
  | MeshPointerType<Mesh.Text>

export type MeshTextPointerType = MeshPointerType<Mesh.Text>

export type MeshTextType = MeshBaseType & {
  type: Mesh.Text
  value: LinkTextType
}

export type MeshType<T extends Mesh> = MeshMappingType[T]

export type MeshUnsignedIntegerType = MeshBaseType & {
  type: Mesh.UnsignedInteger
  value: number
}

export type MeshValuePointerType =
  | MeshPointerType<Mesh.String>
  | MeshPointerType<Mesh.UnsignedInteger>
  | MeshPointerType<Mesh.SignedInteger>
  | MeshPointerType<Mesh.Decimal>
  | MeshPointerType<Mesh.Boolean>

export type MeshVariablePointerType = MeshPointerType<Mesh.Variable>

export type MeshVariableType = MeshBaseType & {
  isDereference: MeshBooleanLinkPointerType
  isMutable: MeshBooleanLinkPointerType
  isOwner: MeshBooleanPointerType
  isReference: MeshBooleanLinkPointerType
  lifetime?: string
  path: MeshPathLinkPointerType
  type: Mesh.Variable
}
