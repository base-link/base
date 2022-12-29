import type { MeshInputType } from '~'

export enum Site {
  Dependency = 'internal-dependency',
  DependencyPart = 'internal-dependency-part',
  Scope = 'internal-scope',
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

export type SiteInputCallbackType<T> = (value: T) => void

export type SiteMappingType = {
  'internal-dependency': SiteDependencyType
  'internal-dependency-part': SiteDependencyPartType
  'internal-scope': SiteScopeType
}

export type SiteScopeType = {
  data: Record<string, unknown>
  like: Site.Scope
  parent?: SiteScopeType
}

export type SiteType<T extends Site> = SiteMappingType[T]
