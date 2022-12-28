import { APIInputType, AST, ASTPartialType, api } from '~'

export * from './base'
export * from './case'
export * from './task'
export * from './wear'

export function process_codeCard_form(
  input: APIInputType,
): void {
  const form: ASTPartialType<AST.Class> = {
    callback: {},
    interface: {},
    like: AST.Class,
    method: {},
    parent: [],
    partial: true,
    property: {},
  }

  const formInput = api.extendWithObjectScope(input, form)

  api.assumeNest(formInput).nest.forEach((nest, index) => {
    api.process_codeCard_form_nestedChildren(
      api.extendWithNestScope(formInput, {
        index,
        nest,
      }),
    )
  })

  api.assertASTPartial(input.card, AST.CodeModule)

  api.assertString(form.name, () =>
    api.generateTermMissingError(input, 'name', 'form'),
  )

  input.card.publicFormAST[form.name] = form
}

export function process_codeCard_form_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.assumeStaticTermFromNest(input)
    const index = api.assumeNestIndex(input)
    if (index === 0) {
      const form = api.assumeInputObjectAsASTPartialType(
        input,
        AST.Class,
      )
      form.name = term
    } else {
      switch (term) {
        case 'link':
          api.process_codeCard_link(input)
          break
        case 'task':
          api.process_codeCard_formTask(input)
          break
        case 'head':
          api.process_codeCard_head(input)
          break
        case 'wear':
          api.process_codeCard_formWear(input)
          break
        case 'base':
          api.process_codeCard_formBase(input)
          break
        case 'case':
          api.process_codeCard_formCase(input)
          break
        case 'fuse':
          api.process_codeCard_fuse(input)
          break
        case 'hold':
          api.process_codeCard_hold(input)
          break
        case 'stem':
          api.process_codeCard_stem(input)
          break
        case 'note':
          api.process_codeCard_note(input)
          break
        case 'like':
          api.process_codeCard_like(input)
          break
        default:
          api.throwError(api.generateUnknownTermError(input))
      }
    }
  } else {
    api.throwError(
      api.generateUnhandledNestCaseError(input, type),
    )
  }
}
