import { SiteStepScopeType } from './site'

export enum Mesh {
  Assertion = 'mesh-assertion',
  Bind = 'mesh-bind',
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
  NativeClassInterface = 'mesh-native-class-interface',
  Output = 'mesh-output',
  Package = 'mesh-package',
  PackageLicense = 'mesh-package-license',
  PackageModule = 'mesh-package-module',
  PackageUser = 'mesh-package-user',
  Path = 'mesh-path',
  Placeholder = 'mesh-placeholder',
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
  Mesh.HideExportVariable,
  Mesh.Text,
]

export type MeshBaseType = {
  scope?: SiteStepScopeType
}
