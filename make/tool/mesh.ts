import { Mesh, SiteProcessInputType, code } from '~'

export function assumeChildren(
  input: SiteProcessInputType,
): Array<unknown> {
  const parent = code.assumeElementAsGenericMesh(input)
  const children = code.assumeChildrenFromParent(parent)
  // code.assertMeshArray(children)
  return children
}

export function assumeChildrenFromParent(
  parent: Record<string, unknown>,
): Array<unknown> {
  if (
    code.isMesh(parent, Mesh.Pointer) &&
    code.isMesh(parent.value, Mesh.Gather)
  ) {
    return parent.value.children
  } else {
    return []
  }
}
