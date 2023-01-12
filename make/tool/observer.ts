import {
  ALL_SITE_OBSERVER_STATE,
  Base,
  SiteObjectWatcherSchemaHandleType,
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

export function createCodeModuleObjectNameObserverSchema(
  property: string,
  handle: SiteObjectWatcherSchemaHandleType,
): SiteObjectWatcherSchemaType {
  const defaultState = ALL_SITE_OBSERVER_STATE

  return {
    children: [
      {
        children: [
          {
            children: [],
            property: 'name',
            state: [SiteObserverState.RuntimeComplete],
          },
        ],
        handle,
        property: '*',
        state: defaultState,
      },
    ],
    property,
    state: defaultState,
  }
}

export function createCodeModulePublicCollectionObserverSchema(
  property: string,
  handle: SiteObjectWatcherSchemaHandleType,
): SiteObjectWatcherSchemaType {
  const defaultState = ALL_SITE_OBSERVER_STATE

  return createCodeModulePublicObserverSchema([
    {
      children: [
        {
          children: [],
          handle,
          property: '*',
          state: [SiteObserverState.CollectionInitialized],
        },
      ],
      property,
      state: defaultState,
    },
  ])
}

export function createCodeModulePublicObserverSchema(
  children: Array<SiteObjectWatcherSchemaType>,
): SiteObjectWatcherSchemaType {
  return {
    children,
    property: 'public',
    state: ALL_SITE_OBSERVER_STATE,
  }
}

export function hasAllReferencesResolved(
  base: Base,
  moduleId: number,
): boolean {
  return !(moduleId in base.observersByModuleThenIdThenName)
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
