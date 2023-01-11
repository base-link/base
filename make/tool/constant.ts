import {
  BlackType,
  Color,
  LinkNodeType,
  Mesh,
  RedPlaceholderType,
  SiteProcessInputType,
  SiteStepScopeType,
  code,
} from '~'
import type { LinkPathType, LinkTermType } from '~'

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

export function createRedPlaceholder(
  input: SiteProcessInputType,
  value: LinkNodeType | BlackType,
  name?: string,
): RedPlaceholderType {
  return {
    color: Color.Red,
    name,
    scope: input.scope,
    type: Mesh.Placeholder,
    value,
  }
}
