import card from '~/make/card.js'
import tool from '~/make/tool.js'
import { MeshLoad } from '~/make/form.js'

export function bearImports(load: MeshLoad): void {
  const exportNode = load.blue.node
  card.assertBlue(exportNode, Mesh.Export)
  card.assertBlueString(exportNode.absolutePath)

  const card = load.base.card(exportNode.absolutePath.value)
  card.assertRecord(card)

  const id = card.id

  const schemas = [
    card.createCodeModulePublicCollectionObserverSchema(
      'classes',
      handleClassesGathered,
    ),
    card.createCodeModulePublicCollectionObserverSchema(
      'classInterfaces',
      handleInterfacesGathered,
    ),
    card.createCodeModulePublicCollectionObserverSchema(
      'functions',
      handleFunctionsGathered,
    ),
    card.createCodeModulePublicCollectionObserverSchema(
      'templates',
      handleTemplatesGathered,
    ),
    // card.createCodeModulePublicCollectionObserverSchema(
    //   'variables',
    //   handleVariablesGathered,
    // ),
    card.createCodeModuleObjectNameObserverSchema(
      'classes',
      handleClass,
    ),
    card.createCodeModuleObjectNameObserverSchema(
      'classInterfaces',
      handleInterface,
    ),
    card.createCodeModuleObjectNameObserverSchema(
      'functions',
      handleFunction,
    ),
    card.createCodeModuleObjectNameObserverSchema(
      'templates',
      handleTemplate,
    ),
    // card.createCodeModuleObjectNameObserverSchema(
    //   'variables',
    //   handleVariable,
    // ),
  ]

  function handleClassesGathered(value: unknown): void {
    card.assertGenericBlue(value)
    card.triggerObjectBindingUpdate(load, value)
  }

  function handleInterfacesGathered(value: unknown): void {
    card.assertGenericBlue(value)
    card.triggerObjectBindingUpdate(load, value)
  }

  function handleFunctionsGathered(value: unknown): void {
    card.assertGenericBlue(value)
    card.triggerObjectBindingUpdate(load, value)
  }

  function handleTemplatesGathered(value: unknown): void {
    card.assertGenericBlue(value)
    card.triggerObjectBindingUpdate(load, value)
  }

  function handleVariablesGathered(value: unknown): void {
    card.assertGenericBlue(value)
    card.triggerObjectBindingUpdate(load, value)
  }

  function handleClass(value: unknown): void {
    card.assertBlue(value, Mesh.Class)
    card.assertBlue(load.module, Mesh.CodeModule)

    load.module.classes.value.push(value)
    load.module.public.value.classes.value.push(value)
  }

  function handleInterface(value: unknown): void {
    card.assertBlue(value, Mesh.ClassInterface)
    card.assertBlue(load.module, Mesh.CodeModule)

    load.module.classInterfaces.value.push(value)
    load.module.public.value.classInterfaces.value.push(value)
  }

  function handleFunction(value: unknown): void {
    card.assertBlue(value, Mesh.Function)
    card.assertBlue(load.module, Mesh.CodeModule)

    load.module.functions.value.push(value)
    load.module.public.value.functions.value.push(value)
  }

  function handleTemplate(value: unknown): void {
    card.assertBlue(value, Mesh.Template)
    card.assertBlue(load.module, Mesh.CodeModule)

    load.module.templates.value.push(value)
    load.module.public.value.templates.value.push(value)
  }

  function handleVariable(value: unknown): void {
    card.assertBlue(value, Mesh.Variable)
    card.assertBlue(load.module, Mesh.CodeModule)
  }

  schemas.forEach(schema => {
    card.bindSchema({ ...load, moduleId: id }, schema)
  })
}

export function load_codeCard_bear(load: MeshLoad): void {
  const red = card.pushRed(load, card.createRedGather(load, 'bear'))
  const blue = card.pushBlue(load, 'exports', {
    hides: card.createBlueArray(load),
    type: Mesh.Export,
  })
  const colorInput = card.withColors(load, { blue, red })
  const nest = card.assumeNest(colorInput)

  nest.forEach((nest, index) => {
    tool.loadTask(load.base, () => {
      card.load_codeCard_bear_leadLink(
        card.withLink(colorInput, nest, index),
      )
    })
  })

  tool.loadTask(load.base, () => {
    card.bearImports(colorInput)
  })
}

export function load_codeCard_bear_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticText: {
      card.load_codeCard_bear_leadLink_text(load)
      break
    }
    case LinkHint.DynamicText: {
      card.load_codeCard_bear_leadLink_dynamicText(load)
      break
    }
    case LinkHint.StaticTerm: {
      const term = card.resolveTermString(load)
      switch (term) {
        case 'hide':
          card.load_codeCard_bear_hide(load)
          break
        default:
          card.throwError(card.generateUnhandledTermCaseError(load))
      }
      break
    }
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

export function load_codeCard_bear_leadLink_dynamicText(
  load: MeshLoad,
): void {
  const nest = card.loadLink(load, Link.Text)

  card.pushRed(
    load,
    card.createRedGather(load, 'absolute-path', [nest]),
  )

  const text = card.assumeText(load)
  const path = card.resolveModulePath(load, text)
  const string = card.createBlueString(path)

  card.attachBlue(load, 'absolutePath', string)

  tool.loadTask(load.base, () => {
    card.handle_codeCard(load.base, path)
  })
}

export function load_codeCard_bear_leadLink_text(load: MeshLoad): void {
  const text = card.assumeText(load)
  const path = card.resolveModulePath(load, text)
  const string = card.createBlueString(path)

  card.pushRed(
    load,
    card.createRedGather(load, 'absolute-path', [string]),
  )

  card.attachBlue(load, 'absolutePath', string)

  tool.loadTask(load.base, () => {
    card.handle_codeCard(load.base, path)
  })
}
