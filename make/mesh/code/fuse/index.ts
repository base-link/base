import { Link, LinkHint, LinkNodeType, Mesh, Nest, code } from '~'
import type { SiteProcessInputType } from '~'

export function attemptResolveFuse(input: SiteProcessInputType): void {
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
  input: SiteProcessInputType,
): Array<LinkNodeType> {
  const result: Array<LinkNodeType> = []

  return result
}

export function process_codeCard_fuse(
  input: SiteProcessInputType,
): void {
  const fuse = code.createNest(Nest.Inject, input.scope)
  code.pushIntoParentObject(input, fuse)

  const fuseInput = code.withElement(input, fuse)

  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_fuse_nestedChildren(
      code.withEnvironment(fuseInput, {
        index,
        nest,
      }),
    )
  })

  // if the terms all pass interpolation
  if (code.childrenAreMesh(fuse)) {
    code.attemptResolveFuse(fuseInput)
  }
  // code.replaceIfBound(fuseInput, fuse, () =>
  //   code.generateFullInject(fuseInput),
  // )
}

export function process_codeCard_fuse_nestedChildren(
  input: SiteProcessInputType,
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
