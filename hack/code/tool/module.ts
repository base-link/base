import {
  Base,
  BaseCard,
  SiteModuleBaseType,
  SiteModuleType,
  SiteCardCode,
  code,
} from '~'

export function assertModule(
  object: unknown,
): asserts object is SiteModuleType {
  if (!code.isModule(object)) {
    code.throwError(code.generateObjectNotTypeError(object, ['module']))
  }
}

export function hasModuleInitialized(module: BaseCard): boolean {
  return Object.keys(module.seed).length > 0
}

export function isModule(object: unknown): object is SiteModuleType {
  return (object as SiteModuleType).isModule === true
}

export function loadLinkModule(base: Base, path: string): SiteCardCode {
  const text = code.readTextFile(base, path)
  const data = code.parseLinkText({ path, text })
  const directory = code.getLinkHost(path)
  return {
    directory,
    ...data,
  }
}

export function testHaveCard(base: Base, path: string): boolean {
  return path in base.cardsByPath
}
