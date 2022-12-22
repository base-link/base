import { api } from '~server'
import { Scope, ScopeType } from '~server/type'

export * from './base'
export * from './case'
export * from './like'
export * from './link'
export * from './task'
export * from './wear'

export function process_codeCard_form(
  scope: ScopeType<Scope.Nest, ScopeType<Scope.CodeCard>>,
): void {
  const formScope: ScopeType<Scope.Form> = api.extendScope<
    Scope.Form,
    typeof scope
  >(
    Scope.Form,
    {
      form: {
        base: [],
        hook: {},
        like: 'form',
        link: {},
        task: {},
        wear: {},
      },
    },
    scope,
  )

  scope.data.nest.nest.forEach((nest, index) => {
    const nestedScope = api.extendNest(formScope, nest, index)
    api.process_codeCard_form_nestedChildren(nestedScope)
  })

  if (scope.parent) {
    const mesh = api.getPropertyValueFromScope<Scope.Form>(
      formScope,
      'card',
    )
    if (
      formScope.data.form.name &&
      scope.parent.data.publicFormMesh
    ) {
      scope.parent.data.publicFormMesh[form.name] = form
    }
  }
}

export function process_codeCard_form_nestedChildren(
  scope: ScopeType<Scope.Nest>,
): void {
  const type = api.determineNestType(scope)
  if (type === 'static-term') {
    const term = api.resolveStaticTerm(scope)
    switch (term) {
      case 'link':
        api.process_codeCard_formLink(scope)
        break
      case 'task':
        api.process_codeCard_formTask(scope)
        break
      case 'head':
        api.process_codeCard_head(scope)
        break
      case 'wear':
        api.process_codeCard_formWear(scope)
        break
      case 'base':
        api.process_codeCard_formBase(scope)
        break
      case 'case':
        api.process_codeCard_formCase(scope)
        break
      case 'fuse':
        api.process_codeCard_fuse(scope)
        break
      case 'hold':
        api.process_codeCard_hold(scope)
        break
      case 'stem':
        api.process_codeCard_stem(scope)
        break
      case 'note':
        api.process_codeCard_note(scope)
        break
      case 'like':
        api.process_codeCard_formLike(scope)
        break
      default:
        api.throwError(api.generateUnknownTermError(scope))
    }
  } else {
    throw new Error(`${card.seed.link}`)
  }
}
