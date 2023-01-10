import {
  Mesh,
  MeshConstantType,
  MeshType,
  MeshValueType,
  SiteProcessInputType,
  code,
} from '~'

export function createConstant(
  name: string,
  value: MeshValueType,
): MeshType<Mesh.Constant> {
  return {
    bound: true,
    hidden: false,
    like: Mesh.Constant,
    name,
    value,
  }
}

export function createStringConstant(
  name: string,
  value: string,
): MeshType<Mesh.Constant> {
  return {
    bound: true,
    hidden: false,
    like: Mesh.Constant,
    name,
    value: {
      bound: true,
      like: Mesh.String,
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

export function getBooleanConstant(c: MeshConstantType): boolean {
  if (c.value && 'like' in c.value && c.value.like === Mesh.Boolean) {
    return c.value.boolean
  } else {
    throw Error('Oops')
  }
}

export function getStringConstant(c: MeshConstantType): string {
  if (c.value && 'like' in c.value && c.value.like === Mesh.String) {
    return c.value.string
  } else {
    throw Error('Oops')
  }
}
