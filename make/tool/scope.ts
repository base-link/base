import { Site, code } from '~'
import type {
  MeshClassReferenceType,
  SiteContainerScopeType,
  SiteStepScopeType,
  SiteVariableDeclarationOptionsType,
  SiteVariableDeclarationType,
} from '~'

export const DEFAULT_CONTAINER_SCOPE: Record<
  string,
  SiteVariableDeclarationOptionsType
> = {
  // base: { definedType: { name: code.createMeshString('base') } },
  // path: { definedType: { name: code.createMeshString('string') } },
  // text: { definedType: { name: code.createMeshString('string') } },
}

export function createContainerScope(
  declarations: Record<string, SiteVariableDeclarationType>,
  parent?: SiteContainerScopeType,
): SiteContainerScopeType {
  return {
    declarations,
    parent,
    steps: [],
    type: Site.ContainerScope,
  }
}

export function createStepScope(
  container: SiteContainerScopeType,
  declarations: Record<string, SiteVariableDeclarationType> = {},
): SiteStepScopeType {
  const previous = container.steps[container.steps.length - 1]
  const step: SiteStepScopeType = {
    container,
    declarations,
    previous,
    type: Site.StepScope,
  }
  container.steps.push(step)
  return step
}

export function declareScopeVariable(
  scope: SiteStepScopeType,
  variable: SiteVariableDeclarationType,
): void {
  scope.declarations[variable.name] = variable
}

export function hasScopeVariable(
  scope: SiteStepScopeType,
  name: string,
): boolean {
  if (name in scope.declarations) {
    return true
  } else if (scope.previous) {
    return code.hasScopeVariable(scope.previous, name)
  } else {
    return false
  }
}

export function setInferredScopeType(
  scope: SiteStepScopeType,
  property: string,
  type: MeshClassReferenceType,
): void {
  if (property in scope.declarations) {
    const declaration = scope.declarations[property]
    if (code.isRecord(declaration)) {
      declaration.inferredType = type
    }
  } else if (scope.previous) {
    code.setInferredScopeType(scope.previous, property, type)
  } else {
    code.throwError(
      code.generateEnvironmentMissingPropertyError(property),
    )
  }
}
