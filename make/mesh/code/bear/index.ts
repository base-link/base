import { Link, LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export * from './hide/index.js'

export function bearImports(input: SiteProcessInputType): void {
  const exportNode = input.blue.node
  code.assertBlue(exportNode, Mesh.Export)
  code.assertBlueString(exportNode.absolutePath)

  const card = input.base.card(exportNode.absolutePath.value)
  code.assertRecord(card)

  const id = card.id

  const schemas = [
    code.createCodeModulePublicCollectionObserverSchema(
      'classes',
      handleClassesGathered,
    ),
    code.createCodeModulePublicCollectionObserverSchema(
      'interfaces',
      handleInterfacesGathered,
    ),
    code.createCodeModulePublicCollectionObserverSchema(
      'functions',
      handleFunctionsGathered,
    ),
    code.createCodeModulePublicCollectionObserverSchema(
      'templates',
      handleTemplatesGathered,
    ),
    code.createCodeModulePublicCollectionObserverSchema(
      'variables',
      handleVariablesGathered,
    ),
    code.createCodeModuleObjectNameObserverSchema(
      'classes',
      handleClass,
    ),
    code.createCodeModuleObjectNameObserverSchema(
      'interfaces',
      handleInterface,
    ),
    code.createCodeModuleObjectNameObserverSchema(
      'functions',
      handleFunction,
    ),
    code.createCodeModuleObjectNameObserverSchema(
      'templates',
      handleTemplate,
    ),
    code.createCodeModuleObjectNameObserverSchema(
      'variables',
      handleVariable,
    ),
  ]

  function handleClassesGathered(value: unknown): void {
    code.assertGenericBlue(value)
    code.triggerObjectBindingUpdate(input, value)
  }

  function handleInterfacesGathered(value: unknown): void {
    code.assertGenericBlue(value)
    code.triggerObjectBindingUpdate(input, value)
  }

  function handleFunctionsGathered(value: unknown): void {
    code.assertGenericBlue(value)
    code.triggerObjectBindingUpdate(input, value)
  }

  function handleTemplatesGathered(value: unknown): void {
    code.assertGenericBlue(value)
    code.triggerObjectBindingUpdate(input, value)
  }

  function handleVariablesGathered(value: unknown): void {
    code.assertGenericBlue(value)
    code.triggerObjectBindingUpdate(input, value)
  }

  function handleClass(value: unknown): void {
    code.assertBlue(value, Mesh.Class)
    code.assertBlue(input.module, Mesh.CodeModule)

    input.module.classes.push(value)
    input.module.public.classes.push(value)
  }

  function handleInterface(value: unknown): void {
    code.assertBlue(value, Mesh.ClassInterface)
    code.assertBlue(input.module, Mesh.CodeModule)

    input.module.classInterfaces.push(value)
    input.module.public.classInterfaces.push(value)
  }

  function handleFunction(value: unknown): void {
    code.assertBlue(value, Mesh.Function)
    code.assertBlue(input.module, Mesh.CodeModule)

    input.module.functions.push(value)
    input.module.public.functions.push(value)
  }

  function handleTemplate(value: unknown): void {
    code.assertBlue(value, Mesh.Template)
    code.assertBlue(input.module, Mesh.CodeModule)

    input.module.templates.push(value)
    input.module.public.templates.push(value)
  }

  function handleVariable(value: unknown): void {
    code.assertBlue(value, Mesh.Variable)
    code.assertBlue(input.module, Mesh.CodeModule)
  }

  schemas.forEach(schema => {
    code.bindSchema({ ...input, moduleId: id }, schema)
  })
}

export function process_codeCard_bear(
  input: SiteProcessInputType,
): void {
  const red = code.pushRed(input, code.createRedGather(input, 'bear'))
  const blue = code.pushBlue(input, 'exports', {
    hides: [],
    type: Mesh.Export,
  })
  const colorInput = code.withColors(input, { blue, red })
  const nest = code.assumeNest(colorInput)

  nest.forEach((nest, index) => {
    code.addTask(input.base, () => {
      code.process_codeCard_bear_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })

  code.addTask(input.base, () => {
    code.bearImports(colorInput)
  })
}

export function process_codeCard_bear_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticText: {
      code.process_codeCard_bear_nestedChildren_text(input)
      break
    }
    case LinkHint.DynamicText: {
      code.process_codeCard_bear_nestedChildren_dynamicText(input)
      break
    }
    case LinkHint.StaticTerm: {
      const term = code.resolveTermString(input)
      switch (term) {
        case 'hide':
          code.process_codeCard_bear_hide(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function process_codeCard_bear_nestedChildren_dynamicText(
  input: SiteProcessInputType,
): void {
  const nest = code.assumeLink(input, Link.Text)

  code.pushRed(
    input,
    code.createRedGather(input, 'absolute-path', [nest]),
  )

  const text = code.assumeText(input)
  const path = code.resolveModulePath(input, text)
  const string = code.createBlueString(path)

  code.attachBlue(input, 'absolutePath', string)

  code.addTask(input.base, () => {
    code.handle_codeCard(input.base, path)
  })
}

export function process_codeCard_bear_nestedChildren_text(
  input: SiteProcessInputType,
): void {
  const text = code.assumeText(input)
  const path = code.resolveModulePath(input, text)
  const string = code.createBlueString(path)

  code.pushRed(
    input,
    code.createRedGather(input, 'absolute-path', [string]),
  )

  code.attachBlue(input, 'absolutePath', string)

  code.addTask(input.base, () => {
    code.handle_codeCard(input.base, path)
  })
}
