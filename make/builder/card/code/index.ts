import { AST, ASTFullType, Base, api } from '~'
import type { APIInputType, ASTPartialType } from '~'

export * from './bear/index.js'
export * from './bind/index.js'
export * from './bond/index.js'
export * from './call/index.js'
export * from './face/index.js'
export * from './form/index.js'
export * from './fuse/index.js'
export * from './head/index.js'
export * from './hide/index.js'
export * from './hold/index.js'
export * from './hook/index.js'
export * from './host/index.js'
export * from './like/index.js'
export * from './link/index.js'
export * from './load/index.js'
export * from './note/index.js'
export * from './risk/index.js'
export * from './save/index.js'
export * from './show/index.js'
export * from './slot/index.js'
export * from './stem/index.js'
export * from './suit/index.js'
export * from './take/index.js'
export * from './task/index.js'
export * from './test/index.js'
export * from './time/index.js'
export * from './tree/index.js'
export * from './wait/index.js'
export * from './walk/index.js'
export * from './zone/index.js'

export function handle_codeCard(
  base: Base,
  link: string,
): void {
  if (base.card_mesh.has(link)) {
    return
  }
  api.process_codeCard(base, link)
  api.resolve_codeCard(base, link)
}

export function process_codeCard(
  base: Base,
  link: string,
): void {
  console.log(link)
  const text = api.readTextFile(base, link)
  const textTree = api.parseTextIntoTree(text)
  const linkHost = api.getLinkHost(link)
  const card = base.card(link)
  const seed: ASTPartialType<AST.CodeModule> = {
    base,
    children: [],
    directory: linkHost,
    like: AST.CodeModule,
    parseTree: textTree,
    partial: true,
    path: link,
    textByLine: text.split('\n'),
  }
  const input: APIInputType = {
    card: seed,
    lexicalScope: api.createScope(seed),
    objectScope: api.createScope(seed),
  }

  card.bind(seed)

  api.assertNest(textTree)

  textTree.nest.forEach((nest, index) => {
    api.process_codeCard_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case 'dynamic-text':
    case 'dynamic-term':
      api.throwError(
        api.generateUnhandledTermInterpolationError(input),
      )
      break
    case 'static-term':
      api.process_codeCard_nestedChildren_staticTerm(input)
      break
  }
}

export function process_codeCard_nestedChildren_staticTerm(
  input: APIInputType,
): void {
  const term = api.resolveStaticTermFromNest(input)
  switch (term) {
    case 'bear': {
      api.process_codeCard_bear(input)
      break
    }
    case 'load': {
      api.process_codeCard_load(input)
      break
    }
    case 'fuse': {
      api.process_codeCard_fuse(input)
      break
    }
    case 'tree': {
      api.process_codeCard_tree(input)
      break
    }
    case 'face': {
      api.process_codeCard_face(input)
      break
    }
    case 'host': {
      api.process_codeCard_host(input)
      break
    }
    case 'form': {
      api.process_codeCard_form(input)
      break
    }
    case 'suit': {
      api.process_codeCard_suit(input)
      break
    }
    case 'task': {
      api.process_codeCard_task(input)
      break
    }
    case 'note': {
      api.process_codeCard_note(input)
      break
    }
    default: {
      api.throwError(api.generateUnknownTermError(input))
    }
  }
}

export function resolve_codeCard(
  base: Base,
  link: string,
): void {
  const card = base.card(link)
  api.assertAST(card.seed, AST.CodeModule)

  if (card.seed.partial) {
    card.seed.children.forEach(node => {
      switch (node.like) {
        case AST.Import:
          if (node.partial) {
          }
          break
        case AST.Export:
          break
      }
    })

    if (api.childrenAreComplete(card.seed)) {
      const seed: ASTFullType<AST.CodeModule> = {
        allClassAST: {},
        allClassInterfaceAST: {},
        allComponentAST: {},
        allConstantAST: {},
        allFunctionAST: {},
        allTemplateAST: {},
        allTestAST: {},
        base: card.seed.base,
        callbackAST: {},
        complete: false,
        constantAST: {},
        directory: card.seed.directory,
        exportList: [],
        importTree: [],
        like: AST.CodeModule,
        nativeClassInterfaceAST: {},
        parseTree: card.seed.parseTree,
        partial: false,
        path: card.seed.path,
        publicClassAST: {},
        publicClassInterfaceAST: {},
        publicComponentAST: {},
        publicConstantAST: {},
        publicFunctionAST: {},
        publicNativeClassInterfaceAST: {},
        publicTemplateAST: {},
        publicTestAST: {},
        textByLine: card.seed.textByLine,
      }

      card.seed.children.forEach(node => {
        switch (node.like) {
          case AST.Constant: {
            api.assertASTFull(node, AST.Constant)
            if (!node.hidden) {
              seed.publicConstantAST[node.name] = node
            }
            seed.allConstantAST[node.name] = node
            break
          }
          case AST.ClassInterface: {
            api.assertASTFull(node, AST.ClassInterface)
            if (!node.hidden) {
              seed.publicClassInterfaceAST[node.name] = node
            }
            seed.allClassInterfaceAST[node.name] = node
            break
          }
          case AST.Function: {
            api.assertASTFull(node, AST.Function)
            if (!node.hidden) {
              seed.publicFunctionAST[node.name] = node
            }
            seed.allFunctionAST[node.name] = node
            break
          }
          case AST.Class: {
            api.assertASTFull(node, AST.Class)
            if (!node.hidden) {
              seed.publicClassAST[node.name] = node
            }
            seed.allClassAST[node.name] = node
            break
          }
          case AST.Template:
            api.assertASTFull(node, AST.Template)
            if (!node.hidden) {
              seed.publicTemplateAST[node.name] = node
            }
            seed.allTemplateAST[node.name] = node
            break
        }
      })
    }
  }
}
