export function load_codeCard_bond(load: code.MeshLoad): void {
  load_codeCard_bond_nestedChildren(load)
}

export function load_codeCard_bond_code(load: code.MeshLoad): void {}

export function load_codeCard_bond_comb(load: code.MeshLoad): void {}

export function load_codeCard_bond_loan(load: code.MeshLoad): void {}

export function load_codeCard_bond_mark(load: code.MeshLoad): void {}

export function load_codeCard_bond_move(load: code.MeshLoad): void {}

export function load_codeCard_bond_nestedChildren(
  load: code.MeshLoad,
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

export function load_codeCard_bond_read(load: code.MeshLoad): void {}

export function load_codeCard_bond_term(load: code.MeshLoad): void {}

export function load_codeCard_bond_text(load: code.MeshLoad): void {}

export function load_codeCard_bond_wave(load: code.MeshLoad): void {}
