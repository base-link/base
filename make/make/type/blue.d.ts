import { Color, LinkNodeType, LinkPathType, LinkTermType, LinkTextType, Mesh, MeshBaseType, SiteObserverState } from '../..';
export type BlueArrayType<T> = BlueBaseType & {
    type: Mesh.Array;
    value: Array<T>;
};
export type BlueAssertionType = BlueBaseType & {
    type: Mesh.Assertion;
};
export type BlueBaseType = MeshBaseType & {
    attachedAs?: string;
    color: Color.Blue;
    parent?: BlueType;
    state: SiteObserverState;
};
export type BlueBindType = BlueBaseType & {
    bond?: BlueValueType;
    name?: BlueTermLinkType;
    type: Mesh.Bind;
};
export type BlueBooleanLinkType = BlueBooleanType | BluePathType | BlueStringArrayType | BlueTermType | BlueStringType;
export type BlueBooleanType = BlueBaseType & {
    type: Mesh.Boolean;
    value: boolean;
};
export type BlueCallType = BlueBaseType & {
    bind: BlueArrayType<BlueBindType>;
    bond?: BlueFunctionType;
    path?: BluePathLinkType;
    risk?: BlueBooleanLinkType;
    type: Mesh.Call;
    wait?: BlueBooleanLinkType;
};
export type BlueCallbackType = BlueBaseType & {
    functions: BlueArrayType<BlueFunctionType>;
    inputs: BlueArrayType<BlueInputType>;
    name?: BlueTermLinkType;
    steps: BlueArrayType<BlueStepType>;
    type: Mesh.Callback;
};
export type BlueClassInputType = BlueBaseType & {
    definedType?: BlueClassReferenceType;
    inferredType?: BlueClassReferenceType;
    name?: BlueTermLinkType;
    type: Mesh.ClassInput;
};
export type BlueClassInterfaceImplementationType = BlueBaseType & {
    type: Mesh.ClassInterfaceImplementation;
};
export type BlueClassInterfaceType = BlueBaseType & {
    hidden?: BlueBooleanLinkType;
    methods: BlueArrayType<BlueFunctionType>;
    name?: BlueTermLinkType;
    properties: BlueArrayType<BlueInputType>;
    type: Mesh.ClassInterface;
    typeInputs: BlueArrayType<BlueClassInputType>;
};
export type BlueClassReferenceType = BlueBaseType & {
    bind: BlueArrayType<BlueClassReferenceType>;
    bond?: BlueClassType;
    name?: BlueTermLinkType;
    type: Mesh.ClassReference;
};
export type BlueClassType = BlueBaseType & {
    callbacks: BlueArrayType<BlueCallbackType>;
    hidden?: BlueBooleanLinkType;
    interfaces: BlueArrayType<BlueClassInterfaceImplementationType>;
    methods: BlueArrayType<BlueFunctionType>;
    name?: BlueTermLinkType;
    parents: BlueArrayType<BlueClassType>;
    properties: BlueArrayType<BlueInputType>;
    type: Mesh.Class;
    typeInputs: BlueArrayType<BlueClassInputType>;
};
export type BlueCodeModuleType = BlueBaseType & {
    callbacks: BlueArrayType<BlueCallbackType>;
    classInterfaces: BlueArrayType<BlueClassInterfaceType>;
    classes: BlueArrayType<BlueClassType>;
    components: BlueArrayType<BlueComponentType>;
    constants: BlueArrayType<BlueConstantType>;
    exports: BlueArrayType<BlueExportType>;
    functions: BlueArrayType<BlueFunctionType>;
    imports: BlueArrayType<BlueImportType>;
    nativeClassInterfaces: BlueArrayType<BlueNativeClassInterfaceType>;
    public: BlueMapType<{
        classInterfaces: BlueArrayType<BlueClassInterfaceType>;
        classes: BlueArrayType<BlueClassType>;
        components: BlueArrayType<BlueComponentType>;
        constants: BlueArrayType<BlueConstantType>;
        functions: BlueArrayType<BlueFunctionType>;
        nativeClassInterfaces: BlueArrayType<BlueNativeClassInterfaceType>;
        templates: BlueArrayType<BlueTemplateType>;
        tests: BlueArrayType<BlueTestType>;
    }>;
    templates: BlueArrayType<BlueTemplateType>;
    tests: BlueArrayType<BlueTestType>;
    type: Mesh.CodeModule;
};
export type BlueComponentType = BlueBaseType & {
    type: Mesh.Component;
};
export type BlueConstantType = BlueBaseType & {
    definedType?: BlueClassReferenceType;
    hidden?: BlueBooleanLinkType;
    name?: BlueTermLinkType;
    type: Mesh.Constant;
    value?: BlueValueType | Array<BlueConstantType>;
};
export type BlueDecimalType = BlueBaseType & {
    type: Mesh.Decimal;
};
export type BlueElementType = BlueBaseType & {
    type: Mesh.Element;
};
export type BlueExportType = BlueBaseType & {
    absolutePath?: BlueTextLinkType;
    hides: BlueArrayType<BlueHideExportVariableType>;
    type: Mesh.Export;
};
export type BlueFunctionType = BlueBaseType & {
    baseType?: BlueFunctionType;
    definedOutputType?: BlueClassReferenceType;
    functions: BlueArrayType<BlueFunctionType>;
    hidden?: BlueBooleanLinkType;
    inferredOutputType?: BlueClassReferenceType;
    inputs: BlueArrayType<BlueInputType>;
    name?: BlueTermLinkType;
    risk?: BlueBooleanLinkType;
    steps: BlueArrayType<BlueStepType>;
    type: Mesh.Function;
    typeInputs: BlueArrayType<BlueClassInputType>;
    wait?: BlueBooleanLinkType;
};
export type BlueGatherType = BlueBaseType & {
    type: Mesh.Gather;
};
export type BlueHideExportVariableType = BlueBaseType & {
    name?: BlueTermLinkType;
    scopeName?: BlueTermLinkType;
    type: Mesh.HideExportVariable;
};
export type BlueHookType = BlueBaseType & {
    content?: unknown;
    name?: BlueTermLinkType;
    type: Mesh.Hook;
};
export type BlueImportType = BlueBaseType & {
    absolutePath?: BlueTextLinkType;
    imports: BlueArrayType<BlueImportType>;
    type: Mesh.Import;
    variables: BlueArrayType<BlueImportVariableType>;
};
export type BlueImportVariableRenameType = BlueBaseType & {
    type: Mesh.ImportVariableRename;
};
export type BlueImportVariableType = BlueBaseType & {
    name?: BlueTermLinkType;
    rename?: BlueImportVariableRenameType;
    scopeName?: BlueTermLinkType;
    type: Mesh.ImportVariable;
};
export type BlueInjectType = BlueBaseType & {
    bind: BlueArrayType<BlueBindType>;
    name?: BlueTermLinkType;
    type: Mesh.Inject;
};
export type BlueInputType = BlueBaseType & {
    type: Mesh.Input;
};
export type BlueLinkType = BlueBaseType & {
    type: Mesh.Link;
    value: LinkNodeType;
};
export type BlueMapType<T extends Record<string, BlueType | BlueArrayType<BlueType> | BlueMapType> = Record<string, BlueType | BlueArrayType<BlueType>>> = BlueBaseType & {
    type: Mesh.Map;
    value: T;
};
export type BlueMappingType = {
    'mesh-array': BlueArrayType<BlueType>;
    'mesh-assertion': BlueAssertionType;
    'mesh-bind': BlueBindType;
    'mesh-boolean': BlueBooleanType;
    'mesh-call': BlueCallType;
    'mesh-callback': BlueCallbackType;
    'mesh-class': BlueClassType;
    'mesh-class-input': BlueClassInputType;
    'mesh-class-interface': BlueClassInterfaceType;
    'mesh-class-interface-implementation': BlueClassInterfaceImplementationType;
    'mesh-class-reference': BlueClassReferenceType;
    'mesh-code-module': BlueCodeModuleType;
    'mesh-component': BlueComponentType;
    'mesh-constant': BlueConstantType;
    'mesh-decimal': BlueDecimalType;
    'mesh-element': BlueElementType;
    'mesh-export': BlueExportType;
    'mesh-function': BlueFunctionType;
    'mesh-gather': BlueGatherType;
    'mesh-hide-export-variable': BlueHideExportVariableType;
    'mesh-hook': BlueHookType;
    'mesh-import': BlueImportType;
    'mesh-import-variable': BlueImportVariableType;
    'mesh-import-variable-rename': BlueImportVariableRenameType;
    'mesh-inject': BlueInjectType;
    'mesh-input': BlueInputType;
    'mesh-link': BlueLinkType;
    'mesh-map': BlueMapType<Record<string, BlueType | BlueArrayType<BlueType> | BlueMapType>>;
    'mesh-native-class-interface': BlueNativeClassInterfaceType;
    'mesh-output': BlueOutputType;
    'mesh-package': BluePackageType;
    'mesh-package-license': BluePackageLicenseType;
    'mesh-package-module': BluePackageModuleType;
    'mesh-package-user': BluePackageUserType;
    'mesh-path': BluePathType;
    'mesh-placeholder': BluePlaceholderType;
    'mesh-signed-integer': BlueSignedIntegerType;
    'mesh-string': BlueStringType;
    'mesh-string-array': BlueStringArrayType;
    'mesh-template': BlueTemplateType;
    'mesh-term': BlueTermType;
    'mesh-test': BlueTestType;
    'mesh-text': BlueTextType;
    'mesh-unsigned-integer': BlueUnsignedIntegerType;
    'mesh-value': BlueValueType;
    'mesh-variable': BlueVariableType;
};
export type BlueNativeClassInterfaceType = BlueBaseType & {
    type: Mesh.NativeClassInterface;
};
export type BlueNodeType<T extends Mesh> = BlueMappingType[T];
export type BlueOutputType = BlueBaseType & {
    type: Mesh.Output;
};
export type BluePackageLicenseType = BlueBaseType & {
    type: Mesh.PackageLicense;
};
export type BluePackageModuleType = BlueBaseType & {
    deck?: BluePackageType;
    type: Mesh.PackageModule;
};
export type BluePackageType = BlueBaseType & {
    bear?: BlueTextLinkType;
    face: BlueArrayType<BluePackageUserType>;
    host?: BlueTextLinkType;
    mark?: BlueTextLinkType;
    name?: BlueTextLinkType;
    read?: BlueTextLinkType;
    site?: BlueTextLinkType;
    term: BlueArrayType<BluePackageLicenseType>;
    test?: BlueTextLinkType;
    type: Mesh.Package;
};
export type BluePackageUserType = BlueBaseType & {
    type: Mesh.PackageUser;
};
export type BluePathLinkType = BluePathType | BlueStringArrayType | BlueTermType | BlueStringType;
export type BluePathType = BlueBaseType & {
    type: Mesh.Path;
    value: LinkPathType;
};
export type BluePlaceholderType = BlueBaseType & {
    type: Mesh.Placeholder;
};
export type BluePossibleType = BlueType | BlueArrayType<BlueType> | BlueMapType;
export type BlueSignedIntegerType = BlueBaseType & {
    type: Mesh.SignedInteger;
};
export type BlueStepType = BlueCallType | BlueAssertionType;
export type BlueStringArrayType = BlueBaseType & {
    type: Mesh.StringArray;
    value: Array<string>;
};
export type BlueStringType = BlueBaseType & {
    type: Mesh.String;
    value: string;
};
export type BlueTemplateType = BlueBaseType & {
    hidden?: BlueBooleanLinkType;
    hooks: BlueArrayType<BlueHookType>;
    inputs: BlueArrayType<BlueInputType>;
    name?: BlueTermLinkType;
    type: Mesh.Template;
};
export type BlueTermLinkType = BlueTermType | BlueStringType;
export type BlueTermType = BlueBaseType & {
    type: Mesh.Term;
    value: LinkTermType;
};
export type BlueTestType = BlueBaseType & {
    type: Mesh.Test;
};
export type BlueTextLinkType = BlueTextType | BlueStringType;
export type BlueTextType = BlueBaseType & {
    type: Mesh.Text;
    value: LinkTextType;
};
export type BlueType = BlueAssertionType | BlueBindType | BlueBooleanType | BlueCallType | BlueCallbackType | BlueClassInputType | BlueClassInterfaceImplementationType | BlueClassInterfaceType | BlueClassReferenceType | BlueClassType | BlueComponentType | BlueConstantType | BlueDecimalType | BlueElementType | BlueExportType | BlueFunctionType | BlueGatherType | BlueHideExportVariableType | BlueImportType | BlueImportVariableRenameType | BlueImportVariableType | BlueInjectType | BlueInputType | BlueNativeClassInterfaceType | BlueOutputType | BluePackageLicenseType | BluePackageType | BluePackageUserType | BluePathType | BluePlaceholderType | BlueSignedIntegerType | BlueStringArrayType | BlueStringType | BlueTemplateType | BlueTermType | BlueTestType | BlueTextType | BlueUnsignedIntegerType | BlueVariableType | BlueCodeModuleType | BluePackageModuleType | BlueHookType | BlueLinkType;
export type BlueUnsignedIntegerType = BlueBaseType & {
    type: Mesh.UnsignedInteger;
};
export type BlueValueType = BlueStringType | BlueUnsignedIntegerType | BlueSignedIntegerType | BlueDecimalType | BlueBooleanType;
export type BlueVariableType = BlueBaseType & {
    isDereference: BlueBooleanLinkType;
    isMutable: BlueBooleanLinkType;
    isOwner: BlueBooleanType;
    isReference: BlueBooleanLinkType;
    lifetime?: string;
    path: BluePathLinkType;
    type: Mesh.Variable;
};
