import {
  FormInputType,
  InitialMeshFormType,
  Mesh,
  NestInputType,
  api,
} from '~'

export * from './base'
export * from './case'
export * from './task'
export * from './wear'

export function process_codeCard_form(
  input: NestInputType,
): void {
  const formData: InitialMeshFormType = {
    base: [],
    hook: {},
    like: Mesh.Form,
    link: {},
    task: {},
    wear: {},
  }
  const formInput: FormInputType & NestInputType = {
    ...input,
    fork: api.makeFork(input.fork, {}),
    form: formData,
  }

  formInput.nest.nest.forEach((nest, index) => {
    api.process_codeCard_form_nestedChildren({
      ...formInput,
      index,
      nest,
    })
  })

  const card = api.getForkProperty(input.fork, 'card')

  api.assertMesh(card, Mesh.CodeCard)

  if (formData.name) {
    card.publicFormMesh[formData.name] = formData
  }
}

export function process_codeCard_form_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTermFromNest(input)
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
      api.generateUnhandledNestCaseError(input, type),
    )
  }
}
