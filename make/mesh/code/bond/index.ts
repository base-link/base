import { LinkHint, code } from '~'
import type { SiteProcessInputType } from '~'

export function load_codeCard_bond(input: SiteProcessInputType): void {
  load_codeCard_bond_nestedChildren(input)
}

export function load_codeCard_bond_code(
  input: SiteProcessInputType,
): void {}

export function load_codeCard_bond_comb(
  input: SiteProcessInputType,
): void {}

export function load_codeCard_bond_loan(
  input: SiteProcessInputType,
): void {}

export function load_codeCard_bond_mark(
  input: SiteProcessInputType,
): void {}

export function load_codeCard_bond_move(
  input: SiteProcessInputType,
): void {}

export function load_codeCard_bond_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveTermString(input)
      switch (term) {
        case 'loan':
          code.load_codeCard_bond_loan(input)
          break
        case 'read':
          code.load_codeCard_bond_read(input)
          break
        case 'move':
          code.load_codeCard_bond_move(input)
          break
        case 'term':
          code.load_codeCard_bond_term(input)
          break
        case 'text':
          code.load_codeCard_bond_text(input)
          break
        case 'mark':
          code.load_codeCard_bond_mark(input)
          break
        case 'comb':
          code.load_codeCard_bond_comb(input)
          break
        case 'code':
          code.load_codeCard_bond_code(input)
          break
        case 'wave':
          code.load_codeCard_bond_wave(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function load_codeCard_bond_read(
  input: SiteProcessInputType,
): void {}

export function load_codeCard_bond_term(
  input: SiteProcessInputType,
): void {}

export function load_codeCard_bond_text(
  input: SiteProcessInputType,
): void {}

export function load_codeCard_bond_wave(
  input: SiteProcessInputType,
): void {}
