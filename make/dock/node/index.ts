import {
  createArrowFunctionExpression,
  createBlockStatement,
  createCallExpression,
  createIdentifier,
  createLiteral,
  createMemberExpression,
  createObjectExpression,
  createProperty,
  createVariableDeclaration,
  createVariableDeclarator,
} from 'dock/js/ast.js'
import prettier from 'prettier'

import {
  Base,
  DockJS,
  DockJSPropertyTokenType,
  Mesh,
  MeshType,
  code,
} from '~'
import type { DockJSProgramTokenType, DockJSTokenType } from '~'

export * from '../js/print.js'
export * from '../js/type.js'

export type DockNodeJSInputType = {
  state: DockNodeJSStateType
}

export type DockNodeJSStateType = {
  card: Array<DockJSTokenType>
}

// sort the things in topological order.
export function exportNodeJS(base: Base): void {
  const program = code.generateNodeJS(base)
}

export function generateNodeJS(base: Base): DockJSTokenType {
  const program: DockJSProgramTokenType = {
    body: [],
    like: DockJS.Program,
  }

  for (const [key, val] of base.card_mesh) {
    // console.log(key, val.seed.like)
    // console.log(val.seed)
    switch (val.seed.like) {
      case Mesh.CodeModule:
        code.generateNodeJSCardModule(program, val.seed)
        break
      case Mesh.PackageModule:
        code.generateNodeJSDeckModule(program, val.seed)
        break
      default:
        break
    }
  }

  console.log(
    prettier.format(code.printJSAST(program), {
      arrowParens: 'avoid',
      bracketSpacing: true,
      endOfLine: 'lf',
      importOrder: [
        '^\\w(.*)$',
        '^@(.*)$',
        '~(.*)$',
        '\\..(.*)$',
        '\\.(.*)$',
      ],
      importOrderSeparation: true,
      importOrderSortSpecifiers: true,
      parser: 'typescript',
      prettierPath: './node_modules/prettier',
      printWidth: 64,
      proseWrap: 'always',
      quoteProps: 'as-needed',
      semi: false,
      singleAttributePerLine: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'all',
      useTabs: false,
    }),
  )

  return program
}

export function generateNodeJSCardModule(
  program: DockJSProgramTokenType,
  module: MeshType<Mesh.CardModule>,
): void {
  const imports = []
  // module.exportList.forEach(exp => {})
  module.importTree.forEach((imp, i) => {
    imports.push(
      createVariableDeclaration(
        'const',
        createVariableDeclarator(createIdentifier(`i${i + 1}`)),
      ),
    )
  })

  program.body.push(writeBaseLoad(imports))
}

export function generateNodeJSDeckModule(
  program: DockJSProgramTokenType,
  module: MeshType<Mesh.DeckModule>,
): void {
  const properties: Array<DockJSPropertyTokenType> = []
  properties.push(
    createProperty(
      createIdentifier('host'),
      createLiteral(module.deck.host),
    ),
    createProperty(
      createIdentifier('name'),
      createLiteral(module.deck.name),
    ),
  )
  if (module.deck.version) {
    properties.push(
      createProperty(
        createIdentifier('version'),
        createLiteral(module.deck.version),
      ),
    )
  }
  program.body.push(
    writeBaseLoad([
      createArrowFunctionExpression(
        null,
        [],
        createBlockStatement([
          createVariableDeclaration('const', [
            createVariableDeclarator(
              createIdentifier('deck'),
              createObjectExpression(properties),
            ),
          ]),
          createVariableDeclaration('const', [
            createVariableDeclarator(
              createIdentifier('card'),
              createMemberExpression(
                createIdentifier('base'),
                createCallExpression(createIdentifier('card'), [
                  createLiteral(module.path),
                ]),
              ),
            ),
          ]),
          createVariableDeclaration('const', [
            createVariableDeclarator(
              createIdentifier('seed'),
              createObjectExpression([
                createProperty(
                  createIdentifier('deck'),
                  createIdentifier('deck'),
                ),
              ]),
            ),
          ]),
          createMemberExpression(
            createIdentifier('card'),
            createCallExpression(createIdentifier('save'), [
              createIdentifier('seed'),
            ]),
          ),
        ]),
      ),
    ]),
  )
}

export function renderNodeJS(): string {
  return ''
}

function writeBaseLoad(body) {
  return createMemberExpression(
    createIdentifier('base'),
    createCallExpression(createIdentifier('load'), body),
  )
}
