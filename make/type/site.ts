import type { Mesh, MeshInputType, MeshType } from '~'

export enum Site {
  ContainerScope = 'site-container-scope',
  Dependency = 'site-dependency',
  DependencyPart = 'site-dependency-part',
  Scope = 'site-scope',
  StepScope = 'site-step-scope',
  VariableDeclaration = 'site-variable-declaration',
}

export type SiteBranchType = {
  element: Record<string, unknown>
  parent?: SiteBranchType
}

export type SiteContainerScopeType = {
  declarations: Record<string, SiteVariableDeclarationType>
  like: Site.ContainerScope
  parent?: SiteContainerScopeType
  steps: Array<SiteStepScopeType>
}

export type SiteDependencyPartCallbackType = (
  value: unknown,
) => void

export type SiteDependencyPartType = {
  callbackList: Array<SiteDependencyPartCallbackType>
  last?: SiteDependencyPartType
  like: Site.DependencyPart
  name: string
  next?: SiteDependencyPartType
  parent: SiteDependencyType
}

export type SiteDependencyType = {
  callbackList: Array<SiteInputCallbackType<MeshInputType>>
  context: MeshInputType
  like: Site.Dependency
  path: Array<SiteDependencyPartType>
}

export type SiteEnvironmentType = {
  bindings: Record<string, unknown>
  parent?: SiteEnvironmentType
}

export type SiteInputCallbackType<T> = (value: T) => void

export type SiteMappingType = {
  'site-container-scope': SiteContainerScopeType
  'site-dependency': SiteDependencyType
  'site-dependency-part': SiteDependencyPartType
  'site-scope': SiteScopeType
  'site-step-scope': SiteStepScopeType
  'site-variable-declaration': SiteVariableDeclarationType
}

export type SitePotentialScopeType =
  | SiteContainerScopeType
  | SiteStepScopeType

export type SiteScopeType = {
  bindings: Record<string, unknown>
  like: Site.Scope
  parent?: SiteScopeType
}

export type SiteStepScopeType = {
  container?: SiteContainerScopeType
  declarations: Record<string, SiteVariableDeclarationType>
  like: Site.StepScope
  previous?: SiteStepScopeType
}

export type SiteType<T extends Site> = SiteMappingType[T]

export type SiteVariableDeclarationType = {
  like: string
}
