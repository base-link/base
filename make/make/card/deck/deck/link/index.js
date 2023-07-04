import card from '../../../../../make/card.js';
export function load_deckCard_deck_link(load) {
    const text = card.assumeText(load);
    card.assertStringPattern(load, text, /^@[a-z0-9]+\/[a-z0-9]+$/);
    const [host, name] = card.splitPackageModuleName(text);
    card.assertString(host);
    card.assertString(name);
    const hostString = card.createBlueString(host);
    const nameString = card.createBlueString(name);
    card.pushRed(load, card.createRedGather(load, 'link', [hostString, nameString]));
    card.attachBlue(load, 'host', hostString);
    card.attachBlue(load, 'name', nameString);
}
export function splitPackageModuleName(string) {
    const [host, name] = string.split('/');
    const array = [];
    if (host) {
        array.push(host.replace(/^@/, ''));
    }
    if (name) {
        array.push(name);
    }
    return array;
}
//# sourceMappingURL=index.js.map