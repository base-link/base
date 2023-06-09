
// for (directory of directories) {
//   if (!hasLinkFolder(directory)) {
//     continue
//   }

//   const found = findPath(directory, path)
//   if (found) return found
// }
var realpathFS = process.platform !== 'win32' && fs.realpathSync &&
typeof fs.realpathSync.native === 'function' ? fs.realpathSync.native :
fs.realpathSync;

export function findPath(directory: string, card) {
  if (isDirectory(`${directory}/link/hook/${card.host}/${card.deck}`)) {
    const actualPath = getActualPath(`${directory}/link/hook/${card.host}/${card.deck}`)
    // it doesn't need to check the package.json, that is what the installer does.
    // so by this point it is the actual structure.
    if (isFile(`${actualPath}/${card.path}`)) {
      return getActualPath(`${actualPath}/${card.path}`)
    } else if (isDirectory()) {
      if (isFile(`${actualPath}/${card.path}/base.link`)) {
        return getActualPath(`${actualPath}/${card.path}/base.link`)
      }
    }
  }
}

function isDirectory(dir: string) {
  try {
    var stat = fs.statSync(dir, { throwIfNoEntry: false });
  } catch (e) {
    if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false;
    throw e;
  }
  return !!stat && stat.isDirectory();
};
