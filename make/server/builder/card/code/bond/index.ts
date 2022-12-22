import { api } from '~server'
import { Nest, Scope, ScopeType } from '~server/type'

export function process_codeCard_bond(
  scope: ScopeType<Scope.Nest>,
): void {
  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(scope, nest, index)
    process_codeCard_bond_nestedChildren(nestedScope)
  })
}

export function process_codeCard_bond_code(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_bond_comb(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_bond_loan(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_bond_mark(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_bond_move(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_bond_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTerm(scope)
      switch (term) {
        case 'loan':
          api.process_codeCard_bond_loan(scope)
          break
        case 'read':
          api.process_codeCard_bond_read(scope)
          break
        case 'move':
          api.process_codeCard_bond_move(scope)
          break
        case 'term':
          api.process_codeCard_bond_term(scope)
          break
        case 'text':
          api.process_codeCard_bond_text(scope)
          break
        case 'mark':
          api.process_codeCard_bond_mark(scope)
          break
        case 'comb':
          api.process_codeCard_bond_comb(scope)
          break
        case 'code':
          api.process_codeCard_bond_code(scope)
          break
        case 'wave':
          api.process_codeCard_bond_wave(scope)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(scope))
  }
}

export function process_codeCard_bond_read(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_bond_term(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_bond_text(
  scope: ScopeType<Scope.Nest>,
): void {}

export function process_codeCard_bond_wave(
  scope: ScopeType<Scope.Nest>,
): void {}
