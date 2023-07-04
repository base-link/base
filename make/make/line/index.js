#!/usr/bin/env node
import commander from 'commander';
const program = new commander.Command();
const link = program.command('link');
link
    .command('deck')
    .argument('[deck]')
    .action((deck) => {
    if (deck) {
        linkDeck(deck);
    }
    else {
        linkSelfBase();
    }
});
function linkSelfBase() {
    console.log('linkSelfBase');
}
function linkDeck(deck) {
    console.log('linkDeck', deck);
}
//# sourceMappingURL=index.js.map