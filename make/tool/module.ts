import {
  Base,
  BaseCard,
  SiteModuleBaseType,
  SiteParseType,
  code,
} from '~'

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

export function isModule(
  object: unknown,
): object is SiteModuleBaseType {
  return (object as SiteModuleBaseType).isModule === true
}

export function loadLinkModule(
  base: Base,
  path: string,
): SiteParseType {
  const text = code.readTextFile(base, path)
  const data = code.parseLinkText({ path, text })
  const directory = code.getLinkHost(path)
  return {
    directory,
    ...data,
  }
}
