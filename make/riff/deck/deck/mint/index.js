import { Link, LinkHint, code } from '../../../../index.js';
export function process_deckCard_deck_mint(input) {
    code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
        process_deckCard_deck_mint_nestedChildren(code.withLink(input, nest, index));
    });
}
export function process_deckCard_deck_mint_nestedChildren(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticText:
            const string = code.assumeText(input);
            const blueString = code.createBlueString(string);
            code.pushRed(input, code.createRedValue(input, 'version', blueString));
            code.attachBlue(input, 'mark', blueString);
            break;
        default:
            code.throwError(code.generateUnhandledNestCaseError(input, type));
    }
}
//# sourceMappingURL=index.js.map