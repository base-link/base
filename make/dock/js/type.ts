export enum DockJS {
  ArrayExpression = 'js-array-expression',
  ArrayPattern = 'js-array-pattern',
  ArrowFunctionExpression = 'js-arrow-function-expression',
  AssignmentExpression = 'js-assignment-expression',
  AssignmentPattern = 'js-assignment-pattern',
  AssignmentProperty = 'js-assignment-property',
  AwaitExpression = 'js-await-expression',
  BigIntLiteral = 'js-big-int-literal',
  BinaryExpression = 'js-binary-expression',
  BlockStatement = 'js-block-statement',
  BreakStatement = 'js-break-statement',
  CallExpression = 'js-call-expression',
  CatchClause = 'js-catch-clause',
  Class = 'js-class',
  ClassBody = 'js-class-body',
  ClassDeclaration = 'js-class-declaration',
  ClassExpression = 'js-class-expression',
  ConditionalExpression = 'js-conditional-expression',
  ContinueStatement = 'js-continue-statement',
  DebuggerStatement = 'js-debugger-statement',
  Declaration = 'js-declaration',
  Directive = 'js-directive',
  DoWhileStatement = 'js-do-while-statement',
  EmptyStatement = 'js-empty-statement',
  ExportAllDeclaration = 'js-export-all-declaration',
  ExportDefaultDeclaration = 'js-export-default-declaration',
  ExportNamedDeclaration = 'js-export-named-declaration',
  ExportSpecifier = 'js-export-specifier',
  Expression = 'js-expression',
  ExpressionStatement = 'js-expression-statement',
  ForInStatement = 'js-for-in-statement',
  ForOfStatement = 'js-for-of-statement',
  ForStatement = 'js-for-statement',
  Function = 'js-function',
  FunctionBody = 'js-function-body',
  FunctionDeclaration = 'js-function-declaration',
  FunctionExpression = 'js-function-expression',
  Identifier = 'js-identifier',
  IfStatement = 'js-if-statement',
  ImportDeclaration = 'js-import-declaration',
  ImportDefaultSpecifier = 'js-import-default-specifier',
  ImportExpression = 'js-import-expression',
  ImportNamespaceSpecifier = 'js-import-namespace-specifier',
  ImportSpecifier = 'js-import-specifier',
  LabeledStatement = 'js-labeled-statement',
  Literal = 'js-literal',
  LogicalExpression = 'js-logical-expression',
  MemberExpression = 'js-member-expression',
  MetaProperty = 'js-meta-property',
  MethodDefinition = 'js-method-definition',
  ModuleDeclaration = 'js-module-declaration',
  ModuleSpecifier = 'js-module-specifier',
  NewExpression = 'js-new-expression',
  Node = 'js-node',
  ObjectExpression = 'js-object-expression',
  ObjectPattern = 'js-object-pattern',
  Pattern = 'js-pattern',
  Program = 'js-program',
  Property = 'js-property',
  RestElement = 'js-rest-element',
  ReturnStatement = 'js-return-statement',
  SequenceExpression = 'js-sequence-expression',
  SpreadElement = 'js-spread-element',
  Statement = 'js-statement',
  Super = 'js-super',
  SwitchCase = 'js-switch-case',
  SwitchStatement = 'js-switch-statement',
  TaggedTemplateExpression = 'js-tagged-template-expression',
  TemplateElement = 'js-template-element',
  TemplateLiteral = 'js-template-literal',
  ThisExpression = 'js-this-expression',
  ThrowStatement = 'js-throw-statement',
  TryStatement = 'js-try-statement',
  UnaryExpression = 'js-unary-expression',
  UpdateExpression = 'js-update-expression',
  VariableDeclaration = 'js-variable-declaration',
  VariableDeclarator = 'js-variable-declarator',
  WhileStatement = 'js-while-statement',
  WithStatement = 'js-with-statement',
  YieldExpression = 'js-yield-expression',
}
export type DockJSArrayExpressionTokenType =
  DockJSExpressionTokenType & {
    elements: Array<
      | DockJSExpressionTokenType
      | DockJSSpreadElementTokenType
      | null
    >
    like: DockJS.ArrayExpression
  }

export type DockJSArrayPatternTokenType =
  DockJSPatternTokenType & {
    elements: Array<DockJSPatternTokenType | null>
    like: DockJS.ArrayPattern
  }

export type DockJSArrowFunctionExpressionTokenType =
  DockJSFunctionTokenType &
    DockJSExpressionTokenType & {
      body:
        | DockJSFunctionBodyTokenType
        | DockJSExpressionTokenType
      expression: boolean
      like: DockJS.ArrowFunctionExpression
    }

export type DockJSAssignmentExpressionTokenType =
  DockJSExpressionTokenType & {
    left: DockJSPatternTokenType | DockJSExpressionTokenType
    like: DockJS.AssignmentExpression
    operator: string
    right: DockJSExpressionTokenType
  }

export type DockJSAssignmentPatternTokenType =
  DockJSPatternTokenType & {
    left: DockJSPatternTokenType
    like: DockJS.AssignmentPattern
    right: DockJSExpressionTokenType
  }

export type DockJSAssignmentPropertyTokenType = {
  like: DockJS.AssignmentProperty
}

export type DockJSAwaitExpressionTokenType =
  DockJSExpressionTokenType & {
    argument: DockJSExpressionTokenType
    like: DockJS.AwaitExpression
  }

export type DockJSBigIntLiteralTokenType =
  DockJSLiteralTokenType & {
    bigint: string
    like: DockJS.BigIntLiteral
  }

export type DockJSBinaryExpressionTokenType =
  DockJSExpressionTokenType & {
    left: DockJSExpressionTokenType
    like: DockJS.BinaryExpression
    operator: string
    right: DockJSExpressionTokenType
  }

export type DockJSBlockStatementTokenType =
  DockJSStatementTokenType & {
    body: Array<DockJSStatementTokenType>
    like: DockJS.BlockStatement
  }

export type DockJSBreakStatementTokenType =
  DockJSStatementTokenType & {
    label?: DockJSIdentifierTokenType
    like: DockJS.BreakStatement
  }

export type DockJSCallExpressionTokenType =
  DockJSExpressionTokenType & {
    arguments: Array<
      DockJSExpressionTokenType | DockJSSpreadElementTokenType
    >
    callee: DockJSExpressionTokenType | DockJSSuperTokenType
    like: DockJS.CallExpression
  }

export type DockJSCatchClauseTokenType = DockJSNodeTokenType & {
  body: DockJSBlockStatementTokenType
  like: DockJS.CatchClause
  param?: DockJSPatternTokenType
}

export type DockJSClassBodyTokenType = DockJSNodeTokenType & {
  body: Array<DockJSMethodDefinitionTokenType>
  like: DockJS.ClassBody
}

export type DockJSClassDeclarationTokenType =
  DockJSClassTokenType &
    DockJSDeclarationTokenType & {
      id: DockJSIdentifierTokenType
      like: DockJS.ClassDeclaration
    }

export type DockJSClassExpressionTokenType =
  DockJSClassTokenType &
    DockJSExpressionTokenType & {
      like: DockJS.ClassExpression
    }

export type DockJSClassTokenType = DockJSNodeTokenType & {
  body: DockJSClassBodyTokenType
  id?: DockJSIdentifierTokenType
  like: DockJS.Class
  superClass?: DockJSExpressionTokenType
}

export type DockJSConditionalExpressionTokenType =
  DockJSExpressionTokenType & {
    alternate: DockJSExpressionTokenType
    consequent: DockJSExpressionTokenType
    like: DockJS.ConditionalExpression
    test: DockJSExpressionTokenType
  }

export type DockJSContinueStatementTokenType =
  DockJSStatementTokenType & {
    label?: DockJSIdentifierTokenType
    like: DockJS.ContinueStatement
  }

export type DockJSDebuggerStatementTokenType =
  DockJSStatementTokenType & {
    like: DockJS.DebuggerStatement
  }

export type DockJSDeclarationTokenType =
  DockJSStatementTokenType & {
    like: DockJS.Declaration
  }

export type DockJSDirectiveTokenType = DockJSNodeTokenType & {
  directive: string
  expression: DockJSLiteralTokenType
  like: DockJS.Directive
}

export type DockJSDoWhileStatementTokenType =
  DockJSStatementTokenType & {
    body: DockJSStatementTokenType
    like: DockJS.DoWhileStatement
    test: DockJSExpressionTokenType
  }

export type DockJSEmptyStatementTokenType =
  DockJSStatementTokenType & {
    like: DockJS.EmptyStatement
  }

export type DockJSExportAllDeclarationTokenType =
  DockJSModuleDeclarationTokenType & {
    exported?: DockJSIdentifierTokenType
    like: DockJS.ExportAllDeclaration
    source: DockJSLiteralTokenType
  }

export type DockJSExportDefaultDeclarationTokenType =
  DockJSModuleDeclarationTokenType & {
    declaration:
      | DockJSFunctionDeclarationTokenType
      | DockJSClassDeclarationTokenType
      | DockJSExpressionTokenType
    like: DockJS.ExportDefaultDeclaration
  }

export type DockJSExportNamedDeclarationTokenType =
  DockJSNodeTokenType & {
    declaration?: DockJSDeclarationTokenType
    like: DockJS.ExportNamedDeclaration
    source?: DockJSLiteralTokenType
    specifiers: Array<DockJSExportSpecifierTokenType>
  }

export type DockJSExportSpecifierTokenType = {
  exported: DockJSIdentifierTokenType
  like: DockJS.ExportSpecifier
}

export type DockJSExpressionStatementTokenType =
  DockJSStatementTokenType & {
    expression: DockJSExpressionTokenType
    like: DockJS.ExpressionStatement
  }

export type DockJSExpressionTokenType = DockJSNodeTokenType & {
  like: DockJS.Expression
}

export type DockJSForInStatementTokenType =
  DockJSStatementTokenType & {
    body: DockJSStatementTokenType
    left:
      | DockJSVariableDeclarationTokenType
      | DockJSPatternTokenType
    like: DockJS.ForInStatement
    right: DockJSExpressionTokenType
  }

export type DockJSForOfStatementTokenType =
  DockJSStatementTokenType & {
    await: boolean
    like: DockJS.ForOfStatement
  }

export type DockJSForStatementTokenType =
  DockJSStatementTokenType & {
    body: DockJSStatementTokenType
    init?:
      | DockJSVariableDeclarationTokenType
      | DockJSExpressionTokenType
    like: DockJS.ForStatement
    test?: DockJSExpressionTokenType
    update?: DockJSExpressionTokenType
  }

export type DockJSFunctionBodyTokenType =
  DockJSBlockStatementTokenType & {
    body: Array<
      DockJSDirectiveTokenType | DockJSStatementTokenType
    >
    like: DockJS.FunctionBody
  }

export type DockJSFunctionDeclarationTokenType =
  DockJSFunctionTokenType &
    DockJSDeclarationTokenType & {
      id: DockJSIdentifierTokenType
      like: DockJS.FunctionDeclaration
    }

export type DockJSFunctionExpressionTokenType =
  DockJSFunctionTokenType &
    DockJSExpressionTokenType & {
      like: DockJS.FunctionExpression
    }

export type DockJSFunctionTokenType = DockJSNodeTokenType & {
  async: boolean
  body: DockJSFunctionBodyTokenType
  generator: boolean
  like: DockJS.Function
  params: Array<DockJSPatternTokenType>
}

export type DockJSIdentifierTokenType =
  DockJSExpressionTokenType &
    DockJSPatternTokenType & {
      like: DockJS.Identifier
      name: string
    }

export type DockJSIfStatementTokenType =
  DockJSStatementTokenType & {
    alternate?: DockJSStatementTokenType
    consequent: DockJSStatementTokenType
    like: DockJS.IfStatement
    test: DockJSExpressionTokenType
  }

export type DockJSImportDeclarationTokenType =
  DockJSModuleDeclarationTokenType & {
    like: DockJS.ImportDeclaration
    source: DockJSLiteralTokenType
    specifiers: Array<
      | DockJSImportSpecifierTokenType
      | DockJSImportDefaultSpecifierTokenType
      | DockJSImportNamespaceSpecifierTokenType
    >
  }

export type DockJSImportDefaultSpecifierTokenType =
  DockJSModuleSpecifierTokenType & {
    like: DockJS.ImportDefaultSpecifier
  }

export type DockJSImportExpressionTokenType =
  DockJSExpressionTokenType & {
    like: DockJS.ImportExpression
    source: DockJSExpressionTokenType
  }

export type DockJSImportNamespaceSpecifierTokenType =
  DockJSModuleSpecifierTokenType & {
    like: DockJS.ImportNamespaceSpecifier
  }

export type DockJSImportSpecifierTokenType =
  DockJSModuleSpecifierTokenType & {
    imported: DockJSIdentifierTokenType
    like: DockJS.ImportSpecifier
  }

export type DockJSLabeledStatementTokenType =
  DockJSStatementTokenType & {
    body: DockJSStatementTokenType
    label: DockJSIdentifierTokenType
    like: DockJS.LabeledStatement
  }

export type DockJSLiteralTokenType =
  DockJSExpressionTokenType & {
    like: DockJS.Literal
    value?: string | boolean | number | RegExp
  }

export type DockJSLogicalExpressionTokenType =
  DockJSExpressionTokenType & {
    left: DockJSExpressionTokenType
    like: DockJS.LogicalExpression
    operator: string
    right: DockJSExpressionTokenType
  }

export type DockJSMemberExpressionTokenType =
  DockJSExpressionTokenType & {
    computed: boolean
    like: DockJS.MemberExpression
    object: DockJSExpressionTokenType | DockJSSuperTokenType
    property: DockJSExpressionTokenType
  }

export type DockJSMetaPropertyTokenType =
  DockJSExpressionTokenType & {
    like: DockJS.MetaProperty
    meta: DockJSIdentifierTokenType
    property: DockJSIdentifierTokenType
  }

export type DockJSMethodDefinitionTokenType =
  DockJSNodeTokenType & {
    computed: boolean
    key: DockJSExpressionTokenType
    kind: string
    like: DockJS.MethodDefinition
    static: boolean
    value: DockJSFunctionExpressionTokenType
  }

export type DockJSModuleDeclarationTokenType =
  DockJSNodeTokenType & {
    like: DockJS.ModuleDeclaration
  }

export type DockJSModuleSpecifierTokenType =
  DockJSNodeTokenType & {
    like: DockJS.ModuleSpecifier
    local: DockJSIdentifierTokenType
  }

export type DockJSNewExpressionTokenType =
  DockJSExpressionTokenType & {
    arguments: Array<
      DockJSExpressionTokenType | DockJSSpreadElementTokenType
    >
    callee: DockJSExpressionTokenType
    like: DockJS.NewExpression
  }

export type DockJSNodeTokenType = {
  like: DockJS.Node
}

export type DockJSObjectExpressionTokenType =
  DockJSExpressionTokenType & {
    like: DockJS.ObjectExpression
    properties: Array<
      DockJSPropertyTokenType | DockJSSpreadElementTokenType
    >
  }

export type DockJSObjectPatternTokenType =
  DockJSPatternTokenType & {
    like: DockJS.ObjectPattern
    properties: Array<
      | DockJSAssignmentPropertyTokenType
      | DockJSRestElementTokenType
    >
  }

export type DockJSPatternTokenType = DockJSNodeTokenType & {
  like: DockJS.Pattern
}

export type DockJSProgramTokenType = DockJSNodeTokenType & {
  body: Array<
    DockJSModuleDeclarationTokenType | DockJSStatementTokenType
  >
  like: DockJS.Program
}

export type DockJSPropertyTokenType = DockJSNodeTokenType & {
  computed: boolean
  key: DockJSExpressionTokenType
  kind: string
  like: DockJS.Property
  method: boolean
  shorthand: boolean
  value: DockJSExpressionTokenType
}

export type DockJSRestElementTokenType =
  DockJSPatternTokenType & {
    argument: DockJSPatternTokenType
    like: DockJS.RestElement
  }

export type DockJSReturnStatementTokenType =
  DockJSStatementTokenType & {
    argument?: DockJSExpressionTokenType
    like: DockJS.ReturnStatement
  }

export type DockJSSequenceExpressionTokenType =
  DockJSExpressionTokenType & {
    expressions: Array<DockJSExpressionTokenType>
    like: DockJS.SequenceExpression
  }

export type DockJSSpreadElementTokenType =
  DockJSNodeTokenType & {
    argument: DockJSExpressionTokenType
    like: DockJS.SpreadElement
  }

export type DockJSStatementTokenType = DockJSNodeTokenType & {
  like: DockJS.Statement
}

export type DockJSSuperTokenType = DockJSNodeTokenType & {
  like: DockJS.Super
}

export type DockJSSwitchCaseTokenType = DockJSNodeTokenType & {
  consequent: Array<DockJSStatementTokenType>
  like: DockJS.SwitchCase
  test?: DockJSExpressionTokenType
}

export type DockJSSwitchStatementTokenType =
  DockJSStatementTokenType & {
    cases: Array<DockJSSwitchCaseTokenType>
    discriminant: DockJSExpressionTokenType
    like: DockJS.SwitchStatement
  }

export type DockJSTaggedTemplateExpressionTokenType =
  DockJSExpressionTokenType & {
    like: DockJS.TaggedTemplateExpression
    quasi: DockJSTemplateLiteralTokenType
    tag: DockJSExpressionTokenType
  }

export type DockJSTemplateElementTokenType =
  DockJSNodeTokenType & {
    like: DockJS.TemplateElement
    tail: boolean
    value: object
  }

export type DockJSTemplateLiteralTokenType =
  DockJSExpressionTokenType & {
    expressions: Array<DockJSExpressionTokenType>
    like: DockJS.TemplateLiteral
    quasis: Array<DockJSTemplateElementTokenType>
  }

export type DockJSThisExpressionTokenType =
  DockJSExpressionTokenType & {
    like: DockJS.ThisExpression
  }

export type DockJSThrowStatementTokenType =
  DockJSStatementTokenType & {
    argument: DockJSExpressionTokenType
    like: DockJS.ThrowStatement
  }

export type DockJSTokenType =
  | DockJSNodeTokenType
  | DockJSStatementTokenType
  | DockJSIdentifierTokenType
  | DockJSLiteralTokenType
  | DockJSProgramTokenType
  | DockJSFunctionTokenType
  | DockJSSuperTokenType
  | DockJSExpressionStatementTokenType
  | DockJSDirectiveTokenType
  | DockJSBlockStatementTokenType
  | DockJSFunctionBodyTokenType
  | DockJSEmptyStatementTokenType
  | DockJSDebuggerStatementTokenType
  | DockJSWithStatementTokenType
  | DockJSReturnStatementTokenType
  | DockJSLabeledStatementTokenType
  | DockJSBreakStatementTokenType
  | DockJSContinueStatementTokenType
  | DockJSIfStatementTokenType
  | DockJSSwitchStatementTokenType
  | DockJSSwitchCaseTokenType
  | DockJSThrowStatementTokenType
  | DockJSTryStatementTokenType
  | DockJSCatchClauseTokenType
  | DockJSBigIntLiteralTokenType
  | DockJSWhileStatementTokenType
  | DockJSDoWhileStatementTokenType
  | DockJSForStatementTokenType
  | DockJSForInStatementTokenType
  | DockJSForOfStatementTokenType
  | DockJSDeclarationTokenType
  | DockJSFunctionDeclarationTokenType
  | DockJSVariableDeclarationTokenType
  | DockJSVariableDeclaratorTokenType
  | DockJSExpressionTokenType
  | DockJSThisExpressionTokenType
  | DockJSArrayExpressionTokenType
  | DockJSObjectExpressionTokenType
  | DockJSPropertyTokenType
  | DockJSFunctionExpressionTokenType
  | DockJSArrowFunctionExpressionTokenType
  | DockJSYieldExpressionTokenType
  | DockJSTemplateLiteralTokenType
  | DockJSTaggedTemplateExpressionTokenType
  | DockJSTemplateElementTokenType
  | DockJSUnaryExpressionTokenType
  | DockJSUpdateExpressionTokenType
  | DockJSBinaryExpressionTokenType
  | DockJSAssignmentExpressionTokenType
  | DockJSLogicalExpressionTokenType
  | DockJSMemberExpressionTokenType
  | DockJSConditionalExpressionTokenType
  | DockJSCallExpressionTokenType
  | DockJSNewExpressionTokenType
  | DockJSSequenceExpressionTokenType
  | DockJSPatternTokenType
  | DockJSSpreadElementTokenType
  | DockJSArrayPatternTokenType
  | DockJSAssignmentPropertyTokenType
  | DockJSObjectPatternTokenType
  | DockJSRestElementTokenType
  | DockJSAssignmentPatternTokenType
  | DockJSClassTokenType
  | DockJSClassBodyTokenType
  | DockJSMethodDefinitionTokenType
  | DockJSClassDeclarationTokenType
  | DockJSClassExpressionTokenType
  | DockJSMetaPropertyTokenType
  | DockJSModuleDeclarationTokenType
  | DockJSModuleSpecifierTokenType
  | DockJSImportDeclarationTokenType
  | DockJSImportSpecifierTokenType
  | DockJSImportDefaultSpecifierTokenType
  | DockJSImportNamespaceSpecifierTokenType
  | DockJSExportNamedDeclarationTokenType
  | DockJSExportSpecifierTokenType
  | DockJSExportDefaultDeclarationTokenType
  | DockJSExportAllDeclarationTokenType
  | DockJSAwaitExpressionTokenType
  | DockJSImportExpressionTokenType

export type DockJSTryStatementTokenType =
  DockJSStatementTokenType & {
    block: DockJSBlockStatementTokenType
    finalizer?: DockJSBlockStatementTokenType
    handler?: DockJSCatchClauseTokenType
    like: DockJS.TryStatement
  }

export type DockJSUnaryExpressionTokenType =
  DockJSExpressionTokenType & {
    argument: DockJSExpressionTokenType
    like: DockJS.UnaryExpression
    operator: string
    prefix: boolean
  }

export type DockJSUpdateExpressionTokenType =
  DockJSExpressionTokenType & {
    argument: DockJSExpressionTokenType
    like: DockJS.UpdateExpression
    operator: string
    prefix: boolean
  }

export type DockJSVariableDeclarationTokenType =
  DockJSDeclarationTokenType & {
    declarations: Array<DockJSVariableDeclaratorTokenType>
    kind: string
    like: DockJS.VariableDeclaration
  }

export type DockJSVariableDeclaratorTokenType =
  DockJSNodeTokenType & {
    id: DockJSPatternTokenType
    init?: DockJSExpressionTokenType
    like: DockJS.VariableDeclarator
  }

export type DockJSWhileStatementTokenType =
  DockJSStatementTokenType & {
    body: DockJSStatementTokenType
    like: DockJS.WhileStatement
    test: DockJSExpressionTokenType
  }

export type DockJSWithStatementTokenType =
  DockJSStatementTokenType & {
    body: DockJSStatementTokenType
    like: DockJS.WithStatement
    object: DockJSExpressionTokenType
  }

export type DockJSYieldExpressionTokenType =
  DockJSExpressionTokenType & {
    argument?: DockJSExpressionTokenType
    delegate: boolean
    like: DockJS.YieldExpression
  }
