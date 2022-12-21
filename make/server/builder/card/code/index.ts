import { Base, api } from '~server'
import type {
  ASTCodeCardType,
  NestedPartial,
  Scope,
  ScopeType,
} from '~server'
import shared from '~shared'

export * from './bear'
export * from './face'
export * from './form'
export * from './fuse'
export * from './host'
export * from './load'
export * from './note'
export * from './suit'
export * from './task'
export * from './tree'
export * from './zone'

export function process_codeCard(
  base: Base,
  link: string,
): void {
  const text = api.readTextFile(base, link)
  const textTree = api.parseTextIntoTree(text)
  const linkHost = api.getLinkHost(link)
  const card = base.card(link)
  const scope: LexicalScope<NestedPartial<ASTCodeCardType>> =
    api.extendScope({
      allSuitMesh: {},
      allTaskMesh: {},
      allTestMesh: {},
      allTreeMesh: {},
      base,
      bearList: [],
      directory: linkHost,
      faceMesh: {},
      findMesh: {},
      formMesh: {},
      hookMesh: {},
      hostMesh: {},
      like: 'code-card',
      loadList: [],
      loadMesh: {},
      parseTree: textTree,
      path: link,
      publicFaceMesh: {},
      publicFormMesh: {},
      publicHostMesh: {},
      publicSuitMesh: {},
      publicTaskMesh: {},
      publicTestMesh: {},
      publicTreeMesh: {},
      textByLine: text.split('\n'),
    })

  card.bind(scope)

  if (textTree.like === 'nest') {
    textTree.nest.forEach(nest => {
      const nestedScope = api.extendScope({ nest }, scope)
      api.process_codeCard_nestedChildren(nestedScope)
    })
  }

  // this.mintCodeCardMesh(fork)
}

export function process_codeCard_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  if (api.nestHasSlot(scope.data.nest)) {
    api.throwError(
      api.generateUnhandledTermInterpolationError(scope),
    )
  } else if (shared.isSimpleTerm(scope.data.nest)) {
    api.process_codeCard_nestedChildren_simpleTerm(scope)
  }
}

export function process_codeCard_nestedChildren_simpleTerm(
  scope: ScopeType<Scope.Nest>,
): void {
  const term = shared.getSimpleTerm(scope.data.nest)
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
