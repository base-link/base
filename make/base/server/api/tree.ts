import { ASTTreeLinkType, BaseTreeMixinType } from '../type'

export default <BaseTreeMixinType>{
  makeTreeLink(
    name: string,
    base: ASTTreeLinkType,
  ): ASTTreeLinkType {
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
