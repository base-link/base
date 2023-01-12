import {
  ALL_SITE_OBSERVER_STATE,
  BlueType,
  SiteModuleBindingInputType,
  SiteObjectWatcherHandleType,
  SiteObjectWatcherPropertiesType,
  SiteObjectWatcherPropertyType,
  SiteObjectWatcherSchemaPropertyType,
  SiteObjectWatcherSchemaType,
  SiteObjectWatcherType,
  SiteObserverState,
  code,
} from '~'
import type { SiteProcessInputType } from '~'

export function bindSchema(
  input: SiteModuleBindingInputType,
  schema: SiteObjectWatcherSchemaType,
): void {
  const watcher = code.registerSchema(input, schema)
  code.updateAllThroughWatcher(input, watcher)
}

export function createCodeModuleObjectNameObserverSchema(
  property: string,
  handle: SiteObjectWatcherHandleType,
): SiteObjectWatcherSchemaType {
  return {
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
}

export function createCodeModulePublicCollectionObserverSchema(
  property: string,
  handle: SiteObjectWatcherHandleType,
): SiteObjectWatcherSchemaType {
  return {
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
}

export function createWatcherFromSchema(
  schema: SiteObjectWatcherSchemaType,
): SiteObjectWatcherType {
  const watcher: SiteObjectWatcherType = {
    properties: {},
  }

  Object.keys(schema.properties).forEach(name => {
    const property = schema.properties[
      name
    ] as SiteObjectWatcherPropertyType

    watcher.properties[name] = code.createWatcherFromSchemaProperty(
      property,
      name,
    )
  })

  return watcher
}

export function createWatcherFromSchemaProperty(
  property: SiteObjectWatcherSchemaPropertyType,
  name: string,
  parent?: SiteObjectWatcherPropertyType,
): SiteObjectWatcherPropertyType {
  const watcher: SiteObjectWatcherPropertyType = {
    handle: property.handle,
    matched: false,
    name,
    parent,
    pending: 1,
    state: property.state,
  }

  let higher = parent
  while (higher) {
    higher.pending++
    higher = higher.parent
  }

  const propertyProperties = property.properties

  if (propertyProperties) {
    const nestedProperties: SiteObjectWatcherPropertiesType = {}

    Object.keys(propertyProperties).forEach(name => {
      const child = propertyProperties[
        name
      ] as SiteObjectWatcherPropertyType

      nestedProperties[name] = createWatcherFromSchemaProperty(
        child,
        name,
        watcher,
      )
    })

    if (name === '*') {
      watcher.dynamicProperties = nestedProperties
      watcher.properties = {}
    } else {
      watcher.properties = nestedProperties
    }
  }

  return watcher
}

export function extendDynamicPropertyWatcher(
  watcher: SiteObjectWatcherPropertyType,
  name: string,
): void {
  const { dynamicProperties } = watcher
  code.assertRecord(dynamicProperties)

  const childWatcher: SiteObjectWatcherPropertyType = {
    matched: false,
    name,
    parent: watcher,
    pending: 0,
    state: [],
  }

  const nestedProperties: Record<
    string,
    SiteObjectWatcherPropertyType
  > = {}

  Object.keys(dynamicProperties).forEach(name => {
    const child = dynamicProperties[
      name
    ] as SiteObjectWatcherPropertyType

    nestedProperties[name] = createWatcherFromSchemaProperty(
      child,
      name,
      childWatcher,
    )
  })

  childWatcher.properties = nestedProperties

  const { properties } = watcher

  code.assertRecord(properties)

  properties[name] = childWatcher
}

export function queuePropertyUpdateHandle(
  input: SiteProcessInputType,
  handle: SiteObjectWatcherHandleType,
  node: BlueType,
): void {
  code.addTask(input.base, () => handle(node))
}

export function registerSchema(
  input: SiteModuleBindingInputType,
  schema: SiteObjectWatcherSchemaType,
): SiteObjectWatcherType {
  let list = input.base.watchers[input.moduleId]

  if (!list) {
    list = input.base.watchers[input.moduleId] = []
  }

  const watcher = code.createWatcherFromSchema(schema)

  list.push(watcher)

  return watcher
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

export function triggerObjectBindingUpdate(
  input: SiteProcessInputType,
  node: BlueType,
): void {
  const watchers = input.base.watchers[input.module.id]

  if (!watchers) {
    return
  }

  const path = code.resolveBluePath(node)
  watchers.forEach(watcher => {
    code.updateWatcherForPath(input, watcher, path)
  })
}

export function updateAllThroughWatcher(
  input: SiteModuleBindingInputType,
  watcher: SiteObjectWatcherType,
): void {
  let node = input.blue.node as Record<string, unknown>

  for (const name in watcher.properties) {
    const property = watcher.properties[
      name
    ] as SiteObjectWatcherPropertyType

    let child = node[name] as BlueType

    if (property.state.includes(child.state)) {
      if (!property.matched) {
        property.matched = true
        let higher: SiteObjectWatcherPropertyType | undefined = property

        while (higher) {
          higher.pending--
          higher = higher.parent
        }
      }
    }
  }
}

export function updateWatcherForPath(
  input: SiteProcessInputType,
  watcher: SiteObjectWatcherType,
  path: Array<BlueType>,
): void {
  let properties: SiteObjectWatcherPropertiesType | undefined =
    watcher.properties

  let i = 0

  while (i < path.length) {
    const node = path[i++] as BlueType
    code.assertString(node.attachedAs)

    let property: SiteObjectWatcherPropertyType | undefined =
      properties[node.attachedAs]

    if (!property) {
      return
    }

    property.node = node

    if (i === path.length) {
      if (property.matched) {
        return
      }

      property.matched = property.state.includes(node.state)

      if (property.matched) {
        while (property) {
          property.pending--
          if (property.pending === 0 && property.handle) {
            code.assertRecord(property.node)

            const parent = property.parent
            if (parent?.properties) {
              delete parent.properties[property.name]
            }

            code.queuePropertyUpdateHandle(
              input,
              property.handle,
              property.node,
            )
          }
          property = property.parent
        }
      }

      return
    }

    properties = property.properties

    if (!properties) {
      return
    }
  }
}
