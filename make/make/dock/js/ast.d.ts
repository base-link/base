export { createArrayExpression, createArrayPattern, createArrowFunctionExpression, createAssignmentExpression, createAssignmentPattern, createBinaryExpression, createBlockStatement, createBreakStatement, createCallExpression, createCatchClause, createClassBody, createClassDeclaration, createConditionalExpression, createDebuggerStatement, createExpressionStatement, createForInStatement, createForOfStatement, createFunctionDeclaration, createFunctionExpression, createIdentifier, createIfStatement, createLabeledStatement, createLiteral, createLogicalExpression, createMemberExpression, createMethodDefinition, createNewExpression, createObjectExpression, createObjectPattern, createProgram, createProperty, createRestElement, createReturnStatement, createSpreadElement, createSwitchCase, createSwitchStatement, createTaggedTemplateExpression, createTemplateLiteral, createThrowStatement, createTryStatement, createUnaryExpression, createUpdateExpression, createVariable, createVariableDeclaration, createVariableDeclarator, createWhileStatement, };
declare function createObjectPattern(properties: any): {
    properties: any;
    type: string;
};
declare function createCatchClause(param: any, body: any): {
    body: any;
    param: any;
    type: string;
};
declare function createTryStatement(block: any, handler: any, finalizer: any): {
    block: any;
    finalizer: any;
    handler: any;
    type: string;
};
declare function createSwitchCase(test: any, consequent: any): {
    consequent: any;
    test: any;
    type: string;
};
declare function createSwitchStatement(discriminant: any, cases: any): {
    cases: any;
    discriminant: any;
    type: string;
};
declare function createUpdateExpression(argument: any, operator: any, prefix: any): {
    argument: any;
    operator: any;
    prefix: any;
    type: string;
};
declare function createUnaryExpression(argument: any, operator: any, prefix: any): {
    argument: any;
    operator: any;
    prefix: any;
    type: string;
};
declare function createNewExpression(ctor: any, args: any): {
    arguments: any;
    callee: any;
    type: string;
};
declare function createTemplateLiteral(expressions: any, quasis: any): {
    expressions: any;
    quasis: any;
    type: string;
};
declare function createTaggedTemplateExpression(tag: any, quasi: any): {
    quasi: any;
    tag: any;
    type: string;
};
declare function createRestElement(argument: any): {
    argument: any;
    type: string;
};
declare function createSpreadElement(argument: any): {
    argument: any;
    type: string;
};
declare function createThrowStatement(argument: any): {
    argument: any;
    type: string;
};
declare function createBreakStatement(label: any): {
    label: any;
    type: string;
};
declare function createClassBody(body: any): {
    body: any;
    type: string;
};
declare function createClassDeclaration(id: any, superClass: any, body: any): {
    body: any;
    id: any;
    superClass: any;
    type: string;
};
declare function createMethodDefinition(key: any, value: any, kind: any, computed?: boolean, isStatic?: boolean): {
    computed: boolean;
    key: any;
    kind: any;
    static: boolean;
    type: string;
    value: any;
};
declare function createProgram(body: any): {
    body: any;
    type: string;
};
declare function createMemberExpression(object: any, property: any, computed?: boolean): {
    computed: boolean;
    object: any;
    property: any;
    type: string;
};
declare function createConditionalExpression(test: any, consequent: any, alternate: any): {
    alternate: any;
    consequent: any;
    test: any;
    type: string;
};
declare function createBinaryExpression(left: any, operator: any, right: any): {
    left: any;
    operator: any;
    right: any;
    type: string;
};
declare function createLogicalExpression(left: any, operator: any, right: any): {
    left: any;
    operator: any;
    right: any;
    type: string;
};
declare function createIdentifier(name: any): {
    name: any;
    type: string;
};
declare function createExpressionStatement(expression: any): {
    expression: any;
    type: string;
};
declare function createVariable(kind: any, id: any, init: any): {
    declarations: any;
    kind: any;
    type: string;
};
declare function createVariableDeclaration(kind: any, declarations: any): {
    declarations: any;
    kind: any;
    type: string;
};
declare function createVariableDeclarator(id: any, init: any): {
    id: any;
    init: any;
    type: string;
};
declare function createLiteral(value: any): {
    raw: string;
    type: string;
    value: any;
};
declare function createAssignmentExpression(left: any, right: any, operator?: string): {
    left: any;
    operator: string;
    right: any;
    type: string;
};
declare function createCallExpression(_callee: any, args?: never[]): {
    arguments: never[];
    callee: any;
    type: string;
};
declare function createFunctionDeclaration(id: any, params?: never[], body?: never[], { async, generator }?: {
    async?: boolean | undefined;
    generator?: boolean | undefined;
}): {
    async: boolean;
    body: never[];
    generator: boolean;
    id: any;
    params: never[];
    type: string;
};
declare function createFunctionExpression(id: any, params?: never[], body?: never[], { async, generator }?: {
    async?: boolean | undefined;
    generator?: boolean | undefined;
}): {
    async: boolean;
    body: never[];
    generator: boolean;
    id: any;
    params: never[];
    type: string;
};
declare function createAssignmentPattern(left: any, right: any): {
    left: any;
    right: any;
    type: string;
};
declare function createReturnStatement(argument: any): {
    argument: any;
    type: string;
};
declare function createIfStatement(test: any, consequent: any, alternate: any): {
    alternate: any;
    consequent: any;
    test: any;
    type: string;
};
declare function createBlockStatement(body: any): {
    body: any;
    type: string;
};
declare function createObjectExpression(properties: any): {
    properties: any;
    type: string;
};
declare function createProperty(key: any, value: any): {
    key: any;
    type: string;
    value: any;
};
declare function createArrayExpression(elements: any): {
    elements: any;
    type: string;
};
declare function createForInStatement(left: any, right: any, body: any): {
    body: any;
    left: any;
    right: any;
    type: string;
};
declare function createForOfStatement(left: any, right: any, body: any): {
    body: any;
    left: any;
    right: any;
    type: string;
};
declare function createWhileStatement(test: any, body: any): {
    body: {
        body: any;
        type: string;
    };
    test: any;
    type: string;
};
declare function createArrowFunctionExpression(id: any, params: any, body: any): {
    body: any;
    id: any;
    params: any;
    type: string;
};
declare function createLabeledStatement(label: any, body: any): {
    body: any;
    label: any;
    type: string;
};
declare function createArrayPattern(elements: any): {
    elements: any;
    type: string;
};
declare function createDebuggerStatement(): {
    type: string;
};
