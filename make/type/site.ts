import type {
  Base,
  LinkNodeType,
  LinkTreeType,
  Mesh,
  MeshClassReferenceType,
  MeshType,
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
  parent?: SiteContainerScopeType
  steps: Array<SiteStepScopeType>
  type: Site.ContainerScope
}

export type SiteDependencyPartCallbackType = (value: unknown) => void

export type SiteDependencyPartType = {
  callbackList: Array<SiteDependencyPartCallbackType>
  last?: SiteDependencyPartType
  name: string
  next?: SiteDependencyPartType
  parent: SiteDependencyType
  type: Site.DependencyPart
}

export type SiteDependencyType = {
  callbackList: Array<SiteInputCallbackType<SiteProcessInputType>>
  context: SiteProcessInputType
  path: Array<SiteDependencyPartType>
  type: Site.Dependency
}

export type SiteElementType = {
  node: MeshType<Mesh>
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
  previous?: SiteStepScopeType
  type: Site.StepScope
}

export type SiteVariableDeclarationOptionsType = {
  definedType?: MeshClassReferenceType
  isMutable?: boolean
  isReference?: boolean
}

export type SiteVariableDeclarationType = {
  definedType: MeshClassReferenceType
  inferredType: MeshClassReferenceType
  isMutable: boolean
  isOwner: boolean
  isReference: boolean
  name: string
}
