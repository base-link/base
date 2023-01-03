import {
  Link,
  LinkHint,
  LinkNodeType,
  Mesh,
  MeshFullType,
  code,
} from '~'
import type { MeshInputType } from '~'

export function attemptResolveFuse(input: MeshInputType): void {
  const name = code.findFullStringConstantByName(input, 'name')
  code.assertString(name)

  const templateMesh = code.getEnvironmentProperty(
    input.environment,
    'allTemplateMesh',
  )

  if (code.isRecord(templateMesh)) {
    const template = templateMesh[name]
    if (!template) {
      return // not yet
    }

    const nodes = code.evaluateTemplate(input)
  }
}

export function evaluateTemplate(
  input: MeshInputType,
): Array<LinkNodeType> {
  const result: Array<LinkNodeType> = []

  return result
}

export function process_codeCard_fuse(input: MeshInputType): void {
  const fuse = code.createMeshPartial(Mesh.Inject, input.scope)
  code.pushIntoParentObject(input, fuse)

  const card = input.module
  code.assertMeshType(card, Mesh.CodeModule)

  const fuseInput = code.withBranch(input, fuse)

  code.assumeLinkType(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_fuse_nestedChildren(
      code.withEnvironment(fuseInput, {
        index,
        nest,
      }),
    )
  })

  // if the terms all pass interpolation
  if (code.childrenAreComplete(fuse)) {
    code.attemptResolveFuse(fuseInput)
  }
  // code.replaceIfComplete(fuseInput, fuse, () =>
  //   code.generateFullInject(fuseInput),
  // )
}

export function process_codeCard_fuse_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const index = code.assumeNestIndex(input)
      const term = code.assumeTerm(input)
      if (index === 0) {
        code.pushIntoParentObject(
          input,
          code.createStringConstant('name', term),
        )
      } else {
        switch (term) {
          case 'bind':
            code.process_codeCard_bind(input)
            break
          case 'mark':
            code.process_codeCard_bond_mark(input)
            break
          case 'loan':
            code.process_codeCard_bond_loan(input)
            break
          case 'term':
            code.process_codeCard_term(input)
            break
          default:
            code.throwError(code.generateUnhandledTermCaseError(input))
        }
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledTermCaseError(input))
  }
}
