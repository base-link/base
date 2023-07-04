import card from '../../../../make/card.js';
export function load_codeCard_bond(load) {
    load_codeCard_bond_nestedChildren(load);
}
export function load_codeCard_bond_code(load) { }
export function load_codeCard_bond_comb(load) { }
export function load_codeCard_bond_loan(load) { }
export function load_codeCard_bond_mark(load) { }
export function load_codeCard_bond_move(load) { }
export function load_codeCard_bond_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = card.resolveTermString(load);
            switch (term) {
                case 'loan':
                    card.load_codeCard_bond_loan(load);
                    break;
                case 'read':
                    card.load_codeCard_bond_read(load);
                    break;
                case 'move':
                    card.load_codeCard_bond_move(load);
                    break;
                case 'term':
                    card.load_codeCard_bond_term(load);
                    break;
                case 'text':
                    card.load_codeCard_bond_text(load);
                    break;
                case 'mark':
                    card.load_codeCard_bond_mark(load);
                    break;
                case 'comb':
                    card.load_codeCard_bond_comb(load);
                    break;
                case 'code':
                    card.load_codeCard_bond_code(load);
                    break;
                case 'wave':
                    card.load_codeCard_bond_wave(load);
                    break;
                default:
                    card.throwError(card.generateUnhandledTermCaseError(load));
            }
            break;
        default:
            card.throwError(card.generateUnhandledNestCaseError(load, type));
    }
}
export function load_codeCard_bond_read(load) { }
export function load_codeCard_bond_term(load) { }
export function load_codeCard_bond_text(load) { }
export function load_codeCard_bond_wave(load) { }
//# sourceMappingURL=index.js.map