import { Base, BaseCard, Mesh, MeshModuleBaseType, code } from '~'

export function assertMeshModule(
  object: unknown,
): asserts object is MeshModuleBaseType {
  if (!code.isMeshModule(object)) {
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

export function isMeshModule(
  object: unknown,
): object is MeshModuleBaseType {
  return (object as MeshModuleBaseType).isModule === true
}
