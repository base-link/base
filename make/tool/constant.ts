import { Mesh, MeshHint, SiteStepScopeType, code } from '~'
import type {
  LinkPathType,
  LinkTermType,
  MeshTermLinkType,
  MeshType,
  MeshValueType,
} from '~'

export function createConstant(
  name: MeshTermLinkType,
  value: MeshValueType,
): MeshType<Mesh.Constant> {
  return {
    bound: true,
    hidden: code.createMeshBoolean(false),
    name,
    type: Mesh.Constant,
    value,
  }
}

export function createMeshPath(
  value: LinkPathType,
): MeshType<Mesh.Path> {
  return {
    bound: false,
    type: Mesh.Path,
    value,
  }
}

export function createMeshTerm<T extends MeshHint>(
  value: LinkTermType,
  scope: SiteStepScopeType,
  hint: T,
): MeshType<Mesh.Term> {
  return {
    hint,
    scope,
    type: Mesh.Term,
    value,
  }
}
