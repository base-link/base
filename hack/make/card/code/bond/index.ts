import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function load_codeCard_bond(load: MeshLoad): void {
  load_codeCard_bond_leadLink(load)
}

export function load_codeCard_bond_code(load: MeshLoad): void {}

export function load_codeCard_bond_comb(load: MeshLoad): void {}

export function load_codeCard_bond_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = card.resolveTermString(load)
      switch (term) {
        case 'loan':
          card.load_codeCard_bond_loan(load)
          break
        case 'read':
          card.load_codeCard_bond_read(load)
          break
        case 'move':
          card.load_codeCard_bond_move(load)
          break
        case 'term':
          card.load_codeCard_bond_term(load)
          break
        case 'text':
          card.load_codeCard_bond_text(load)
          break
        case 'mark':
          card.load_codeCard_bond_mark(load)
          break
        case 'comb':
          card.load_codeCard_bond_comb(load)
          break
        case 'code':
          card.load_codeCard_bond_code(load)
          break
        case 'wave':
          card.load_codeCard_bond_wave(load)
          break
        default:
          card.throwError(card.generateUnhandledTermCaseError(load))
      }
      break
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

export function load_codeCard_bond_loan(load: MeshLoad): void {}

export function load_codeCard_bond_mark(load: MeshLoad): void {}

export function load_codeCard_bond_move(load: MeshLoad): void {}

export function load_codeCard_bond_read(load: MeshLoad): void {}

export function load_codeCard_bond_term(load: MeshLoad): void {}

export function load_codeCard_bond_text(load: MeshLoad): void {}

export function load_codeCard_bond_wave(load: MeshLoad): void {}
