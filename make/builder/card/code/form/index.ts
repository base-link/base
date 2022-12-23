import { AST, NestInputType, api } from '~'

export * from './base'
export * from './case'
export * from './task'
export * from './wear'

export function process_codeCard_form(
  input: NestInputType,
): void {
  const formScope: ScopeType<Scope.Form> = api.extendScope(
    Scope.Form,
    {
      form: {
        base: [],
        hook: {},
        like: AST.Form,
        link: {},
        task: {},
        wear: {},
      },
    },
    scope,
  )

  input.nest.nest.forEach((nest, index) => {
    const {
      ...input,
      index,
      nest,
    } = api.extendNest(formScope, nest, index)
    api.process_codeCard_form_nestedChildren({
      ...input,
      index,
      nest,
    })
  })

  const card = api.getPropertyValueFromScope(scope, 'card')

  api.assertAST(card, AST.CodeCard)

  if (forminput.form.name && card.publicFormMesh) {
    card.publicFormMesh[forminput.form.name] = forminput.form
  }
}

export function process_codeCard_form_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTerm(input)
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
  } else {
    api.throwError(
      api.generateUnhandledNestCaseError(scope, type),
    )
  }
}
