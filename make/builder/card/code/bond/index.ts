import { APIInputType, Nest, api } from '~'

export function process_codeCard_bond(
  input: APIInputType,
): void {
  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_bond_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_bond_code(
  input: APIInputType,
): void {}

export function process_codeCard_bond_comb(
  input: APIInputType,
): void {}

export function process_codeCard_bond_loan(
  input: APIInputType,
): void {}

export function process_codeCard_bond_mark(
  input: APIInputType,
): void {}

export function process_codeCard_bond_move(
  input: APIInputType,
): void {}

export function process_codeCard_bond_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm:
      const term = api.resolveStaticTermFromNest(input)
      switch (term) {
        case 'loan':
          api.process_codeCard_bond_loan(input)
          break
        case 'read':
          api.process_codeCard_bond_read(input)
          break
        case 'move':
          api.process_codeCard_bond_move(input)
          break
        case 'term':
          api.process_codeCard_bond_term(input)
          break
        case 'text':
          api.process_codeCard_bond_text(input)
          break
        case 'mark':
          api.process_codeCard_bond_mark(input)
          break
        case 'comb':
          api.process_codeCard_bond_comb(input)
          break
        case 'code':
          api.process_codeCard_bond_code(input)
          break
        case 'wave':
          api.process_codeCard_bond_wave(input)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

export function process_codeCard_bond_read(
  input: APIInputType,
): void {}

export function process_codeCard_bond_term(
  input: APIInputType,
): void {}

export function process_codeCard_bond_text(
  input: APIInputType,
): void {}

export function process_codeCard_bond_wave(
  input: APIInputType,
): void {}
