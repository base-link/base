import type {
  Base,
  LinkNodeType,
  LinkTreeType,
  Mesh,
  MeshType,
  Nest,
  NestType,
} from '~'

export enum Site {
  ContainerScope = 'site-container-scope',
  Dependency = 'site-dependency',
  DependencyPart = 'site-dependency-part',
  Scope = 'site-scope',
  StepScope = 'site-step-scope',
  VariableDeclaration = 'site-variable-declaration',
}

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

export type SiteContainerScopeType = {
  declarations: Record<string, SiteVariableDeclarationType>
  like: Site.ContainerScope
  parent?: SiteContainerScopeType
  steps: Array<SiteStepScopeType>
}

export type SiteDependencyPartCallbackType = (value: unknown) => void

export type SiteDependencyPartType = {
  callbackList: Array<SiteDependencyPartCallbackType>
  last?: SiteDependencyPartType
  like: Site.DependencyPart
  name: string
  next?: SiteDependencyPartType
  parent: SiteDependencyType
}

export type SiteDependencyType = {
  callbackList: Array<SiteInputCallbackType<SiteProcessInputType>>
  context: SiteProcessInputType
  like: Site.Dependency
  path: Array<SiteDependencyPartType>
}

export type SiteElementType = {
  node: MeshType<Mesh> | NestType<Nest>
  parent?: SiteElementType
}

export type SiteEnvironmentType = {
  bindings: Record<string, unknown>
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
  link: LinkTreeType
  path: string
  text: string
  textByLine: Array<string>
}

export type SitePotentialScopeType =
  | SiteContainerScopeType
  | SiteStepScopeType

export type SiteProcessInputType = {
  base: Base
  element: SiteElementType
  environment: SiteEnvironmentType
  link?: SiteLinkType
  module: SiteModuleBaseType
  scope: SiteStepScopeType
}

export type SitePropertyObserverType = () => void

export type SiteScopeType = {
  bindings: Record<string, unknown>
  parent?: SiteScopeType
}

export type SiteStepScopeType = {
  container?: SiteContainerScopeType
  declarations: Record<string, SiteVariableDeclarationType>
  like: Site.StepScope
  previous?: SiteStepScopeType
}

export type SiteVariableDeclarationType = {
  like: string
}
