import {
  Link,
  MESH_BOOLEAN_LINK_TYPE,
  MESH_TERM_LINK_TYPE,
  Mesh,
  code,
} from '~'
import type { SiteProcessInputType } from '~'

export * from './base/index.js'
export * from './case/index.js'
export * from './wear/index.js'

export function process_codeCard_form(
  input: SiteProcessInputType,
): void {
  const container = code.createContainerScope(input)
  const scope = code.createStepScope(container)
  const red = code.pushRed(input, code.createRedGather(input, 'class'))
  const blue = code.pushBlue(input, 'classes', {
    callbacks: [],
    interfaces: [],
    methods: [],
    parents: [],
    properties: [],
    type: Mesh.Class,
    typeInputs: [],
  })

  const scopeInput = code.withScope(input, scope)
  const colorInput = code.withColors(scopeInput, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(colorInput.base, () => {
      code.process_codeCard_form_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function process_codeCard_form_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  if (type === 'static-term') {
    const index = code.assumeLinkIndex(input)
    if (index === 0) {
      code.process_first_staticTerm(input, 'name')
    } else {
      const term = code.assumeTermString(input)
      switch (term) {
        case 'link':
          code.process_codeCard_link(input, 'properties')
          break
        case 'task':
          code.process_codeCard_task(input, 'methods')
          break
        case 'head':
          code.process_codeCard_head(input)
          break
        case 'wear':
          code.process_codeCard_form_wear(input)
          break
        case 'base':
          code.process_codeCard_form_base(input)
          break
        case 'case':
          code.process_codeCard_formCase(input)
          break
        case 'fuse':
          code.process_codeCard_fuse(input)
          break
        case 'hold':
          code.process_codeCard_hold(input)
          break
        case 'stem':
          code.process_codeCard_stem(input)
          break
        case 'note':
          code.process_codeCard_note(input)
          break
        case 'like':
          code.process_codeCard_like(input)
          break
        default:
          code.throwError(code.generateUnknownTermError(input))
      }
    }
  } else {
    code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}
