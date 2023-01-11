import type {
  Base,
  BlueType,
  GreenClassReferenceType,
  LinkNodeType,
  LinkTreeType,
  RedType,
  YellowType,
} from '~'

export type SiteBindElementBaseInputType = SiteProcessInputType & {
  focus: {
    bond?: unknown
    name: string
  }
  id: string
  moduleId: number
}

export type SiteBindElementHandlerInputType =
  SiteBindElementBaseInputType & {
    handle: (
      value: SiteBindElementBaseInputType & { value: unknown },
    ) => void
  }

export type SiteBindElementInputType = SiteBindElementBaseInputType & {
  handle: () => void
}

export type SiteBindModuleInputType = SiteProcessInputType & {
  handle: () => void
  id: string
  moduleId: number
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

export type SiteDependencyPartCallbackType = (value: unknown) => void

export type SiteDependencyPartType = {
  callbackList: Array<SiteDependencyPartCallbackType>
  last?: SiteDependencyPartType
  name: string
  next?: SiteDependencyPartType
  parent: SiteDependencyType
}

export type SiteDependencyType = {
  callbackList: Array<SiteInputCallbackType<SiteProcessInputType>>
  context: SiteProcessInputType
  path: Array<SiteDependencyPartType>
}

export type SiteEnvironmentType = {
  bindings: Record<string, unknown>
  isEnv: true
  parent?: SiteEnvironmentType
}

export type SiteInputCallbackType<T> = (value: T) => void

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

export type SiteModuleType = SiteModuleBaseType & {
  blue: SiteBlueType
  environment: SiteEnvironmentType
  module: SiteModuleType
  red: SiteRedType
  scope: SiteStepScopeType
}

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
  blue?: SiteBlueType
  environment: SiteEnvironmentType
  link: SiteLinkType
  module: SiteModuleBaseType
  red: SiteRedType
  scope: SiteStepScopeType
  yellow?: SiteYellowType
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
