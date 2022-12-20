import { ASTTreeLinkType } from './type'

export default {
  makeTreeLink(name: string, base: ASTTreeLinkType) {
    const link: ASTTreeLinkType = {
      like: 'tree-link',
      base,
      slot: base.link.length,
      name,
      link: [],
      size: 0,
    }

    base.link.push(link)

    return link
  },
}
