import {
  Base,
  BaseCard,
  SiteEnvironmentType,
  SiteModuleBaseType,
  code,
} from '~'

export function assertEnvironment(
  object: unknown,
): asserts object is SiteEnvironmentType {
  if (!code.isEnvironment(object)) {
    code.throwError(
      code.generateObjectNotTypeError(object, ['environment']),
    )
  }
}

export function assertModule(
  object: unknown,
): asserts object is SiteModuleBaseType {
  if (!code.isModule(object)) {
    code.throwError(code.generateObjectNotTypeError(object, ['module']))
  }
}

export function hasModuleById(base: Base, id: number): boolean {
  return id in base.cardsById
}

export function hasModuleByPath(base: Base, path: string): boolean {
  return path in base.cardsByPath
}

export function hasModuleInitialized(module: BaseCard): boolean {
  return Object.keys(module.seed).length > 0
}

export function isEnvironment(
  object: unknown,
): object is SiteEnvironmentType {
  return (object as SiteEnvironmentType).isEnv === true
}

export function isModule(
  object: unknown,
): object is SiteModuleBaseType {
  return (object as SiteModuleBaseType).isModule === true
}
