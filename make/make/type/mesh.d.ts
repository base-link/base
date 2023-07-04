import { SiteStepScopeType } from './site';
export declare enum Mesh {
    Array = "mesh-array",
    Assertion = "mesh-assertion",
    Bind = "mesh-bind",
    Boolean = "mesh-boolean",
    Call = "mesh-call",
    Callback = "mesh-callback",
    Class = "mesh-class",
    ClassInput = "mesh-class-input",
    ClassInterface = "mesh-class-interface",
    ClassInterfaceImplementation = "mesh-class-interface-implementation",
    ClassReference = "mesh-class-reference",
    CodeModule = "mesh-code-module",
    Component = "mesh-component",
    Constant = "mesh-constant",
    Decimal = "mesh-decimal",
    Element = "mesh-element",
    Export = "mesh-export",
    Function = "mesh-function",
    Gather = "mesh-gather",
    HideExportVariable = "mesh-hide-export-variable",
    Hook = "mesh-hook",
    Import = "mesh-import",
    ImportVariable = "mesh-import-variable",
    ImportVariableRename = "mesh-import-variable-rename",
    Inject = "mesh-inject",
    Input = "mesh-input",
    Link = "mesh-link",
    Map = "mesh-map",
    NativeClassInterface = "mesh-native-class-interface",
    Output = "mesh-output",
    Package = "mesh-package",
    PackageLicense = "mesh-package-license",
    PackageModule = "mesh-package-module",
    PackageUser = "mesh-package-user",
    Path = "mesh-path",
    Placeholder = "mesh-placeholder",
    SignedInteger = "mesh-signed-integer",
    String = "mesh-string",
    StringArray = "mesh-string-array",
    Template = "mesh-template",
    Term = "mesh-term",
    Test = "mesh-test",
    Text = "mesh-text",
    UnsignedInteger = "mesh-unsigned-integer",
    Value = "mesh-value",
    Variable = "mesh-variable"
}
export declare const MESH_TERM_LINK_TYPE: Mesh[];
export declare const MESH_PATH_LINK_TYPE: Mesh[];
export declare const MESH_BOOLEAN_LINK_TYPE: Mesh[];
export declare const MESH_TYPE: Mesh[];
export type MeshBaseType = {
    scope?: SiteStepScopeType;
};
