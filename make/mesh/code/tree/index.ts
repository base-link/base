import { Link, LinkNodeType, Mesh, MeshFullType, code } from '~'
import type { MeshInputType } from '~'

export * from './hook/index.js'

export function generateFullTemplate(
  input: MeshInputType,
): MeshFullType<Mesh.Template> {
  const children = code.assumeChildren(input)

  const inputList = children.filter(
    (node): node is MeshFullType<Mesh.Input> =>
      code.isMeshFullType(node, Mesh.Input),
  )

  const linkList = children.filter((node): node is LinkNodeType =>
    code.isGenericLinkType(node),
  )

  const hidden =
    code.findFullBooleanConstantByName(input, 'hidden') ?? false
  const name = code.findFullStringConstantByName(input, 'name')

  const inputs = code.keyBy(inputList, 'name')

  code.assertString(name)

  return {
    complete: false,
    hidden,
    inputs,
    like: Mesh.Template,
    link: linkList,
    name,
    partial: false,
  }
}

export function process_codeCard_tree(input: MeshInputType): void {
  const tree = code.createMeshPartial(Mesh.Template, input.scope)
  code.pushIntoParentObject(input, tree)

  const treeInput = code.withBranch(input, tree)

  code
    .assumeLinkType(treeInput, Link.Tree)
    .nest.forEach((nest, index) => {
      code.process_codeCard_tree_nestedChildren(
        code.withEnvironment(treeInput, {
          index,
          nest,
        }),
      )
    })

  code.replaceIfComplete(treeInput, tree, () =>
    code.generateFullTemplate(treeInput),
  )
}

export function process_codeCard_tree_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  if (type === 'static-term') {
    const name = code.assumeTerm(input)
    const index = code.assumeNestIndex(input)
    if (index === 0) {
      code.pushIntoParentObject(
        input,
        code.createStringConstant('name', name),
      )
    } else {
      switch (name) {
        case 'take':
          code.process_codeCard_link(input)
          break
        case 'hook':
          code.process_codeCard_tree_hook(input)
          break

        case 'head':
          code.process_codeCard_head(input)
          break
        default:
          code.throwError(code.generateUnknownTermError(input))
      }
    }
  } else {
    code.throwError(code.generateUnhandledTermCaseError(input))
  }
}
