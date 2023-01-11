import { Mesh, code } from '~'
import type { MeshType, SiteProcessInputType } from '~'

export function filterPlaceholders(
  input: SiteProcessInputType,
  name: string,
): Array<MeshType<Mesh>> {
  const result: Array<MeshType<Mesh>> = []
  const children = code.assumeChildren(input)
  for (const node of children) {
    if (
      code.isMesh(node, Mesh.Pointer) &&
      code.isMesh(node.value, Mesh.Placeholder) &&
      node.value.name === name
    ) {
      result.push(node)
    }
  }
  return result
}

export function findRedPlaceholder(
  input: SiteProcessInputType,
  name: string,
): MeshType<Mesh> | undefined {
  const children = code.assumeChildren(input)
  for (const node of children) {
    if (code.isMesh(node, Mesh.Placeholder) && node.name === name) {
      return node
    }
  }
  return undefined
}
