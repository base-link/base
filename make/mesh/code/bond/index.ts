import { LinkHint, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_bond(
  input: SiteProcessInputType,
): void {
  process_codeCard_bond_nestedChildren(input)
}

export function process_codeCard_bond_code(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_bond_comb(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_bond_loan(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_bond_mark(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_bond_move(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_bond_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveTerm(input)
      switch (term) {
        case 'loan':
          code.process_codeCard_bond_loan(input)
          break
        case 'read':
          code.process_codeCard_bond_read(input)
          break
        case 'move':
          code.process_codeCard_bond_move(input)
          break
        case 'term':
          code.process_codeCard_bond_term(input)
          break
        case 'text':
          code.process_codeCard_bond_text(input)
          break
        case 'mark':
          code.process_codeCard_bond_mark(input)
          break
        case 'comb':
          code.process_codeCard_bond_comb(input)
          break
        case 'code':
          code.process_codeCard_bond_code(input)
          break
        case 'wave':
          code.process_codeCard_bond_wave(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function process_codeCard_bond_read(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_bond_term(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_bond_text(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_bond_wave(
  input: SiteProcessInputType,
): void {}
