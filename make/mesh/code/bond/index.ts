import { LinkHint, code } from '~'
import type { MeshLoad } from '~'

export function load_codeCard_bond(load: MeshLoad): void {
  load_codeCard_bond_nestedChildren(load)
}

export function load_codeCard_bond_code(load: MeshLoad): void {}

export function load_codeCard_bond_comb(load: MeshLoad): void {}

export function load_codeCard_bond_loan(load: MeshLoad): void {}

export function load_codeCard_bond_mark(load: MeshLoad): void {}

export function load_codeCard_bond_move(load: MeshLoad): void {}

export function load_codeCard_bond_nestedChildren(
  load: MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.resolveTermString(load)
      switch (term) {
        case 'loan':
          code.load_codeCard_bond_loan(load)
          break
        case 'read':
          code.load_codeCard_bond_read(load)
          break
        case 'move':
          code.load_codeCard_bond_move(load)
          break
        case 'term':
          code.load_codeCard_bond_term(load)
          break
        case 'text':
          code.load_codeCard_bond_text(load)
          break
        case 'mark':
          code.load_codeCard_bond_mark(load)
          break
        case 'comb':
          code.load_codeCard_bond_comb(load)
          break
        case 'code':
          code.load_codeCard_bond_code(load)
          break
        case 'wave':
          code.load_codeCard_bond_wave(load)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(load))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

export function load_codeCard_bond_read(load: MeshLoad): void {}

export function load_codeCard_bond_term(load: MeshLoad): void {}

export function load_codeCard_bond_text(load: MeshLoad): void {}

export function load_codeCard_bond_wave(load: MeshLoad): void {}
