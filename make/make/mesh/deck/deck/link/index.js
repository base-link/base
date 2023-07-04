export function load_deckCard_deck_link(load) {
    const text = code.assumeText(load);
    code.assertStringPattern(load, text, /^@[a-z0-9]+\/[a-z0-9]+$/);
    const [host, name] = code.splitPackageModuleName(text);
    code.assertString(host);
    code.assertString(name);
    const hostString = code.createBlueString(host);
    const nameString = code.createBlueString(name);
    code.pushRed(load, code.createRedGather(load, 'link', [hostString, nameString]));
    code.attachBlue(load, 'host', hostString);
    code.attachBlue(load, 'name', nameString);
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