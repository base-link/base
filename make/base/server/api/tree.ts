import { CompilerTreeType } from '../type/compiler'

export function makeTreeLink(
  name: string,
  base: CompilerTreeType,
): CompilerTreeType {
  const link: CompilerTreeType = {
    like: 'compiler-tree',
    base,
    slot: base.link.length,
    name,
    link: [],
    size: 0,
  }

  base.link.push(link)

  return link
}
