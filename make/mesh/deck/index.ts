import {
  Base,
  Link,
  LinkTreeType,
  Mesh,
  MeshModuleBaseType,
  Site,
  SiteBranchType,
  SiteStepScopeType,
  code,
} from '~'
import type {
  MeshFullType,
  MeshInputType,
  MeshPartialType,
} from '~'

export * from './deck/index.js'

export type MeshParseType = {
  directory: string
  link: LinkTreeType
  path: string
  text: string
  textByLine: Array<string>
}

export function createBranch(
  element: Record<string, unknown>,
  parent?: SiteBranchType,
): SiteBranchType {
  return {
    element,
    parent,
  }
}

export function createInput(
  module: MeshModuleBaseType,
  scope: SiteStepScopeType,
  bindings: Record<string, unknown>,
): MeshInputType {
  return {
    branch: code.createBranch(bindings),
    environment: code.createEnvironment(bindings),
    module,
    scope,
  }
}

export function generate_deckCard(
  input: MeshInputType,
): MeshFullType<Mesh.PackageModule> {
  code.assertMeshPartialType(input.module, Mesh.PackageModule)

  let deck

  input.module.children.forEach(node => {
    switch (node.like) {
      case Mesh.Package:
        deck = node
        break
      default:
        code.throwError(
          code.generateInvalidCompilerStateError(),
        )
    }
  })

  code.assertMeshFullType(deck, Mesh.Package)

  return {
    base: input.module.base,
    complete: true,
    deck,
    directory: input.module.directory,
    like: Mesh.PackageModule,
    link: input.module.link,
    partial: false,
    path: input.module.path,
    scope: input.scope,
    text: input.module.text,
    textByLine: input.module.textByLine,
  }
}

export function handle_deckCard(
  base: Base,
  link: string,
): void {
  code.process_deckCard(base, link)
  code.resolve_deckCard(base, link)
}

export function loadLinkModule(
  base: Base,
  path: string,
): MeshParseType {
  const text = code.readTextFile(base, path)
  const data = code.parseLinkText({ path, text })
  const directory = code.getLinkHost(path)
  return {
    directory,
    ...data,
  }
}

/**
 * Entrypoint function.
 */
export function process_deckCard(
  base: Base,
  link: string,
): void {
  const card = base.card(link)
  const parse = code.loadLinkModule(base, link)
  const container = code.createContainerScope({
    base: { like: 'base' },
    path: { like: 'string' },
    text: { like: 'string' },
  })
  const scope = code.createStepScope(container)
  const seed: MeshPartialType<Mesh.PackageModule> = {
    ...parse,
    base,
    children: [],
    like: Mesh.PackageModule,
    partial: true,
    scope,
  }

  const input: MeshInputType = code.createInput(
    seed,
    scope,
    seed,
  )

  card.bind(seed)

  code.assertLinkType(seed.link, Link.Tree)

  seed.link.nest.forEach((nest, index) => {
    code.process_deckCard_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })

  if (code.childrenAreComplete(seed)) {
    code.replaceSeed(input, code.generate_deckCard(input))
  }
}

export function process_deckCard_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case 'static-term': {
      const term = code.resolveStaticTermFromNest(input)
      switch (term) {
        case 'deck':
          code.process_deckCard_deck(input)
          break
        default:
          code.throwError(
            code.generateUnhandledTermCaseError(input),
          )
      }
      break
    }
    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}

export function replaceSeed<T extends MeshModuleBaseType>(
  input: MeshInputType,
  replacement: T,
): void {
  input.module = replacement
  input.module.base.card(input.module.path).bind(replacement)
}

export function resolve_deckCard(
  base: Base,
  link: string,
): void {
  const card = base.card(link)
  code.assertMeshFullType(card.seed, Mesh.PackageModule)

  // TODO: deck.hint tells us the parser to use on the code.

  const { deck } = card.seed

  if (deck.bear) {
    code.handle_codeCard(base, deck.bear)
  }

  if (deck.test) {
    code.handle_codeCard(base, deck.test)
  }
}

export function withBranch(
  input: MeshInputType,
  element: Record<string, unknown>,
): MeshInputType {
  return {
    ...input,
    branch: code.createBranch(element, input.branch),
  }
}

export function withEnvironment(
  input: MeshInputType,
  bindings: Record<string, unknown>,
): MeshInputType {
  return {
    ...input,
    environment: code.createEnvironment(
      bindings,
      input.environment,
    ),
  }
}

export function withScope(
  input: MeshInputType,
  scope: SiteStepScopeType,
): MeshInputType {
  return {
    ...input,
    scope,
  }
}
