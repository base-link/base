import { BlueNodeType, Mesh, RedGatherType, code } from '~'
import type { SiteProcessInputType } from '~'

export function filterBlue<T extends Mesh>(
  input: SiteProcessInputType,
  name: string,
  type: T | Array<T>,
): Array<BlueNodeType<T>> {
  const result: Array<BlueNodeType<T>> = []
  const children = code.assumeChildren(input)
  for (const node of children) {
    if (code.isBlue(node, type) && node.name === name) {
      result.push(node)
    }
  }
  return result
}

export function filterRed(
  input: SiteProcessInputType,
  name: string,
): Array<RedGatherType> {
  const result: Array<RedGatherType> = []
  const children = code.assumeChildren(input)
  for (const node of children) {
    if (code.isRed(node, Mesh.Gather) && node.name === name) {
      result.push(node)
    }
  }
  return result
}

export function findBlue(
  input: SiteProcessInputType,
  name: string,
): RedGatherType | undefined {
  const children = code.assumeChildren(input)
  for (const node of children) {
    if (code.isRed(node, Mesh.Gather) && node.name === name) {
      return node
    }
  }
  return undefined
}

export function findRed<T extends Mesh>(
  input: SiteProcessInputType,
  name: string,
  type: T | Array<T>,
): BlueNodeType<T> | undefined {
  const children = code.assumeChildren(input)
  for (const node of children) {
    if (code.isBlue(node, type) && node.name === name) {
      return node
    }
  }
  return undefined
}
