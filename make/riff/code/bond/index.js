import { LinkHint, code } from '../../../index.js';
export function process_codeCard_bond(input) {
    process_codeCard_bond_nestedChildren(input);
}
export function process_codeCard_bond_code(input) { }
export function process_codeCard_bond_comb(input) { }
export function process_codeCard_bond_loan(input) { }
export function process_codeCard_bond_mark(input) { }
export function process_codeCard_bond_move(input) { }
export function process_codeCard_bond_nestedChildren(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = code.resolveTermString(input);
            switch (term) {
                case 'loan':
                    code.process_codeCard_bond_loan(input);
                    break;
                case 'read':
                    code.process_codeCard_bond_read(input);
                    break;
                case 'move':
                    code.process_codeCard_bond_move(input);
                    break;
                case 'term':
                    code.process_codeCard_bond_term(input);
                    break;
                case 'text':
                    code.process_codeCard_bond_text(input);
                    break;
                case 'mark':
                    code.process_codeCard_bond_mark(input);
                    break;
                case 'comb':
                    code.process_codeCard_bond_comb(input);
                    break;
                case 'code':
                    code.process_codeCard_bond_code(input);
                    break;
                case 'wave':
                    code.process_codeCard_bond_wave(input);
                    break;
                default:
                    code.throwError(code.generateUnhandledTermCaseError(input));
            }
            break;
        default:
            code.throwError(code.generateUnhandledNestCaseError(input, type));
    }
}
export function process_codeCard_bond_read(input) { }
export function process_codeCard_bond_term(input) { }
export function process_codeCard_bond_text(input) { }
export function process_codeCard_bond_wave(input) { }
//# sourceMappingURL=index.js.map