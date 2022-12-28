import {
  APIInputType,
  AST,
  ASTPartialType,
  ASTScopeType,
  ASTType,
  AST_FullTypeMixin,
  AST_PartialTypeMixin,
  api,
} from '~'

export function assumeObjectScope(
  input: APIInputType,
  rank = 0,
): ASTScopeType {
  const scope = api.getObjectScope(input, rank)
  api.assertScope(scope)
  return scope
}

export function childrenAreComplete({
  children,
}: {
  children: Array<AST_PartialTypeMixin | AST_FullTypeMixin>
}): boolean {
  return children.filter(x => x.partial).length === 0
}

export function getObjectScope(
  input: APIInputType,
  rank = 0,
): ASTScopeType | undefined {
  let scope: ASTScopeType | undefined = input.objectScope
  while (rank > 0 && scope) {
    scope = scope.parent
    rank--
  }
  return scope
}

export function process_codeCard_tree(
  input: APIInputType,
): void {
  const tree: ASTPartialType<AST.Template> = {
    children: [],
    like: AST.Template,
    partial: true,
  }

  const treeInput = api.extendWithObjectScope(input, tree)

  api.assumeNest(treeInput).nest.forEach((nest, index) => {
    api.process_codeCard_tree_nestedChildren(
      api.extendWithNestScope(treeInput, {
        index,
        nest,
      }),
    )
  })

  // if (api.childrenAreComplete(tree)) {
  //   api.replaceASTChild(input, tree, {
  //     like: AST.Template,
  //     partial: false,
  //   })
  // }
}

export function process_codeCard_tree_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const name = api.assumeStaticTermFromNest(input)
    const index = api.assumeNestIndex(input)
    if (index === 0) {
      const tree = api.assumeInputObjectAsASTPartialType(
        input,
        AST.Template,
      )
      const fullTerm: ASTType<AST.Term> = {
        dive: false,
        like: AST.Term,
        name,
        nest: [],
        partial: false,
      }
      tree.children.push(fullTerm)
    } else {
      switch (name) {
        case 'take':
          api.process_codeCard_link(input)
          break
        case 'hook':
          api.process_codeCard_hook(input)
          break
        case 'head':
          api.process_codeCard_head(input)
          break
        default:
          api.throwError(api.generateUnknownTermError(input))
      }
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

export function replaceASTChild<
  A extends AST,
  X extends ASTPartialType<AST>,
  B extends ASTType<AST>,
>(input: APIInputType, a: A, x: X, b: B): void {
  const { data } = api.assumeObjectScope(input, 1)
  api.assertASTPartial(data, a)
  api.assertArray(data.children)
  const index = data.children.indexOf(x)
  data.children[index] = b
}
