import {
  Mesh,
  MeshFullType,
  MeshType,
  SiteProcessInputType,
  code,
} from '~'

export function createStringConstant(
  name: string,
  value: string,
): MeshType<Mesh.Constant> {
  return {
    complete: true,
    hidden: false,
    like: Mesh.Constant,
    name,
    partial: false,
    value: {
      complete: true,
      like: Mesh.String,
      partial: false,
      string: value,
    },
  }
}

export function findFullBooleanConstantByName(
  input: SiteProcessInputType,
  name: string,
): boolean | undefined {
  const children = code.assumeChildren(input)
  for (const node of children) {
    if (
      code.isRecord(node) &&
      !node.partial &&
      code.isMesh(node, Mesh.Constant) &&
      code.isMesh(node.value, Mesh.Boolean) &&
      node.name === name
    ) {
      return node.value.boolean
    }
  }
  return undefined
}

export function findFullStringConstantByName(
  input: SiteProcessInputType,
  name: string,
): string | undefined {
  const children = code.assumeChildren(input)
  for (const node of children) {
    if (
      code.isRecord(node) &&
      !node.partial &&
      code.isMesh(node, Mesh.Constant) &&
      code.isMesh(node.value, Mesh.String) &&
      node.name === name
    ) {
      return node.value.string
    }
  }
  return undefined
}

export function getBooleanConstant(
  c: MeshFullType<Mesh.Constant>,
): boolean {
  if (c.value && 'like' in c.value && c.value.like === Mesh.Boolean) {
    return c.value.boolean
  } else {
    throw Error('Oops')
  }
}

export function getStringConstant(
  c: MeshFullType<Mesh.Constant>,
): string {
  if (c.value && 'like' in c.value && c.value.like === Mesh.String) {
    return c.value.string
  } else {
    throw Error('Oops')
  }
}
