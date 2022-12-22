import { Base, Scope, ScopeType, api } from '~tool'

export * from './bear'
export * from './bind'
export * from './bond'
export * from './face'
export * from './form'
export * from './fuse'
export * from './head'
export * from './hold'
export * from './host'
export * from './like'
export * from './link'
export * from './load'
export * from './note'
export * from './slot'
export * from './stem'
export * from './suit'
export * from './take'
export * from './task'
export * from './test'
export * from './time'
export * from './tree'
export * from './walk'
export * from './zone'

export function process_codeCard(
  base: Base,
  link: string,
): void {
  const text = api.readTextFile(base, link)
  const textTree = api.parseTextIntoTree(text)
  const linkHost = api.getLinkHost(link)
  const card = base.card(link)
  const scope: ScopeType<Scope.CodeCard> = api.extendScope(
    Scope.CodeCard,
    {
      card: {
        allSuitMesh: {},
        allTaskMesh: {},
        allTestMesh: {},
        allTreeMesh: {},
        allZoneMesh: {},
        base,
        bearList: [],
        dependencyWatcherMap: new Map(),
        directory: linkHost,
        faceMesh: {},
        formMesh: {},
        hookMesh: {},
        hostMesh: {},
        like: 'code-card',
        loadList: [],
        parseTree: textTree,
        path: link,
        publicFaceMesh: {},
        publicFormMesh: {},
        publicHostMesh: {},
        publicSuitMesh: {},
        publicTaskMesh: {},
        publicTestMesh: {},
        publicTreeMesh: {},
        publicZoneMesh: {},
        textByLine: text.split('\n'),
      },
    },
  )

  card.bind(scope.data.card)

  if (textTree.like === 'nest') {
    textTree.nest.forEach((nest, index) => {
      const nestedScope = api.extendNest(scope, nest, index)
      api.process_codeCard_nestedChildren(nestedScope)
    })
  }

  // this.mintCodeCardMesh(fork)
}

export function process_codeCard_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case 'dynamic-text':
    case 'dynamic-term':
      api.throwError(
        api.generateUnhandledTermInterpolationError(scope),
      )
      break
    case 'static-term':
      api.process_codeCard_nestedChildren_staticTerm(scope)
      break
  }
}

export function process_codeCard_nestedChildren_staticTerm(
  scope: ScopeType<Scope.Nest>,
): void {
  const term = api.resolveStaticTerm(scope)
  switch (term) {
    case 'bear': {
      api.process_codeCard_bear(scope)
      break
    }
    case 'load': {
      api.process_codeCard_load(scope)
      break
    }
    case 'fuse': {
      api.process_codeCard_fuse(scope)
      break
    }
    case 'tree': {
      api.process_codeCard_tree(scope)
      break
    }
    case 'face': {
      api.process_codeCard_face(scope)
      break
    }
    case 'host': {
      api.process_codeCard_host(scope)
      break
    }
    case 'form': {
      api.process_codeCard_form(scope)
      break
    }
    case 'suit': {
      api.process_codeCard_suit(scope)
      break
    }
    case 'task': {
      api.process_codeCard_task(scope)
      break
    }
    case 'note': {
      api.process_codeCard_note(scope)
      break
    }
    default: {
      api.throwError(api.generateUnknownTermError(scope))
    }
  }
}
