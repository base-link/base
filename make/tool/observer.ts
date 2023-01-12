import {
  ALL_SITE_OBSERVER_STATE,
  Base,
  BlueType,
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

export function findSchemaHandle(
  schema: SiteObjectWatcherSchemaType,
): SiteObjectWatcherSchemaHandleType | undefined {
  const stack: Array<
    SiteObjectWatcherSchemaPropertyType | SiteObjectWatcherSchemaType
  > = [schema]
  while (stack.length) {
    const schemaNode = stack.pop() as
      | SiteObjectWatcherSchemaType
      | SiteObjectWatcherSchemaPropertyType

    if (schemaNode.handle) {
      return schemaNode.handle
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
}

export function hasAllReferencesResolved(
  base: Base,
  moduleId: number,
): boolean {
  return !(moduleId in base.observersByModuleThenIdThenName)
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
  const path = code.resolveBluePath(node)
  const schemas = module.schemas
  schemas.forEach(schema => {
    code.updateWatcherSchema(schema, path)
    if (schema.pending === 0) {
      const handle = code.findSchemaHandle(schema)
    }
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
