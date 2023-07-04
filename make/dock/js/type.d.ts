export declare enum DockJS {
    ArrayExpression = "js-array-expression",
    ArrayPattern = "js-array-pattern",
    ArrowFunctionExpression = "js-arrow-function-expression",
    AssignmentExpression = "js-assignment-expression",
    AssignmentPattern = "js-assignment-pattern",
    AssignmentProperty = "js-assignment-property",
    AwaitExpression = "js-await-expression",
    BigIntLiteral = "js-big-int-literal",
    BinaryExpression = "js-binary-expression",
    BlockStatement = "js-block-statement",
    BreakStatement = "js-break-statement",
    CallExpression = "js-call-expression",
    CatchClause = "js-catch-clause",
    Class = "js-class",
    ClassBody = "js-class-body",
    ClassDeclaration = "js-class-declaration",
    ClassExpression = "js-class-expression",
    ConditionalExpression = "js-conditional-expression",
    ContinueStatement = "js-continue-statement",
    DebuggerStatement = "js-debugger-statement",
    Declaration = "js-declaration",
    Directive = "js-directive",
    DoWhileStatement = "js-do-while-statement",
    EmptyStatement = "js-empty-statement",
    ExportAllDeclaration = "js-export-all-declaration",
    ExportDefaultDeclaration = "js-export-default-declaration",
    ExportNamedDeclaration = "js-export-named-declaration",
    ExportSpecifier = "js-export-specifier",
    Expression = "js-expression",
    ExpressionStatement = "js-expression-statement",
    ForInStatement = "js-for-in-statement",
    ForOfStatement = "js-for-of-statement",
    ForStatement = "js-for-statement",
    Function = "js-function",
    FunctionBody = "js-function-body",
    FunctionDeclaration = "js-function-declaration",
    FunctionExpression = "js-function-expression",
    Identifier = "js-identifier",
    IfStatement = "js-if-statement",
    ImportDeclaration = "js-import-declaration",
    ImportDefaultSpecifier = "js-import-default-specifier",
    ImportExpression = "js-import-expression",
    ImportNamespaceSpecifier = "js-import-namespace-specifier",
    ImportSpecifier = "js-import-specifier",
    LabeledStatement = "js-labeled-statement",
    Literal = "js-literal",
    LogicalExpression = "js-logical-expression",
    MemberExpression = "js-member-expression",
    MetaProperty = "js-meta-property",
    MethodDefinition = "js-method-definition",
    ModuleDeclaration = "js-module-declaration",
    ModuleSpecifier = "js-module-specifier",
    NewExpression = "js-new-expression",
    Node = "js-node",
    ObjectExpression = "js-object-expression",
    ObjectPattern = "js-object-pattern",
    Pattern = "js-pattern",
    Program = "js-program",
    Property = "js-property",
    RestElement = "js-rest-element",
    ReturnStatement = "js-return-statement",
    SequenceExpression = "js-sequence-expression",
    SpreadElement = "js-spread-element",
    Statement = "js-statement",
    Super = "js-super",
    SwitchCase = "js-switch-case",
    SwitchStatement = "js-switch-statement",
    TaggedTemplateExpression = "js-tagged-template-expression",
    TemplateElement = "js-template-element",
    TemplateLiteral = "js-template-literal",
    ThisExpression = "js-this-expression",
    ThrowStatement = "js-throw-statement",
    TryStatement = "js-try-statement",
    UnaryExpression = "js-unary-expression",
    UpdateExpression = "js-update-expression",
    VariableDeclaration = "js-variable-declaration",
    VariableDeclarator = "js-variable-declarator",
    WhileStatement = "js-while-statement",
    WithStatement = "js-with-statement",
    YieldExpression = "js-yield-expression"
}
export type DockJSArrayExpressionTokenType = DockJSExpressionTokenType & {
    elements: Array<DockJSExpressionTokenType | DockJSSpreadElementTokenType | null>;
    type: DockJS.ArrayExpression;
};
export type DockJSArrayPatternTokenType = DockJSPatternTokenType & {
    elements: Array<DockJSPatternTokenType | null>;
    type: DockJS.ArrayPattern;
};
export type DockJSArrowFunctionExpressionTokenType = DockJSFunctionTokenType & DockJSExpressionTokenType & {
    body: DockJSFunctionBodyTokenType | DockJSExpressionTokenType;
    expression: boolean;
    type: DockJS.ArrowFunctionExpression;
};
export type DockJSAssignmentExpressionTokenType = DockJSExpressionTokenType & {
    left: DockJSPatternTokenType | DockJSExpressionTokenType;
    operator: string;
    right: DockJSExpressionTokenType;
    type: DockJS.AssignmentExpression;
};
export type DockJSAssignmentPatternTokenType = DockJSPatternTokenType & {
    left: DockJSPatternTokenType;
    right: DockJSExpressionTokenType;
    type: DockJS.AssignmentPattern;
};
export type DockJSAssignmentPropertyTokenType = {
    type: DockJS.AssignmentProperty;
};
export type DockJSAwaitExpressionTokenType = DockJSExpressionTokenType & {
    argument: DockJSExpressionTokenType;
    type: DockJS.AwaitExpression;
};
export type DockJSBigIntLiteralTokenType = DockJSLiteralTokenType & {
    bigint: string;
    type: DockJS.BigIntLiteral;
};
export type DockJSBinaryExpressionTokenType = DockJSExpressionTokenType & {
    left: DockJSExpressionTokenType;
    operator: string;
    right: DockJSExpressionTokenType;
    type: DockJS.BinaryExpression;
};
export type DockJSBlockStatementTokenType = DockJSStatementTokenType & {
    body: Array<DockJSStatementTokenType>;
    type: DockJS.BlockStatement;
};
export type DockJSBreakStatementTokenType = DockJSStatementTokenType & {
    label?: DockJSIdentifierTokenType;
    type: DockJS.BreakStatement;
};
export type DockJSCallExpressionTokenType = DockJSExpressionTokenType & {
    arguments: Array<DockJSExpressionTokenType | DockJSSpreadElementTokenType>;
    callee: DockJSExpressionTokenType | DockJSSuperTokenType;
    type: DockJS.CallExpression;
};
export type DockJSCatchClauseTokenType = DockJSNodeTokenType & {
    body: DockJSBlockStatementTokenType;
    param?: DockJSPatternTokenType;
    type: DockJS.CatchClause;
};
export type DockJSClassBodyTokenType = DockJSNodeTokenType & {
    body: Array<DockJSMethodDefinitionTokenType>;
    type: DockJS.ClassBody;
};
export type DockJSClassDeclarationTokenType = DockJSClassTokenType & DockJSDeclarationTokenType & {
    id: DockJSIdentifierTokenType;
    type: DockJS.ClassDeclaration;
};
export type DockJSClassExpressionTokenType = DockJSClassTokenType & DockJSExpressionTokenType & {
    type: DockJS.ClassExpression;
};
export type DockJSClassTokenType = DockJSNodeTokenType & {
    body: DockJSClassBodyTokenType;
    id?: DockJSIdentifierTokenType;
    superClass?: DockJSExpressionTokenType;
    type: DockJS.Class;
};
export type DockJSConditionalExpressionTokenType = DockJSExpressionTokenType & {
    alternate: DockJSExpressionTokenType;
    consequent: DockJSExpressionTokenType;
    test: DockJSExpressionTokenType;
    type: DockJS.ConditionalExpression;
};
export type DockJSContinueStatementTokenType = DockJSStatementTokenType & {
    label?: DockJSIdentifierTokenType;
    type: DockJS.ContinueStatement;
};
export type DockJSDebuggerStatementTokenType = DockJSStatementTokenType & {
    type: DockJS.DebuggerStatement;
};
export type DockJSDeclarationTokenType = DockJSStatementTokenType & {
    type: DockJS.Declaration;
};
export type DockJSDirectiveTokenType = DockJSNodeTokenType & {
    directive: string;
    expression: DockJSLiteralTokenType;
    type: DockJS.Directive;
};
export type DockJSDoWhileStatementTokenType = DockJSStatementTokenType & {
    body: DockJSStatementTokenType;
    test: DockJSExpressionTokenType;
    type: DockJS.DoWhileStatement;
};
export type DockJSEmptyStatementTokenType = DockJSStatementTokenType & {
    type: DockJS.EmptyStatement;
};
export type DockJSExportAllDeclarationTokenType = DockJSModuleDeclarationTokenType & {
    exported?: DockJSIdentifierTokenType;
    source: DockJSLiteralTokenType;
    type: DockJS.ExportAllDeclaration;
};
export type DockJSExportDefaultDeclarationTokenType = DockJSModuleDeclarationTokenType & {
    declaration: DockJSFunctionDeclarationTokenType | DockJSClassDeclarationTokenType | DockJSExpressionTokenType;
    type: DockJS.ExportDefaultDeclaration;
};
export type DockJSExportNamedDeclarationTokenType = DockJSNodeTokenType & {
    declaration?: DockJSDeclarationTokenType;
    source?: DockJSLiteralTokenType;
    specifiers: Array<DockJSExportSpecifierTokenType>;
    type: DockJS.ExportNamedDeclaration;
};
export type DockJSExportSpecifierTokenType = {
    exported: DockJSIdentifierTokenType;
    type: DockJS.ExportSpecifier;
};
export type DockJSExpressionStatementTokenType = DockJSStatementTokenType & {
    expression: DockJSExpressionTokenType;
    type: DockJS.ExpressionStatement;
};
export type DockJSExpressionTokenType = DockJSNodeTokenType & {
    type: DockJS.Expression;
};
export type DockJSForInStatementTokenType = DockJSStatementTokenType & {
    body: DockJSStatementTokenType;
    left: DockJSVariableDeclarationTokenType | DockJSPatternTokenType;
    right: DockJSExpressionTokenType;
    type: DockJS.ForInStatement;
};
export type DockJSForOfStatementTokenType = DockJSStatementTokenType & {
    await: boolean;
    type: DockJS.ForOfStatement;
};
export type DockJSForStatementTokenType = DockJSStatementTokenType & {
    body: DockJSStatementTokenType;
    init?: DockJSVariableDeclarationTokenType | DockJSExpressionTokenType;
    test?: DockJSExpressionTokenType;
    type: DockJS.ForStatement;
    update?: DockJSExpressionTokenType;
};
export type DockJSFunctionBodyTokenType = DockJSBlockStatementTokenType & {
    body: Array<DockJSDirectiveTokenType | DockJSStatementTokenType>;
    type: DockJS.FunctionBody;
};
export type DockJSFunctionDeclarationTokenType = DockJSFunctionTokenType & DockJSDeclarationTokenType & {
    id: DockJSIdentifierTokenType;
    type: DockJS.FunctionDeclaration;
};
export type DockJSFunctionExpressionTokenType = DockJSFunctionTokenType & DockJSExpressionTokenType & {
    type: DockJS.FunctionExpression;
};
export type DockJSFunctionTokenType = DockJSNodeTokenType & {
    async: boolean;
    body: DockJSFunctionBodyTokenType;
    generator: boolean;
    params: Array<DockJSPatternTokenType>;
    type: DockJS.Function;
};
export type DockJSIdentifierTokenType = DockJSExpressionTokenType & DockJSPatternTokenType & {
    name: string;
    type: DockJS.Identifier;
};
export type DockJSIfStatementTokenType = DockJSStatementTokenType & {
    alternate?: DockJSStatementTokenType;
    consequent: DockJSStatementTokenType;
    test: DockJSExpressionTokenType;
    type: DockJS.IfStatement;
};
export type DockJSImportDeclarationTokenType = DockJSModuleDeclarationTokenType & {
    source: DockJSLiteralTokenType;
    specifiers: Array<DockJSImportSpecifierTokenType | DockJSImportDefaultSpecifierTokenType | DockJSImportNamespaceSpecifierTokenType>;
    type: DockJS.ImportDeclaration;
};
export type DockJSImportDefaultSpecifierTokenType = DockJSModuleSpecifierTokenType & {
    type: DockJS.ImportDefaultSpecifier;
};
export type DockJSImportExpressionTokenType = DockJSExpressionTokenType & {
    source: DockJSExpressionTokenType;
    type: DockJS.ImportExpression;
};
export type DockJSImportNamespaceSpecifierTokenType = DockJSModuleSpecifierTokenType & {
    type: DockJS.ImportNamespaceSpecifier;
};
export type DockJSImportSpecifierTokenType = DockJSModuleSpecifierTokenType & {
    imported: DockJSIdentifierTokenType;
    type: DockJS.ImportSpecifier;
};
export type DockJSLabeledStatementTokenType = DockJSStatementTokenType & {
    body: DockJSStatementTokenType;
    label: DockJSIdentifierTokenType;
    type: DockJS.LabeledStatement;
};
export type DockJSLiteralTokenType = DockJSExpressionTokenType & {
    type: DockJS.Literal;
    value?: string | boolean | number | RegExp;
};
export type DockJSLogicalExpressionTokenType = DockJSExpressionTokenType & {
    left: DockJSExpressionTokenType;
    operator: string;
    right: DockJSExpressionTokenType;
    type: DockJS.LogicalExpression;
};
export type DockJSMemberExpressionTokenType = DockJSExpressionTokenType & {
    computed: boolean;
    object: DockJSExpressionTokenType | DockJSSuperTokenType;
    property: DockJSExpressionTokenType;
    type: DockJS.MemberExpression;
};
export type DockJSMetaPropertyTokenType = DockJSExpressionTokenType & {
    meta: DockJSIdentifierTokenType;
    property: DockJSIdentifierTokenType;
    type: DockJS.MetaProperty;
};
export type DockJSMethodDefinitionTokenType = DockJSNodeTokenType & {
    computed: boolean;
    key: DockJSExpressionTokenType;
    kind: string;
    static: boolean;
    type: DockJS.MethodDefinition;
    value: DockJSFunctionExpressionTokenType;
};
export type DockJSModuleDeclarationTokenType = DockJSNodeTokenType & {
    type: DockJS.ModuleDeclaration;
};
export type DockJSModuleSpecifierTokenType = DockJSNodeTokenType & {
    local: DockJSIdentifierTokenType;
    type: DockJS.ModuleSpecifier;
};
export type DockJSNewExpressionTokenType = DockJSExpressionTokenType & {
    arguments: Array<DockJSExpressionTokenType | DockJSSpreadElementTokenType>;
    callee: DockJSExpressionTokenType;
    type: DockJS.NewExpression;
};
export type DockJSNodeTokenType = {
    type: DockJS.Node;
};
export type DockJSObjectExpressionTokenType = DockJSExpressionTokenType & {
    properties: Array<DockJSPropertyTokenType | DockJSSpreadElementTokenType>;
    type: DockJS.ObjectExpression;
};
export type DockJSObjectPatternTokenType = DockJSPatternTokenType & {
    properties: Array<DockJSAssignmentPropertyTokenType | DockJSRestElementTokenType>;
    type: DockJS.ObjectPattern;
};
export type DockJSPatternTokenType = DockJSNodeTokenType & {
    type: DockJS.Pattern;
};
export type DockJSProgramTokenType = DockJSNodeTokenType & {
    body: Array<DockJSModuleDeclarationTokenType | DockJSStatementTokenType>;
    type: DockJS.Program;
};
export type DockJSPropertyTokenType = DockJSNodeTokenType & {
    computed: boolean;
    key: DockJSExpressionTokenType;
    kind: string;
    method: boolean;
    shorthand: boolean;
    type: DockJS.Property;
    value: DockJSExpressionTokenType;
};
export type DockJSRestElementTokenType = DockJSPatternTokenType & {
    argument: DockJSPatternTokenType;
    type: DockJS.RestElement;
};
export type DockJSReturnStatementTokenType = DockJSStatementTokenType & {
    argument?: DockJSExpressionTokenType;
    type: DockJS.ReturnStatement;
};
export type DockJSSequenceExpressionTokenType = DockJSExpressionTokenType & {
    expressions: Array<DockJSExpressionTokenType>;
    type: DockJS.SequenceExpression;
};
export type DockJSSpreadElementTokenType = DockJSNodeTokenType & {
    argument: DockJSExpressionTokenType;
    type: DockJS.SpreadElement;
};
export type DockJSStatementTokenType = DockJSNodeTokenType & {
    type: DockJS.Statement;
};
export type DockJSSuperTokenType = DockJSNodeTokenType & {
    type: DockJS.Super;
};
export type DockJSSwitchCaseTokenType = DockJSNodeTokenType & {
    consequent: Array<DockJSStatementTokenType>;
    test?: DockJSExpressionTokenType;
    type: DockJS.SwitchCase;
};
export type DockJSSwitchStatementTokenType = DockJSStatementTokenType & {
    cases: Array<DockJSSwitchCaseTokenType>;
    discriminant: DockJSExpressionTokenType;
    type: DockJS.SwitchStatement;
};
export type DockJSTaggedTemplateExpressionTokenType = DockJSExpressionTokenType & {
    quasi: DockJSTemplateLiteralTokenType;
    tag: DockJSExpressionTokenType;
    type: DockJS.TaggedTemplateExpression;
};
export type DockJSTemplateElementTokenType = DockJSNodeTokenType & {
    tail: boolean;
    type: DockJS.TemplateElement;
    value: object;
};
export type DockJSTemplateLiteralTokenType = DockJSExpressionTokenType & {
    expressions: Array<DockJSExpressionTokenType>;
    quasis: Array<DockJSTemplateElementTokenType>;
    type: DockJS.TemplateLiteral;
};
export type DockJSThisExpressionTokenType = DockJSExpressionTokenType & {
    type: DockJS.ThisExpression;
};
export type DockJSThrowStatementTokenType = DockJSStatementTokenType & {
    argument: DockJSExpressionTokenType;
    type: DockJS.ThrowStatement;
};
export type DockJSTokenType = DockJSNodeTokenType | DockJSStatementTokenType | DockJSIdentifierTokenType | DockJSLiteralTokenType | DockJSProgramTokenType | DockJSFunctionTokenType | DockJSSuperTokenType | DockJSExpressionStatementTokenType | DockJSDirectiveTokenType | DockJSBlockStatementTokenType | DockJSFunctionBodyTokenType | DockJSEmptyStatementTokenType | DockJSDebuggerStatementTokenType | DockJSWithStatementTokenType | DockJSReturnStatementTokenType | DockJSLabeledStatementTokenType | DockJSBreakStatementTokenType | DockJSContinueStatementTokenType | DockJSIfStatementTokenType | DockJSSwitchStatementTokenType | DockJSSwitchCaseTokenType | DockJSThrowStatementTokenType | DockJSTryStatementTokenType | DockJSCatchClauseTokenType | DockJSBigIntLiteralTokenType | DockJSWhileStatementTokenType | DockJSDoWhileStatementTokenType | DockJSForStatementTokenType | DockJSForInStatementTokenType | DockJSForOfStatementTokenType | DockJSDeclarationTokenType | DockJSFunctionDeclarationTokenType | DockJSVariableDeclarationTokenType | DockJSVariableDeclaratorTokenType | DockJSExpressionTokenType | DockJSThisExpressionTokenType | DockJSArrayExpressionTokenType | DockJSObjectExpressionTokenType | DockJSPropertyTokenType | DockJSFunctionExpressionTokenType | DockJSArrowFunctionExpressionTokenType | DockJSYieldExpressionTokenType | DockJSTemplateLiteralTokenType | DockJSTaggedTemplateExpressionTokenType | DockJSTemplateElementTokenType | DockJSUnaryExpressionTokenType | DockJSUpdateExpressionTokenType | DockJSBinaryExpressionTokenType | DockJSAssignmentExpressionTokenType | DockJSLogicalExpressionTokenType | DockJSMemberExpressionTokenType | DockJSConditionalExpressionTokenType | DockJSCallExpressionTokenType | DockJSNewExpressionTokenType | DockJSSequenceExpressionTokenType | DockJSPatternTokenType | DockJSSpreadElementTokenType | DockJSArrayPatternTokenType | DockJSAssignmentPropertyTokenType | DockJSObjectPatternTokenType | DockJSRestElementTokenType | DockJSAssignmentPatternTokenType | DockJSClassTokenType | DockJSClassBodyTokenType | DockJSMethodDefinitionTokenType | DockJSClassDeclarationTokenType | DockJSClassExpressionTokenType | DockJSMetaPropertyTokenType | DockJSModuleDeclarationTokenType | DockJSModuleSpecifierTokenType | DockJSImportDeclarationTokenType | DockJSImportSpecifierTokenType | DockJSImportDefaultSpecifierTokenType | DockJSImportNamespaceSpecifierTokenType | DockJSExportNamedDeclarationTokenType | DockJSExportSpecifierTokenType | DockJSExportDefaultDeclarationTokenType | DockJSExportAllDeclarationTokenType | DockJSAwaitExpressionTokenType | DockJSImportExpressionTokenType;
export type DockJSTryStatementTokenType = DockJSStatementTokenType & {
    block: DockJSBlockStatementTokenType;
    finalizer?: DockJSBlockStatementTokenType;
    handler?: DockJSCatchClauseTokenType;
    type: DockJS.TryStatement;
};
export type DockJSUnaryExpressionTokenType = DockJSExpressionTokenType & {
    argument: DockJSExpressionTokenType;
    operator: string;
    prefix: boolean;
    type: DockJS.UnaryExpression;
};
export type DockJSUpdateExpressionTokenType = DockJSExpressionTokenType & {
    argument: DockJSExpressionTokenType;
    operator: string;
    prefix: boolean;
    type: DockJS.UpdateExpression;
};
export type DockJSVariableDeclarationTokenType = DockJSDeclarationTokenType & {
    declarations: Array<DockJSVariableDeclaratorTokenType>;
    kind: string;
    type: DockJS.VariableDeclaration;
};
export type DockJSVariableDeclaratorTokenType = DockJSNodeTokenType & {
    id: DockJSPatternTokenType;
    init?: DockJSExpressionTokenType;
    type: DockJS.VariableDeclarator;
};
export type DockJSWhileStatementTokenType = DockJSStatementTokenType & {
    body: DockJSStatementTokenType;
    test: DockJSExpressionTokenType;
    type: DockJS.WhileStatement;
};
export type DockJSWithStatementTokenType = DockJSStatementTokenType & {
    body: DockJSStatementTokenType;
    object: DockJSExpressionTokenType;
    type: DockJS.WithStatement;
};
export type DockJSYieldExpressionTokenType = DockJSExpressionTokenType & {
    argument?: DockJSExpressionTokenType;
    delegate: boolean;
    type: DockJS.YieldExpression;
};
