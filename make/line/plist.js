import fs from 'fs';
import plist from 'plist';
const data = fs.readFileSync('Solarized Dark.itermcolors', 'utf8');
const colors = plist.parse(data);
console.log(colors);
// Once a color scheme is imported into iTerm2, it's saved in the iTerm2's "Preferences" file rather than as a separate .itermcolors file. This preferences file is typically located at ~/Library/Preferences/com.googlecode.iterm2.plist, but it doesn't contain individual .itermcolors files that you could read.
// https://github.com/altercation/solarized/blob/master/iterm2-colors-solarized/Solarized%20Dark.itermcolors
// Solarized: Solarized is a widely acclaimed color palette that offers both light and dark themes. It is designed to reduce eye strain and provide a pleasant visual experience.
// Dracula: Dracula is a dark theme with vibrant colors and high contrast. It has become quite popular and is available for many different terminal emulators.
// Nord: Nord is a unified color scheme that aims for a clean and modern look. It offers both light and dark variants and has gained popularity among developers.
// Gruvbox: Gruvbox is a retro-inspired color scheme that provides a warm and nostalgic feel. It has dark and light variants and is well-liked for its soothing colors.
// Monokai: Monokai is a classic and widely used color scheme that is known for its vibrant and eye-catching colors. It has a dark background with bright syntax highlighting.
// One Dark: One Dark is a popular theme based on the Atom editor's default color scheme. It offers a sleek and modern look with a dark background and vivid syntax highlighting.
// Oceanic Next: Oceanic Next is a theme inspired by the Oceanic color palette. It features dark blue and green tones and is favored by many developers.
// Material: Material is a theme inspired by Google's Material Design guidelines. It aims for a clean and minimalistic look, with subtle colors and flat design elements.
//# sourceMappingURL=plist.js.map