import { api } from '~server'
import { Nest, Scope, ScopeType } from '~server/type'

export function process_codeCard_like(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    process_codeCard_like_nestedChildren(nestedScope)
  })
}

export function process_codeCard_like_free(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_like_head(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_like_list(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_like_mesh(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_like_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTerm(scope)
      switch (term) {
        case 'head':
          api.process_codeCard_like_head(scope)
          break
        case 'like':
          api.process_codeCard_like(scope)
          break
        case 'list':
          api.process_codeCard_like_list(scope)
          break
        case 'mesh':
          api.process_codeCard_like_mesh(scope)
          break
        case 'take':
          api.process_codeCard_like_take(scope)
          break
        case 'free':
          api.process_codeCard_like_free(scope)
          break
        case 'term':
          api.process_codeCard_like_term(scope)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

export function process_codeCard_like_take(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_like_term(
  scope: ScopeType<Scope.Nest>,
): void {}
