export var Mesh;
(function (Mesh) {
    Mesh["Array"] = "mesh-array";
    Mesh["Assertion"] = "mesh-assertion";
    Mesh["Bind"] = "mesh-bind";
    Mesh["Boolean"] = "mesh-boolean";
    Mesh["Call"] = "mesh-call";
    Mesh["Callback"] = "mesh-callback";
    Mesh["Class"] = "mesh-class";
    Mesh["ClassInput"] = "mesh-class-input";
    Mesh["ClassInterface"] = "mesh-class-interface";
    Mesh["ClassInterfaceImplementation"] = "mesh-class-interface-implementation";
    Mesh["ClassReference"] = "mesh-class-reference";
    Mesh["CodeModule"] = "mesh-code-module";
    Mesh["Component"] = "mesh-component";
    Mesh["Constant"] = "mesh-constant";
    Mesh["Decimal"] = "mesh-decimal";
    Mesh["Element"] = "mesh-element";
    Mesh["Export"] = "mesh-export";
    Mesh["Function"] = "mesh-function";
    Mesh["Gather"] = "mesh-gather";
    Mesh["HideExportVariable"] = "mesh-hide-export-variable";
    Mesh["Hook"] = "mesh-hook";
    Mesh["Import"] = "mesh-import";
    Mesh["ImportVariable"] = "mesh-import-variable";
    Mesh["ImportVariableRename"] = "mesh-import-variable-rename";
    Mesh["Inject"] = "mesh-inject";
    Mesh["Input"] = "mesh-input";
    Mesh["Link"] = "mesh-link";
    Mesh["Map"] = "mesh-map";
    Mesh["NativeClassInterface"] = "mesh-native-class-interface";
    Mesh["Output"] = "mesh-output";
    Mesh["Package"] = "mesh-package";
    Mesh["PackageLicense"] = "mesh-package-license";
    Mesh["PackageModule"] = "mesh-package-module";
    Mesh["PackageUser"] = "mesh-package-user";
    Mesh["Path"] = "mesh-path";
    Mesh["Placeholder"] = "mesh-placeholder";
    Mesh["SignedInteger"] = "mesh-signed-integer";
    Mesh["String"] = "mesh-string";
    Mesh["StringArray"] = "mesh-string-array";
    Mesh["Template"] = "mesh-template";
    Mesh["Term"] = "mesh-term";
    Mesh["Test"] = "mesh-test";
    Mesh["Text"] = "mesh-text";
    Mesh["UnsignedInteger"] = "mesh-unsigned-integer";
    Mesh["Value"] = "mesh-value";
    Mesh["Variable"] = "mesh-variable";
})(Mesh || (Mesh = {}));
// eslint-disable-next-line sort-exports/sort-exports
export const MESH_TERM_LINK_TYPE = [Mesh.Term, Mesh.String];
// eslint-disable-next-line sort-exports/sort-exports
export const MESH_PATH_LINK_TYPE = [
    Mesh.Term,
    Mesh.String,
    Mesh.Path,
    Mesh.StringArray,
];
// eslint-disable-next-line sort-exports/sort-exports
export const MESH_BOOLEAN_LINK_TYPE = [
    Mesh.Boolean,
    Mesh.String,
    Mesh.Term,
    Mesh.StringArray,
    Mesh.Path,
];
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
    Mesh.Hook,
    Mesh.Element,
    Mesh.Export,
    Mesh.Function,
    Mesh.SignedInteger,
    Mesh.Decimal,
    Mesh.Array,
    Mesh.Map,
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
];
//# sourceMappingURL=mesh.js.map