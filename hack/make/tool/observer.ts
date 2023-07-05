import {
  BlueMapType,
  BlueNodeType,
  BluePossibleType,
  BlueType,
  Mesh,
  SITE_OBSERVER_COMPLETE_STATE,
  SITE_OBSERVER_STATE,
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
  load: SiteModuleBindingInputType,
  schema: SiteObjectWatcherSchemaType,
): void {
  const watcher = code.registerSchema(load, schema)
  code.updateAllThroughWatcher(load, watcher)
}

export function createCodeModuleObjectNameObserverSchema(
  property: string,
  handle: SiteObjectWatcherHandleType,
): SiteObjectWatcherSchemaType {
  return {
    properties: {
      definitions: {
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
                    state: SITE_OBSERVER_STATE,
                  },
                },
                state: SITE_OBSERVER_STATE,
              },
            },
            state: SITE_OBSERVER_STATE,
          },
        },
        state: SITE_OBSERVER_STATE,
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
      definitions: {
        properties: {
          public: {
            properties: {
              [property]: {
                handle,
                state: [SiteObserverState.CollectionGathered],
              },
            },
            state: SITE_OBSERVER_STATE,
          },
        },
        state: SITE_OBSERVER_STATE,
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
  pending = 1,
): SiteObjectWatcherPropertyType {
  const watcher: SiteObjectWatcherPropertyType = {
    counted: true,
    handle: property.handle,
    matched: false,
    name,
    pending,
    state: property.state,
  }

  const isDynamic = name === '*'

  Object.defineProperty(watcher, 'parent', {
    enumerable: false,
    value: parent,
  })

  Object.defineProperty(watcher, 'node', {
    enumerable: false,
    value: undefined,
    writable: true,
  })

  let higher = parent
  while (higher) {
    higher.pending += pending
    higher = higher.parent
  }

  const propertyProperties = property.properties

  if (propertyProperties) {
    const nestedProperties: SiteObjectWatcherPropertiesType = {}

    Object.keys(propertyProperties).forEach(name => {
      const child = propertyProperties[
        name
      ] as SiteObjectWatcherPropertyType

      const isChildDynamic = name === '*'

      nestedProperties[name] = createWatcherFromSchemaProperty(
        child,
        name,
        isDynamic ? undefined : watcher,
        isDynamic ? 0 : 1,
      )
    })

    if (isDynamic) {
      watcher.dynamicProperties = nestedProperties
      watcher.properties = {}
    } else {
      watcher.properties = nestedProperties
    }
  }

  return watcher
}

export function extendDynamicPropertyWatcher(
  load: MeshLoad,
  watcher: SiteObjectWatcherPropertyType,
  name: string,
): SiteObjectWatcherPropertyType {
  const { dynamicProperties } = watcher
  code.assertRecord(dynamicProperties)

  const childWatcher: SiteObjectWatcherPropertyType = {
    counted: false,
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

  return childWatcher
}

export function isObserverStateAccepted(
  load: SiteObserverState,
  potential: Array<SiteObserverState>,
): boolean {
  if (potential.includes(SiteObserverState.CollectionGathered)) {
    return load === SiteObserverState.CollectionGathered
  }

  if (potential.includes(SiteObserverState.Initialized)) {
    return SITE_OBSERVER_STATE.includes(load)
  }

  if (potential.includes(SiteObserverState.StaticComplete)) {
    return SITE_OBSERVER_COMPLETE_STATE.includes(load)
  }

  if (potential.includes(SiteObserverState.RuntimeComplete)) {
    return load === SiteObserverState.RuntimeComplete
  }

  return false
}

export function propagatePendingUpwards(
  property: SiteObjectWatcherPropertyType,
  amount: number,
): void {
  let higher: SiteObjectWatcherPropertyType | undefined = property

  while (higher) {
    higher.pending += amount
    higher = higher.parent
  }
}

export function queuePropertyUpdateHandle(
  load: MeshLoad,
  handle: SiteObjectWatcherHandleType,
  node: BlueNodeType<Mesh>,
): void {
  code.addTask(load.base, () => handle(node))
}

export function registerSchema(
  load: SiteModuleBindingInputType,
  schema: SiteObjectWatcherSchemaType,
): SiteObjectWatcherType {
  let list = load.base.watchers[load.moduleId]

  if (!list) {
    list = load.base.watchers[load.moduleId] = []
  }

  const watcher = code.createWatcherFromSchema(schema)

  list.push(watcher)

  return watcher
}

export function resolveBluePath(
  blue: BlueNodeType<Mesh>,
): Array<BlueNodeType<Mesh>> {
  let node: BlueNodeType<Mesh> | undefined = blue
  const array: Array<BlueNodeType<Mesh>> = []
  while (node) {
    array.push(node)
    node = node.parent
  }
  return array.reverse()
}

export function triggerObjectBindingUpdate(
  load: MeshLoad,
  node: BlueNodeType<Mesh>,
): void {
  const watchers = load.base.watchers[load.module.id]

  if (!watchers) {
    return
  }

  const path = code.resolveBluePath(node)
  watchers.forEach(watcher => {
    code.updateWatcherForPath(load, watcher, path)
  })
}

export function updateAllThroughWatcher(
  load: SiteModuleBindingInputType,
  watcher: SiteObjectWatcherType,
): void {
  let node = load.module.blue.node as BlueMapType<
    Record<string, BluePossibleType>
  >

  for (const name in watcher.properties) {
    const property = watcher.properties[
      name
    ] as SiteObjectWatcherPropertyType

    let child = node.value[name] as BlueType

    code.updateAllThroughWatcherProperty(load, property, child)
  }

  // console.log(JSON.stringify(watcher, null, 2))
}

export function updateAllThroughWatcherProperty(
  load: SiteModuleBindingInputType,
  property: SiteObjectWatcherPropertyType,
  node: Record<string, unknown>,
): void {
  code.assertGenericBlue(node)

  if (code.isObserverStateAccepted(node.state, property.state)) {
    property.matched = true
    code.propagatePendingUpwards(property, -1)
  }

  property.node = node

  const { properties } = property

  if (properties) {
    Object.keys(properties).forEach(name => {
      const childProperty = properties[
        name
      ] as SiteObjectWatcherPropertyType

      if (childProperty.dynamicProperties) {
        switch (node.type) {
          case Mesh.Array: {
            const potentialChildren = node.value as Array<BlueType>
            potentialChildren.forEach((childValue, i) => {
              const elementProperty = code.extendDynamicPropertyWatcher(
                load,
                property,
                String(i),
              )

              code.updateAllThroughWatcherProperty(
                load,
                elementProperty,
                childValue,
              )
            })
            break
          }
          case Mesh.Map: {
            const potentialMap = node.value as Record<string, BlueType>
            for (const key in potentialMap) {
              const childValue = potentialMap[key] as BlueType
              const elementProperty = code.extendDynamicPropertyWatcher(
                load,
                property,
                key,
              )

              code.updateAllThroughWatcherProperty(
                load,
                elementProperty,
                childValue,
              )
            }
            break
          }
          default:
            code.throwError(code.generateInvalidCompilerStateError())
        }
      } else {
        switch (node.type) {
          case Mesh.Map: {
            node = node.value as Record<string, BlueType>
          }
          default:
            break
        }

        const childValue = node[name] as BlueType

        code.updateAllThroughWatcherProperty(
          load,
          childProperty,
          childValue,
        )
      }
    })
  }
}

export function updateWatcherForPath(
  load: MeshLoad,
  watcher: SiteObjectWatcherType,
  path: Array<BlueNodeType<Mesh>>,
): void {
  let properties: SiteObjectWatcherPropertiesType | undefined =
    watcher.properties

  let i = 0

  while (i < path.length) {
    const node = path[i++] as BlueNodeType<Mesh>
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
              load,
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
