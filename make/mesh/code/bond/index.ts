import { LinkHint, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_bond(
  input: MeshInputType,
): void {
  process_codeCard_bond_nestedChildren(input)
}

export function process_codeCard_bond_code(
  input: MeshInputType,
): void {}

export function process_codeCard_bond_comb(
  input: MeshInputType,
): void {}

export function process_codeCard_bond_loan(
  input: MeshInputType,
): void {}

export function process_codeCard_bond_mark(
  input: MeshInputType,
): void {}

export function process_codeCard_bond_move(
  input: MeshInputType,
): void {}

export function process_codeCard_bond_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
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
          code.throwError(
            code.generateUnhandledTermCaseError(input),
          )
      }
      break
    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}

export function process_codeCard_bond_read(
  input: MeshInputType,
): void {}

export function process_codeCard_bond_term(
  input: MeshInputType,
): void {}

export function process_codeCard_bond_text(
  input: MeshInputType,
): void {}

export function process_codeCard_bond_wave(
  input: MeshInputType,
): void {}
