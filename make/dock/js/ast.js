export { createArrayExpression, createArrayPattern, createArrowFunctionExpression, createAssignmentExpression, createAssignmentPattern, createBinaryExpression, createBlockStatement, createBreakStatement, createCallExpression, createCatchClause, createClassBody, createClassDeclaration, createConditionalExpression, createDebuggerStatement, createExpressionStatement, createForInStatement, createForOfStatement, createFunctionDeclaration, createFunctionExpression, createIdentifier, createIfStatement, createLabeledStatement, createLiteral, createLogicalExpression, createMemberExpression, createMethodDefinition, createNewExpression, createObjectExpression, createObjectPattern, createProgram, createProperty, createRestElement, createReturnStatement, createSpreadElement, createSwitchCase, createSwitchStatement, createTaggedTemplateExpression, createTemplateLiteral, createThrowStatement, createTryStatement, createUnaryExpression, createUpdateExpression, createVariable, createVariableDeclaration, createVariableDeclarator, createWhileStatement, };
function createObjectPattern(properties) {
    return {
        properties,
        type: 'ObjectPattern',
    };
}
function createCatchClause(param, body) {
    return {
        body,
        param,
        type: 'CatchClause',
    };
}
function createTryStatement(block, handler, finalizer) {
    return {
        block,
        finalizer,
        handler,
        type: 'TryStatement',
    };
}
function createSwitchCase(test, consequent) {
    return {
        consequent,
        test,
        type: 'SwitchCase',
    };
}
function createSwitchStatement(discriminant, cases) {
    return {
        cases,
        discriminant,
        type: 'SwitchStatement',
    };
}
function createUpdateExpression(argument, operator, prefix) {
    return {
        argument,
        operator,
        prefix,
        type: 'UpdateExpression',
    };
}
function createUnaryExpression(argument, operator, prefix) {
    return {
        argument,
        operator,
        prefix,
        type: 'UnaryExpression',
    };
}
function createNewExpression(ctor, args) {
    return {
        arguments: args,
        callee: ctor,
        type: 'NewExpression',
    };
}
function createTemplateLiteral(expressions, quasis) {
    return {
        expressions,
        quasis,
        type: 'TemplateLiteral',
    };
}
function createTaggedTemplateExpression(tag, quasi) {
    return {
        quasi,
        tag,
        type: 'TaggedTemplateExpression',
    };
}
function createRestElement(argument) {
    return {
        argument,
        type: 'RestElement',
    };
}
function createSpreadElement(argument) {
    return {
        argument,
        type: 'SpreadElement',
    };
}
function createThrowStatement(argument) {
    return {
        argument,
        type: 'ThrowStatement',
    };
}
function createBreakStatement(label) {
    return {
        label,
        type: 'BreakStatement',
    };
}
function createClassBody(body) {
    return {
        body,
        type: 'ClassBody',
    };
}
function createClassDeclaration(id, superClass, body) {
    return {
        body,
        id,
        superClass,
        type: 'ClassDeclaration',
    };
}
function createMethodDefinition(key, value, kind, computed = false, isStatic = false) {
    return {
        computed,
        key,
        kind,
        static: isStatic,
        type: 'MethodDefinition',
        value,
    };
}
function createProgram(body) {
    return {
        body,
        type: 'Program',
    };
}
function createMemberExpression(object, property, computed = false) {
    return {
        computed,
        object,
        property,
        type: 'MemberExpression',
    };
}
function createConditionalExpression(test, consequent, alternate) {
    return {
        alternate,
        consequent,
        test,
        type: 'ConditionalExpression',
    };
}
function createBinaryExpression(left, operator, right) {
    return {
        left,
        operator,
        right,
        type: 'BinaryExpression',
    };
}
function createLogicalExpression(left, operator, right) {
    return {
        left,
        operator,
        right,
        type: 'LogicalExpression',
    };
}
function createIdentifier(name) {
    return {
        name,
        type: 'Identifier',
    };
}
function createExpressionStatement(expression) {
    return {
        expression,
        type: 'ExpressionStatement',
    };
}
function createVariable(kind, id, init) {
    return createVariableDeclaration(kind, [
        createVariableDeclarator(id, init),
    ]);
}
function createVariableDeclaration(kind, declarations) {
    return {
        declarations,
        kind,
        type: 'VariableDeclaration',
    };
}
function createVariableDeclarator(id, init) {
    return {
        id,
        init,
        type: 'VariableDeclarator',
    };
}
function createLiteral(value) {
    return {
        raw: typeof value === 'string'
            ? `'${value}'`
            : typeof value === 'number'
                ? String(value)
                : JSON.stringify(value),
        type: 'Literal',
        value,
    };
}
function createAssignmentExpression(left, right, operator = '=') {
    return {
        left,
        operator,
        right,
        type: 'AssignmentExpression',
    };
}
function createCallExpression(_callee, args = []) {
    return {
        arguments: args,
        callee: _callee,
        type: 'CallExpression',
    };
}
function createFunctionDeclaration(id, params = [], body = [], { async = false, generator = false } = {}) {
    return {
        async,
        body,
        generator,
        id,
        params,
        type: 'FunctionDeclaration',
    };
}
function createFunctionExpression(id, params = [], body = [], { async = false, generator = false } = {}) {
    return {
        async,
        body,
        generator,
        id,
        params,
        type: 'FunctionExpression',
    };
}
function createAssignmentPattern(left, right) {
    return {
        left,
        right,
        type: 'AssignmentPattern',
    };
}
function createReturnStatement(argument) {
    return {
        argument,
        type: 'ReturnStatement',
    };
}
function createIfStatement(test, consequent, alternate) {
    return {
        alternate,
        consequent,
        test,
        type: 'IfStatement',
    };
}
function createBlockStatement(body) {
    return {
        body,
        type: 'BlockStatement',
    };
}
function createObjectExpression(properties) {
    return {
        properties,
        type: 'ObjectExpression',
    };
}
function createProperty(key, value) {
    return {
        key,
        type: 'Property',
        value,
    };
}
function createArrayExpression(elements) {
    return {
        elements,
        type: 'ArrayExpression',
    };
}
function createForInStatement(left, right, body) {
    return {
        body,
        left,
        right,
        type: 'ForInStatement',
    };
}
function createForOfStatement(left, right, body) {
    return {
        body,
        left,
        right,
        type: 'ForOfStatement',
    };
}
function createWhileStatement(test, body) {
    return {
        body: {
            body,
            type: 'BlockStatement',
        },
        test,
        type: 'WhileStatement',
    };
}
function createArrowFunctionExpression(id, params, body) {
    return {
        body,
        id,
        params,
        type: 'ArrowFunctionExpression',
    };
}
function createLabeledStatement(label, body) {
    return {
        body,
        label,
        type: 'LabeledStatement',
    };
}
function createArrayPattern(elements) {
    return {
        elements,
        type: 'ArrayPattern',
    };
}
function createDebuggerStatement() {
    return {
        type: 'DebuggerStatement',
    };
}
//# sourceMappingURL=ast.js.map