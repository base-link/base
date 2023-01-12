import { Base } from '~'
import type {
  BlueType,
  GreenClassReferenceType,
  LinkNodeType,
  LinkTreeType,
  RedType,
  YellowType,
} from '~'

export type SiteBindingCountdownType = {
  dependencies: Array<string>
  handle: () => void
}

export type SiteBlueType = SiteColorType<BlueType>

export type SiteColorType<T> = {
  node: T
  parent?: SiteColorType<T>
}

export type SiteColorsType = {
  blue?: SiteBlueType
  red?: SiteRedType
  yellow?: SiteYellowType
}

export type SiteContainerScopeType = {
  declarations: Record<string, SiteVariableDeclarationType>
  parent?: SiteContainerScopeType
  steps: Array<SiteStepScopeType>
}

export type SiteCreateInputType = {
  base: Base
  bindings: Record<string, unknown>
  module: SiteModuleBaseType
  red: SiteRedType
  scope: SiteStepScopeType
}

export type SiteDependencyObserverParentType = {
  observer: SiteDependencyObserverType
  remaining: number
}

export type SiteDependencyObserverType = {
  children: Array<SiteDependencyObserverType | string>
  node: LinkNodeType
  parent?: SiteDependencyObserverParentType
  path: Array<string>
}

export type SiteEnvironmentType = {
  bindings: Record<string, unknown>
  isEnv: true
  parent?: SiteEnvironmentType
}

export type SiteLinkType = {
  element: LinkNodeType
  index?: number
  parent?: SiteLinkType
}

export type SiteModuleBaseType = {
  base: Base
  directory: string
  id: number
  isModule: true
  link: SiteLinkType
  linkTree: LinkTreeType
  path: string
  text: string
  textByLine: Array<string>
}

export type SiteModuleBindingInputType = SiteProcessInputType & {
  handleId: string
  moduleId: number
}

export type SiteModuleType = SiteModuleBaseType & {
  blue: SiteBlueType
  environment: SiteEnvironmentType
  module: SiteModuleType
  red: SiteRedType
  scope: SiteStepScopeType
}

export type SiteObjectWatcherSchemaHandleType = (value: unknown) => void

export type SiteObjectWatcherSchemaType = {
  children: Array<SiteObjectWatcherSchemaType>
  handle?: SiteObjectWatcherSchemaHandleType
  property: string
  state: Array<SiteObserverState>
}

export type SiteObjectWatcherType = {
  children: Array<SiteObjectWatcherType>
  handle?: () => void
  objectId: number
  property: string
  state: string
}

export enum SiteObserverState {
  CollectionGathered = 'collection-gathered',
  Initialized = 'initialized',
  RuntimeComplete = 'runtime-complete',
  StaticComplete = 'static-complete',
}

// eslint-disable-next-line sort-exports/sort-exports
export const ALL_SITE_OBSERVER_STATE = [
  SiteObserverState.Initialized,
  SiteObserverState.StaticComplete,
  SiteObserverState.RuntimeComplete,
]

export type SiteParseType = {
  directory: string
  linkTree: LinkTreeType
  path: string
  text: string
  textByLine: Array<string>
}

export type SitePotentialScopeType =
  | SiteContainerScopeType
  | SiteStepScopeType

export type SiteProcessInputType = {
  base: Base
  blue: SiteBlueType
  environment: SiteEnvironmentType
  link: SiteLinkType
  module: SiteModuleBaseType
  red: SiteRedType
  scope: SiteStepScopeType
}

export type SitePropertyObserverType = () => void

export type SiteRedType = SiteColorType<RedType>

export type SiteScopeType = {
  bindings: Record<string, unknown>
  parent?: SiteScopeType
}

export type SiteStepScopeType = {
  container?: SiteContainerScopeType
  declarations: Record<string, SiteVariableDeclarationType>
  previous?: SiteStepScopeType
}

export type SiteVariableDeclarationOptionsType = {
  definedType?: GreenClassReferenceType
  isMutable?: boolean
  isReference?: boolean
}

export type SiteVariableDeclarationType = {
  definedType: GreenClassReferenceType
  inferredType: GreenClassReferenceType
  isMutable: boolean
  isOwner: boolean
  isReference: boolean
  name: string
}

export type SiteYellowType = SiteColorType<YellowType>
