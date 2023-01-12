import {
  ALL_SITE_OBSERVER_STATE,
  Base,
  BlueType,
  SiteModuleBindingInputType,
  SiteObjectWatcherSchemaHandleType,
  SiteObjectWatcherSchemaPropertiesType,
  SiteObjectWatcherSchemaPropertyType,
  SiteObjectWatcherSchemaType,
  SiteObserverState,
  code,
} from '~'
import type { SiteProcessInputType } from '~'

export function addPropertyObserver(
  input: SiteBindElementInputType,
): void {
  const name = input.focus.name
  const handle = input.handle
  const id = input.id
  const moduleId = input.moduleId
  const observersByNameThenId = code.getWithObjectDefault(
    input.base.observersByModuleThenNameThenId,
    String(moduleId),
  )
  const observersById = code.getWithObjectDefault(
    observersByNameThenId,
    name,
  )
  observersById[id] = handle

  const observersByIdThenName = code.getWithObjectDefault(
    input.base.observersByModuleThenIdThenName,
    String(moduleId),
  )
  const observersByName = code.getWithObjectDefault(
    observersByIdThenName,
    id,
  )
  observersByName[name] = handle
}

export function bindModule(input: SiteBindModuleInputType): void {
  const has =
    code.hasModuleById(input.module.base, input.moduleId) &&
    code.hasModuleInitialized(input.module.base.card(input.moduleId)) &&
    code.hasAllReferencesResolved(input.module.base, input.moduleId)

  if (has) {
    code.setModuleBindings(input)
  } else {
    code.addPropertyObserver({
      ...input,
      focus: {
        name: '*',
      },
      handle: () => code.resolveModuleBindings(input),
    })
  }
}

export function bindReference(input: SiteBindElementInputType): void {
  const focus = input.focus
  const has = code.environmentHasProperty(input.environment, focus.name)

  if (has) {
    code.setPropertyReference(input)
  } else {
    code.addPropertyObserver({
      ...input,
      handle: () => code.setPropertyReference(input),
    })
  }
}

export function bindSchema(
  input: SiteModuleBindingInputType,
  schema: SiteObjectWatcherSchemaType,
): void {
  if (!code.tryToSatisfySchema(input, schema)) {
    code.registerSchema(input, schema)
  }
}

export function checkFocusForInputCompletion(
  input: SiteBindElementBaseInputType & { value: unknown },
): void {
  input.focus.bond = input.value
  if (code.childrenAreBoundMesh(input.element.node)) {
    console.log('notify parent')
  }
}

export function checkModuleForInputCompletion(
  input: SiteBindModuleInputType,
): void {
  if (code.childrenAreBoundMesh(input.element.node)) {
    console.log('notify parent')
  }
}

export function clearPropertyObserver(
  input: SiteBindElementInputType,
): void {
  const name = input.focus.name
  const id = input.id
  const moduleId = input.moduleId
  const observersByNameThenId = code.getWithObjectDefault(
    input.base.observersByModuleThenNameThenId,
    String(moduleId),
  )
  const observersById = code.getWithObjectDefault(
    observersByNameThenId,
    name,
  )

  delete observersById[id]
  if (!Object.keys(observersById)) {
    delete observersByNameThenId[id]
  }
  if (!Object.keys(observersByNameThenId)) {
    delete input.base.observersByModuleThenNameThenId[moduleId]
  }

  const observersByIdThenName = code.getWithObjectDefault(
    input.base.observersByModuleThenIdThenName,
    String(moduleId),
  )
  const observersByName = code.getWithObjectDefault(
    observersByIdThenName,
    id,
  )

  delete observersByName[name]
  if (!Object.keys(observersByName)) {
    delete observersByIdThenName[id]
  }
  if (!Object.keys(observersByIdThenName)) {
    delete input.base.observersByModuleThenIdThenName[moduleId]
  }
}

export function connectSchema(
  schema:
    | SiteObjectWatcherSchemaType
    | SiteObjectWatcherSchemaPropertyType,
  parent?:
    | SiteObjectWatcherSchemaType
    | SiteObjectWatcherSchemaPropertyType,
): void {
  schema.pending = 1
  schema.matched = false
  schema.attachedAs = '*'

  let higher = parent
  while (higher) {
    higher.pending ??= 0
    higher.pending++
    higher = higher.parent
  }

  const { properties } = schema

  if (properties) {
    Object.keys(properties).forEach(name => {
      const property = properties[
        name
      ] as SiteObjectWatcherSchemaPropertyType
      connectSchema(property, schema)
      property.attachedAs = name
    })
  }
}

export function createCodeModuleObjectNameObserverSchema(
  property: string,
  handle: SiteObjectWatcherSchemaHandleType,
): SiteObjectWatcherSchemaType {
  const schema: SiteObjectWatcherSchemaType = {
    properties: {
      public: {
        properties: {
          [property]: {
            properties: {
              ['*']: {
                handle,
                properties: {
                  name: {
                    state: [SiteObserverState.RuntimeComplete],
                  },
                },
                state: ALL_SITE_OBSERVER_STATE,
              },
            },
            state: ALL_SITE_OBSERVER_STATE,
          },
        },
        state: ALL_SITE_OBSERVER_STATE,
      },
    },
  }

  code.connectSchema(schema)

  return schema
}

export function createCodeModulePublicCollectionObserverSchema(
  property: string,
  handle: SiteObjectWatcherSchemaHandleType,
): SiteObjectWatcherSchemaType {
  const schema: SiteObjectWatcherSchemaType = {
    properties: {
      public: {
        properties: {
          [property]: {
            handle,
            state: [SiteObserverState.CollectionGathered],
          },
        },
        state: ALL_SITE_OBSERVER_STATE,
      },
    },
  }

  code.connectSchema(schema)

  return schema
}

export function findSchemaHandleAndPath(
  schema: SiteObjectWatcherSchemaType,
): [SiteObjectWatcherSchemaHandleType, Array<string>] | [] {
  const stack: Array<
    SiteObjectWatcherSchemaPropertyType | SiteObjectWatcherSchemaType
  > = [schema]

  while (stack.length) {
    const schemaNode = stack.pop() as
      | SiteObjectWatcherSchemaType
      | SiteObjectWatcherSchemaPropertyType

    if (schemaNode.handle) {
      const path: Array<string> = []

      let node:
        | SiteObjectWatcherSchemaPropertyType
        | SiteObjectWatcherSchemaType
        | undefined = schemaNode

      while (node) {
        if (node !== schema) {
          code.assertString(node.attachedAs)
          path.push(node.attachedAs)
        }

        node = node.parent
      }

      return [schemaNode.handle, path.reverse()]
    }

    const { properties } = schemaNode

    if (properties) {
      Object.keys(properties).forEach(name => {
        stack.push(
          properties[name] as SiteObjectWatcherSchemaPropertyType,
        )
      })
    }
  }

  return []
}

export function hasAllReferencesResolved(
  base: Base,
  moduleId: number,
): boolean {
  return !(moduleId in base.observersByModuleThenIdThenName)
}

export function isSchemaSatisfied(
  property: SiteObjectWatcherSchemaPropertyType,
  node: Record<string, unknown>,
): boolean {
  code.assertString(property.attachedAs)
  const value = node[property.attachedAs]
}

export function registerSchema(
  input: SiteModuleBindingInputType,
  schema: SiteObjectWatcherSchemaType,
): void {
  let list = input.base.observers[input.moduleId]

  if (!list) {
    list = input.base.observers[input.moduleId] = []
  }

  list.push(schema)
}

export function resolveBluePath(blue: BlueType): Array<BlueType> {
  let node: BlueType | undefined = blue
  const array: Array<BlueType> = []
  while (node) {
    array.push(node)
    node = node.parent
  }
  return array.reverse()
}

export function resolveModuleBindings(
  input: SiteBindModuleInputType,
): void {
  code.setModuleBindings(input)
  code.clearPropertyObserver({
    ...input,
    focus: {
      name: '*',
    },
  })
}

export function resolvePropertyReference(
  input: SiteBindElementInputType,
): void {
  code.setPropertyReference(input)
  code.clearPropertyObserver(input)
}

export function setModuleBindings(
  input: SiteBindModuleInputType,
): void {
  const sourceModule = input.module.base.card(input.moduleId).seed
  code.assertMeshModule(sourceModule)
  const targetModule = input.module
  code.assertMeshModule(targetModule)

  Object.keys(sourceModule.public).forEach(scopeName => {
    const sourceScopePublic = sourceModule.public[scopeName]

    const targetScopePublic = code.getWithObjectDefault(
      targetModule.public,
      scopeName,
    )

    if (code.isRecord(sourceScopePublic)) {
      Object.keys(sourceScopePublic).forEach(propName => {
        targetScopePublic[propName] = sourceScopePublic[propName]
        // TODO: skip hidden export properties.
      })
    }
  })
}

export function setPropertyReference(
  input: SiteBindElementHandlerInputType,
): void {
  const focus = input.focus
  const value = code.getEnvironmentProperty(
    input.environment,
    focus.name,
  )

  input.handle({
    ...input,
    value,
  })
}

export function triggerObjectBindingUpdate(
  input: SiteProcessInputType,
  node: BlueType,
): void {
  const schemas = input.base.observers[input.module.id]

  if (!schemas) {
    return
  }

  const path = code.resolveBluePath(node)
  schemas.forEach(schema => {
    code.updateWatcherSchema(schema, path)

    schema.pending ??= 0

    if (schema.pending > 0) {
      return
    }

    const [handle, schemaPath] = code.findSchemaHandleAndPath(schema)

    if (!handle || !schemaPath) {
      return
    }

    const value = path[schemaPath.length - 1] as BlueType

    code.addTask(input.base, () => handle(value))
  })
}

export function triggerPropertyBinding(
  input: SiteProcessInputType & {
    propertyName: string
  },
): void {
  const observersByNameThenId =
    input.base.observersByModuleThenNameThenId[input.module.id]
  if (!observersByNameThenId) {
    return
  }

  const observersById = observersByNameThenId[input.propertyName]
  if (!observersById) {
    return
  }

  Object.keys(observersById).forEach(id => {
    const handle = observersById[id]
    handle?.()
  })
}

export function tryToSatisfySchema(
  input: SiteModuleBindingInputType,
  schema: SiteObjectWatcherSchemaType,
): boolean {
  const card = input.base.card(input.moduleId)
  code.assertRecord(card)

  const { seed } = card

  if (!code.isModule(seed)) {
    return false
  }

  for (const name in schema.properties) {
    if (!code.isSchemaSatisfied(schema.properties[name], seed.blue)) {
      return false
    }
  }

  const [handle, schemaPath] = code.findSchemaHandleAndPath(schema)

  if (!handle || !schemaPath) {
    return false
  }

  let node: Record<string, unknown> | unknown | undefined =
    seed.blue.node

  let stack = [node]
  let i = 0
  while (i < schemaPath.length && code.isRecord(node)) {
    const part = schemaPath[i++] as string
    const item = stack.shift()
    code.assertRecord(item)

    const value = item[part]

    if (part === '*') {
      if (code.isArray(value)) {
        stack.push(...value)
      } else if (code.isRecord(value)) {
        stack.push(...Object.values(value))
      }
    } else {
      stack.push(value)
    }
  }

  return false
}

export function updateWatcherSchema(
  schema: SiteObjectWatcherSchemaType,
  path: Array<BlueType>,
): void {
  let properties: SiteObjectWatcherSchemaPropertiesType | undefined =
    schema.properties

  let i = 0

  while (i < path.length) {
    const node = path[i++] as BlueType
    let property: SiteObjectWatcherSchemaPropertyType | undefined =
      properties[node.attachedAs]

    if (!property) {
      return
    }

    if (i === path.length) {
      if (property.matched) {
        return
      }

      property.matched = true

      while (property) {
        property.pending ??= 0
        property.pending--
        property = property.parent
      }

      return
    }

    properties = property.properties

    if (!properties) {
      return
    }
  }
}
