import {
  Link,
  Mesh,
  MeshFullType,
  MeshTerm_FullType,
  SiteScopeType,
  code,
} from '~'
import type {
  MeshConstant_FullType,
  MeshInputType,
  MeshPartialType,
} from '~'

export * from './bear/index.js'
export * from './save/index.js'

export function createStringConstant(
  name: string,
  value: string,
): MeshConstant_FullType {
  return {
    complete: true,
    hidden: false,
    like: Mesh.Constant,
    name,
    partial: false,
    value: {
      complete: true,
      like: Mesh.String,
      partial: false,
      string: value,
    },
  }
}

export function createTerm(name: string): MeshTerm_FullType {
  return {
    complete: true,
    dive: false,
    like: Mesh.Term,
    name,
    nest: [],
    partial: false,
  }
}

export function generateFullImportVariable(
  input: MeshPartialType<Mesh.ImportVariable>,
): MeshFullType<Mesh.ImportVariable> {
  let rename
  let name
  let scope

  input.children.forEach(node => {
    if (!node.partial) {
      switch (node.like) {
        case Mesh.Constant:
          switch (node.name) {
            case 'scope':
              scope = code.getStringConstant(node)
              break
            case 'name':
              name = rename = code.getStringConstant(node)
              break
            default:
              break
          }
          break
        case Mesh.ImportVariableRename:
          rename = node.name
          break
        default:
          break
      }
    }
  })

  code.assertString(name)
  code.assertString(scope)
  code.assertString(rename)

  return {
    complete: true,
    like: Mesh.ImportVariable,
    name,
    partial: false,
    rename,
    scope,
  }
}

export function getBooleanConstant(
  c: MeshFullType<Mesh.Constant>,
): boolean {
  if (
    c.value &&
    'like' in c.value &&
    c.value.like === Mesh.Boolean
  ) {
    return c.value.boolean
  } else {
    throw Error('Oops')
  }
}

export function getStringConstant(
  c: MeshFullType<Mesh.Constant>,
): string {
  if (
    c.value &&
    'like' in c.value &&
    c.value.like === Mesh.String
  ) {
    return c.value.string
  } else {
    throw Error('Oops')
  }
}

export function process_codeCard_load_find(
  input: MeshInputType,
): void {
  const find: MeshPartialType<Mesh.ImportVariable> = {
    children: [],
    like: Mesh.ImportVariable,
    partial: true,
  }

  const load = code.assumeBranchAsMeshPartialType(
    input,
    Mesh.Import,
  )
  load.children.push(find)

  const childInput = code.withBranch(input, find)

  const nest = code.assumeLinkType(input, Link.Tree)
  nest.nest.forEach((nest, index) => {
    code.process_codeCard_load_find_nestedChildren(
      code.withEnvironment(childInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_load_find_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  if (type === 'static-term') {
    const term = code.resolveStaticTermFromNest(input)
    const nest = code.assumeNest(input)
    code.assertString(term)
    const index = code.assumeNestIndex(input)

    if (index > 0) {
      switch (term) {
        case 'save':
          code.process_codeCard_load_find_save(input)
          break
        case 'bear':
          code.process_codeCard_load_find_bear(input)
          break
        default:
          code.throwError(code.generateUnknownTermError(input))
      }
    } else {
      const find = code.assumeBranchAsMeshPartialType(
        input,
        Mesh.ImportVariable,
      )
      code.assertLinkType(nest, Link.Tree)
      const scope = term
      const nestedNest = nest.nest[0]
      code.assertGenericLinkType(nestedNest)
      const nestedInput = code.withEnvironment(input, {
        index: 0,
        nest: nestedNest,
      })
      const name = code.resolveStaticTermFromNest(nestedInput)
      code.assertString(name)
      find.children.push(
        code.createStringConstant('scope', scope),
        code.createStringConstant('name', name),
      )
    }
  } else {
    code.throwError(code.generateUnhandledTermCaseError(input))
  }
}
