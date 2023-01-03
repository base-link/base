import { Link, Mesh, code } from '~'
import type {
  MeshInputType,
  MeshPartialType,
  MeshType,
  Mesh_FullTypeMixin,
  Mesh_PartialTypeMixin,
  SiteScopeType,
} from '~'

export * from './hook/index.js'

export function assumeObjectScope(
  input: MeshInputType,
  rank = 0,
): SiteScopeType {
  const scope = code.getObjectScope(input, rank)
  code.assertScope(scope)
  return scope
}

export function childrenAreComplete({
  children,
}: {
  children: Array<Mesh_PartialTypeMixin | Mesh_FullTypeMixin>
}): boolean {
  return children.filter(x => x.partial).length === 0
}

export function getObjectScope(
  input: MeshInputType,
  rank = 0,
): SiteScopeType | undefined {
  let scope: SiteScopeType | undefined = input.objectScope
  while (rank > 0 && scope) {
    scope = scope.parent
    rank--
  }
  return scope
}

export function process_codeCard_tree(
  input: MeshInputType,
): void {
  const tree: MeshPartialType<Mesh.Template> = {
    children: [],
    like: Mesh.Template,
    partial: true,
  }

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

  // if (code.childrenAreComplete(tree)) {
  //   code.replaceMeshChild(input, tree, {
  //     like: Mesh.Template,
  //     partial: false,
  //   })
  // }
}

export function process_codeCard_tree_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  if (type === 'static-term') {
    const name = code.assumeStaticTermFromNest(input)
    const index = code.assumeNestIndex(input)
    if (index === 0) {
      const tree = code.assumeBranchAsMeshPartialType(
        input,
        Mesh.Template,
      )
      const fullTerm: MeshType<Mesh.Term> = {
        complete: true,
        dive: false,
        like: Mesh.Term,
        name,
        nest: [],
        partial: false,
      }
      tree.children.push(fullTerm)
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
