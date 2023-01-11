import {
  Base,
  Color,
  DistributiveOmit,
  Link,
  LinkNodeType,
  Mesh,
  SiteLinkType,
  assertRed,
  code,
} from '~'
import type {
  BlueType,
  LinkTreeType,
  RedType,
  SiteBlueType,
  SiteModuleBaseType,
  SiteProcessInputType,
  SiteRedType,
  SiteStepScopeType,
  SiteYellowType,
  YellowType,
} from '~'

export type MeshParseType = {
  directory: string
  linkTree: LinkTreeType
  path: string
  text: string
  textByLine: Array<string>
}

export type SiteColorsType = {
  blue?: SiteBlueType
  red?: SiteRedType
  yellow?: SiteYellowType
}

export type SiteCreateInputType = {
  base: Base
  bindings: Record<string, unknown>
  module: SiteModuleBaseType
  red: SiteRedType
  scope: SiteStepScopeType
}

export function attachBlue(
  input: SiteProcessInputType,
  property: string,
  node: DistributiveOmit<BlueType, 'color'>,
): SiteBlueType {
  const child: SiteBlueType = {
    node: {
      ...node,
      color: Color.Blue,
    },
    parent: input.blue,
  }

  if (child.parent) {
    const node = child.parent.node
    ;(node as Record<string, unknown>)[property] = child.node
  }

  return child
}

export function childrenAreBoundMesh(
  node: Record<string, unknown>,
): boolean {
  return (
    'children' in node &&
    code.isArray(node.children) &&
    node.children.filter(x => code.isGenericMesh(x) && x.bound)
      .length === node.children.length
  )
}

export function childrenAreMesh(
  node: Record<string, unknown>,
): boolean {
  return (
    'children' in node &&
    code.isArray(node.children) &&
    node.children.filter(x => code.isGenericNest(x)).length === 0
  )
}

export function childrenAreNotDirectlyDynamic(
  node: Record<string, unknown>,
): boolean {
  return (
    'children' in node &&
    code.isArray(node.children) &&
    node.children.filter(
      x => code.isGenericMesh(x) && x.type === Mesh.Term,
    ).length === 0
  )
}

export function createElement(
  node: MeshType<Mesh> | NestType<Nest>,
  parent?: SiteElementType,
): SiteElementType {
  return {
    node,
    parent,
  }
}

export function createLink(
  input: SiteProcessInputType,
  link: LinkTreeType,
  index?: number,
): SiteLinkType {
  return {
    element: link,
    index,
    parent: input.link,
  }
}

export function createRed(
  input: SiteProcessInputType,
  node: DistributiveOmit<RedType, 'color'>,
): SiteRedType {
  const child: SiteRedType = {
    node: {
      ...node,
      color: Color.Red,
    },
    parent: input.red,
  }

  if (child.parent) {
    child.parent.node.children.push(child.node)
  }

  return child
}

export function createTopBlue(
  node: DistributiveOmit<BlueType, 'color'>,
): SiteBlueType {
  return {
    node: {
      ...node,
      color: Color.Blue,
    },
  }
}

export function createTopLink(
  link: LinkTreeType,
  index?: number,
): SiteLinkType {
  return {
    element: link,
    index,
  }
}

export function createTopRed(
  node: DistributiveOmit<RedType, 'color'>,
): SiteRedType {
  return {
    node: {
      ...node,
      color: Color.Red,
    },
  }
}

export function createTopYellow(
  node: DistributiveOmit<YellowType, 'color'>,
): SiteYellowType {
  return {
    node: {
      ...node,
      color: Color.Yellow,
    },
  }
}

export function createYellow(
  input: SiteProcessInputType,
  node: DistributiveOmit<YellowType, 'color'>,
): SiteYellowType {
  return {
    node: {
      ...node,
      color: Color.Yellow,
    },
    parent: input.yellow,
  }
}

export function gatherIntoMeshParent(
  input: SiteProcessInputType,
  pushed: MeshType<Mesh>,
): void {
  const data = input.element.node
  code.assertMesh(data, Mesh.Pointer)
  code.assertMesh(data.value, Mesh.Gather)
  data.value.children.push(pushed)
}

export function getNestedProperty(
  object: Record<string, unknown>,
  path: Array<string>,
): unknown {
  let value: unknown = object
  path.forEach(part => {
    if (code.isRecord(value)) {
      value = value[part]
    } else {
      value = undefined
    }
  })
  return value
}

export function getProperty(
  object: Record<string, unknown>,
  path: string,
): unknown {
  if (code.isRecord(object) && path in object) {
    return object[path]
  }
}

export function getWithObjectDefault(
  obj: Record<string, unknown>,
  name: string,
): Record<string, unknown> {
  let value = obj[name]

  if (!code.isRecord(value)) {
    value = obj[name] = {}
  }

  code.assertRecord(value)
  return value
}

export function insertIntoRed(
  input: SiteProcessInputType,
  value: RedType,
): void {
  const red = input.red.node
  code.assertRed(red, Mesh.Gather)
  red.children.push(value)
}

export function loadLinkModule(
  base: Base,
  path: string,
): MeshParseType {
  const text = code.readTextFile(base, path)
  const data = code.parseLinkText({ path, text })
  const directory = code.getLinkHost(path)
  return {
    directory,
    ...data,
  }
}

export const mergeObjects = _.merge

export function processNestedChildren(
  input: SiteProcessInputType,
  nest: LinkTreeType,
  cb: (input: SiteProcessInputType) => void,
): void {
  nest.nest.forEach((nest, index) => {
    cb(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function pushBlue(
  input: SiteProcessInputType,
  property: string,
  node: DistributiveOmit<BlueType, 'color'>,
): SiteBlueType {
  const child: SiteBlueType = {
    node: {
      ...node,
      color: Color.Blue,
    },
    parent: input.blue,
  }

  if (child.parent) {
    const node = child.parent.node
    const array = (node as Record<string, unknown>)[property]
    code.assertArray(array)
    array.push(child.node)
  }

  return child
}

export function replaceIfBound(
  input: SiteProcessInputType,
  child: NestBaseType,
  cb: () => void,
): void {
  if (code.childrenAreMesh(child)) {
    code.potentiallyReplaceWithFullNode(input, cb)
  }
}

export function replaceSeed<T extends SiteModuleBaseType>(
  input: SiteProcessInputType,
  replacement: T,
): void {
  input.module = replacement
  input.module.base.card(input.module.path)?.bind(replacement)
}

export function resolveHashtagAsNumber(
  input: SiteProcessInputType,
): number | undefined {
  let hashtag = code.assumeLink(input, Link.Hashtag)

  switch (hashtag.system) {
    case 'b':
      return parseInt(hashtag.code, 2)
    case 'x':
      return parseInt(hashtag.code, 16)
    case 'o':
      return parseInt(hashtag.code, 8)
    case 'h':
      return parseInt(hashtag.code, 16)
    case 'd':
      return parseInt(hashtag.code, 10)
    case 's':
      return parseInt(hashtag.code, 60)
    case 't':
      return parseInt(hashtag.code, 12)
    default:
      // this is caught earlier
      code.throwError(code.generateInvalidCompilerStateError())
  }
}

export function withColors(
  input: SiteProcessInputType,
  { red, yellow, blue }: SiteColorsType,
): SiteProcessInputType {
  const newInput = { ...input }
  if (red) {
    newInput.red = red
  }
  if (yellow) {
    newInput.yellow = yellow
  }
  if (blue) {
    newInput.blue = blue
  }
  return newInput
}

export function withEnvironment(
  input: SiteProcessInputType,
  bindings: Record<string, unknown>,
): SiteProcessInputType {
  return {
    ...input,
    environment: code.createEnvironment(bindings, input.environment),
  }
}

export function withScope(
  input: SiteProcessInputType,
  scope: SiteStepScopeType,
): SiteProcessInputType {
  return {
    ...input,
    scope,
  }
}
