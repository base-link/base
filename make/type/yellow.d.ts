import { Color, GreenBindType, GreenBooleanLinkType, GreenBooleanType, GreenCallbackType, GreenClassInputType, GreenClassInterfaceImplementationType, GreenClassInterfaceType, GreenClassReferenceType, GreenClassType, GreenComponentType, GreenConstantType, GreenElementType, GreenExportType, GreenFunctionType, GreenHideExportVariableType, GreenImportType, GreenImportVariableRenameType, GreenImportVariableType, GreenInputType, GreenNativeClassInterfaceType, GreenPackageLicenseType, GreenPackageType, GreenPackageUserType, GreenPathLinkType, GreenStepType, GreenTemplateType, GreenTermLinkType, GreenTestType, GreenTextLinkType, GreenValueType, GreenVariableType, LinkNodeType, LinkPathType, LinkTermType, LinkTextType, LinkTreeType, Mesh, MeshBaseType, SiteModuleBaseType } from '../index.js';
export type YellowAssertionType = YellowBaseType & {
    bind: Array<GreenBindType | GreenValueType | GreenVariableType>;
    path: GreenPathLinkType;
    type: Mesh.Assertion;
};
export type YellowBaseType = MeshBaseType & {
    color: Color.Yellow;
};
export type YellowBindType = YellowBaseType & {
    bond?: GreenValueType;
    name?: GreenTermLinkType;
    type: Mesh.Bind;
};
export type YellowBooleanLinkType = YellowBooleanType | YellowPathType | YellowStringArrayType | YellowTermType | YellowStringType;
export type YellowBooleanType = YellowBaseType & {
    type: Mesh.Boolean;
    value: boolean;
};
export type YellowCallType = YellowBaseType & {
    bind: Array<GreenBindType>;
    bond?: GreenFunctionType;
    path: GreenPathLinkType;
    risk: GreenBooleanLinkType;
    type: Mesh.Call;
    wait: GreenBooleanLinkType;
};
export type YellowCallbackType = YellowBaseType & {
    functions: Array<GreenFunctionType>;
    inputs: Array<GreenInputType>;
    name: GreenTermLinkType;
    steps: Array<GreenStepType>;
    type: Mesh.Callback;
};
export type YellowClassInputType = YellowBaseType & {
    base?: GreenClassReferenceType;
    name: GreenTermLinkType;
    sourceType?: GreenClassReferenceType;
    type: Mesh.ClassInput;
};
export type YellowClassInterfaceImplementationType = YellowBaseType & {
    methods: Array<GreenFunctionType>;
    name: GreenTermLinkType;
    properties: Array<GreenInputType>;
    type: Mesh.ClassInterfaceImplementation;
};
export type YellowClassInterfaceType = YellowBaseType & {
    hidden: GreenBooleanLinkType;
    methods: Array<GreenFunctionType>;
    name: GreenTermLinkType;
    properties: Array<GreenInputType>;
    type: Mesh.ClassInterface;
};
export type YellowClassReferenceType = YellowBaseType & {
    bind: Array<GreenClassReferenceType>;
    bond?: GreenClassType;
    name?: GreenTermLinkType;
    type: Mesh.ClassReference;
};
export type YellowClassType = YellowBaseType & {
    callbacks: Array<GreenCallbackType>;
    hidden: GreenBooleanLinkType;
    interfaces: Array<GreenClassInterfaceImplementationType>;
    methods: Array<GreenFunctionType>;
    name: GreenTermLinkType;
    parents: Array<GreenClassType>;
    properties: Array<GreenInputType>;
    type: Mesh.Class;
};
export type YellowCodeModuleType = SiteModuleBaseType & YellowBaseType & {
    callbacks: Array<GreenCallbackType>;
    classInterfaces: Array<GreenClassInterfaceType>;
    classes: Array<GreenClassType>;
    components: Array<GreenComponentType>;
    constants: Array<GreenConstantType>;
    exports: Array<GreenExportType>;
    functions: Array<GreenFunctionType>;
    imports: Array<GreenImportType>;
    nativeClassInterfaces: Array<GreenNativeClassInterfaceType>;
    public: {
        classInterfaces: Array<GreenClassInterfaceType>;
        classes: Array<GreenClassType>;
        components: Array<GreenComponentType>;
        constants: Array<GreenConstantType>;
        functions: Array<GreenFunctionType>;
        nativeClassInterfaces: Array<GreenNativeClassInterfaceType>;
        templates: Array<GreenTemplateType>;
        tests: Array<GreenTestType>;
    };
    templates: Array<GreenTemplateType>;
    tests: Array<GreenTestType>;
    type: Mesh.CodeModule;
};
export type YellowComponentType = YellowBaseType & {
    element: Array<GreenElementType>;
    name: GreenTermLinkType;
    type: Mesh.Component;
};
export type YellowConstantType = YellowBaseType & {
    hidden: GreenBooleanLinkType;
    name: GreenTermLinkType;
    type: Mesh.Constant;
    value: GreenValueType | Array<GreenConstantType>;
};
export type YellowDecimalType = YellowBaseType & {
    type: Mesh.Decimal;
    value: number;
};
export type YellowElementType = YellowBaseType & {
    bond?: GreenComponentType;
    name: GreenTermLinkType;
    type: Mesh.Element;
};
export type YellowExportType = YellowBaseType & {
    absolutePath?: GreenTextLinkType;
    hides: Array<GreenHideExportVariableType>;
    type: Mesh.Export;
};
export type YellowFunctionType = YellowBaseType & {
    baseType?: GreenFunctionType;
    definedOutputType?: GreenClassReferenceType;
    functions: Array<GreenFunctionType>;
    hidden: GreenBooleanLinkType;
    inferredOutputType?: GreenClassReferenceType;
    inputs: Array<GreenInputType>;
    name: GreenTermLinkType;
    risk: GreenBooleanLinkType;
    steps: Array<GreenStepType>;
    type: Mesh.Function;
    typeInputs: Array<GreenClassInputType>;
    wait: GreenBooleanLinkType;
};
export type YellowHideExportVariableType = YellowBaseType & {
    name: GreenTermLinkType;
    scopeName: GreenTermLinkType;
    type: Mesh.HideExportVariable;
};
export type YellowImportType = YellowBaseType & {
    absolutePath: GreenTextLinkType;
    import: Array<GreenImportType>;
    type: Mesh.Import;
    variable: Array<GreenImportVariableType>;
};
export type YellowImportVariableRenameType = YellowBaseType & {
    name: GreenTermLinkType;
    type: Mesh.ImportVariableRename;
};
export type YellowImportVariableType = YellowBaseType & {
    name: GreenTermLinkType;
    rename: GreenImportVariableRenameType;
    scopeName: GreenTermLinkType;
    type: Mesh.ImportVariable;
};
export type YellowInjectType = YellowBaseType & {
    bind: Array<GreenBindType>;
    name: GreenTermLinkType;
    type: Mesh.Inject;
};
export type YellowInputType = YellowBaseType & {
    definedType?: GreenClassReferenceType;
    inferredType?: GreenClassReferenceType;
    name: GreenTermLinkType;
    type: Mesh.Input;
};
export type YellowModuleBaseType = SiteModuleBaseType & {
    public: Record<string, Record<string, unknown>>;
};
export type YellowNativeClassInterfaceType = YellowBaseType & {
    name: GreenTermLinkType;
    type: Mesh.NativeClassInterface;
};
export type YellowOutputType = YellowBaseType & {
    definedType?: GreenClassReferenceType;
    inferredType?: GreenClassReferenceType;
    type: Mesh.Output;
};
export type YellowPackageLicenseType = YellowBaseType & {
    name: string;
    type: Mesh.PackageLicense;
};
export type YellowPackageModuleType = SiteModuleBaseType & YellowBaseType & {
    deck: GreenPackageType;
    type: Mesh.PackageModule;
};
export type YellowPackageType = YellowBaseType & {
    bear?: string;
    face: Array<GreenPackageUserType>;
    host: string;
    mark: string;
    name: string;
    read?: string;
    site?: string;
    term: Array<GreenPackageLicenseType>;
    test?: string;
    type: Mesh.Package;
};
export type YellowPackageUserType = YellowBaseType & {
    email?: string;
    name?: string;
    type: Mesh.PackageUser;
};
export type YellowParseType = {
    directory: string;
    link: LinkTreeType;
    path: string;
    text: string;
    textByLine: Array<string>;
};
export type YellowPathLinkType = YellowPathType | YellowStringArrayType | YellowTermType | YellowStringType;
export type YellowPathType = YellowBaseType & {
    type: Mesh.Path;
    value: LinkPathType;
};
export type YellowSignedIntegerType = YellowBaseType & {
    type: Mesh.SignedInteger;
    value: number;
};
export type YellowStepType = YellowCallType | YellowAssertionType;
export type YellowStringArrayType = YellowBaseType & {
    type: Mesh.StringArray;
    value: Array<string>;
};
export type YellowStringType = YellowBaseType & {
    type: Mesh.String;
    value: string;
};
export type YellowTemplateType = YellowBaseType & {
    hidden: GreenBooleanLinkType;
    inputs: Record<string, GreenInputType>;
    name: GreenTermLinkType;
    tree: Array<LinkNodeType>;
    type: Mesh.Template;
};
export type YellowTermLinkType = YellowTermType | YellowStringType;
export type YellowTermType = YellowBaseType & {
    type: Mesh.Term;
    value: LinkTermType;
};
export type YellowTestType = YellowBaseType & {
    functions: Array<GreenStepType>;
    inputs: Array<GreenInputType>;
    name: GreenTermLinkType;
    steps: Array<GreenStepType>;
    type: Mesh.Test;
};
export type YellowTextLinkType = YellowTextType | YellowStringType;
export type YellowTextType = YellowBaseType & {
    type: Mesh.Text;
    value: LinkTextType;
};
export type YellowType = YellowAssertionType | YellowBindType | YellowBooleanType | YellowCallType | YellowCallbackType | YellowClassInputType | YellowClassInterfaceImplementationType | YellowClassInterfaceType | YellowClassReferenceType | YellowClassType | YellowComponentType | YellowConstantType | YellowDecimalType | YellowElementType | YellowExportType | YellowFunctionType | YellowHideExportVariableType | YellowImportType | YellowImportVariableRenameType | YellowImportVariableType | YellowInjectType | YellowInputType | YellowNativeClassInterfaceType | YellowOutputType | YellowPackageLicenseType | YellowPackageType | YellowPackageUserType | YellowPathType | YellowSignedIntegerType | YellowStringArrayType | YellowStringType | YellowTemplateType | YellowTermType | YellowTestType | YellowTextType | YellowUnsignedIntegerType | YellowVariableType | YellowCodeModuleType;
export type YellowUnsignedIntegerType = YellowBaseType & {
    type: Mesh.UnsignedInteger;
    value: number;
};
export type YellowValueType = YellowStringType | YellowUnsignedIntegerType | YellowSignedIntegerType | YellowDecimalType | YellowBooleanType;
export type YellowVariableType = YellowBaseType & {
    isDereference: GreenBooleanLinkType;
    isMutable: GreenBooleanLinkType;
    isOwner: GreenBooleanType;
    isReference: GreenBooleanLinkType;
    lifetime?: string;
    path: GreenPathLinkType;
    type: Mesh.Variable;
};
