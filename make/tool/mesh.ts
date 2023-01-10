import {
  LINK_TYPE,
  Link,
  LinkTextType,
  LinkType,
  MESH_TERM_LINK_TYPE,
  MESH_TYPE,
  Mesh,
  MeshBooleanLinkPointerType,
  MeshGatherType,
  MeshHint,
  MeshPointerType,
  MeshTermLinkPointerType,
  MeshTextType,
  MeshType,
  SiteProcessInputType,
  SiteStepScopeType,
  code,
} from '~'

export function assertGenericLink(
  object: unknown,
  name?: string,
): asserts object is LinkType<Link> {
  if (!code.isGenericLink(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('link', name))
    // code.throwError(code.generateObjectNotTypeError(type))
  }
}

export function assertGenericMesh(
  object: unknown,
  name?: string,
): asserts object is MeshType<Mesh> {
  if (!code.isGenericLink(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('mesh', name))
    // code.throwError(code.generateObjectNotTypeError(type))
  }
}

export function assertGenericMeshPointer(
  object: unknown,
): asserts object is MeshPointerType {
  code.assertMesh(object, [Mesh.Pointer])
}

export function assertLink<T extends Link>(
  object: unknown,
  type: T,
  name?: string,
): asserts object is LinkType<T> {
  if (!code.isLink(object, type)) {
    code.throwError(code.generateIncorrectlyTypedVariable('link', name))
    // code.throwError(code.generateObjectNotTypeError(type))
  }
}

export function assertMesh<T extends Mesh>(
  object: unknown,
  type: T | Array<T>,
  name?: string,
): asserts object is MeshType<T> {
  if (!code.isMesh(object, type)) {
    code.throwError(code.generateIncorrectlyTypedVariable('mesh', name))
    // code.throwError(code.generateObjectNotTypeError(type))
  }
}

export function assertMeshArray<T extends Mesh>(
  array: Array<unknown>,
  type: T | Array<T>,
  name?: string,
): asserts array is Array<MeshType<T>> {
  array.forEach(object => {
    if (!code.isMesh(object, type)) {
      code.throwError(
        code.generateIncorrectlyTypedVariable('mesh', name),
      )
      // code.throwError(code.generateObjectNotTypeError(type))
    }
  })
}

export function assertMeshBoolean(
  object: unknown,
): asserts object is MeshType<
  Mesh.Boolean | Mesh.String | Mesh.StringArray | Mesh.Term | Mesh.Path
> {
  code.assertMesh(object, [
    Mesh.Boolean,
    Mesh.String,
    Mesh.StringArray,
    Mesh.Term,
    Mesh.Path,
  ])
}

export function assertMeshBooleanPointer(
  object: unknown,
): asserts object is MeshBooleanLinkPointerType {
  code.assertMesh(object, Mesh.Pointer)
  code.assertMeshBoolean(object.value)
}

export function assertMeshOrUndefined<T extends Mesh>(
  object: unknown,
  type: T | Array<T>,
  name?: string,
): asserts object is MeshType<T> | undefined {
  if (code == undefined) {
    return
  }

  code.assertMesh(object, type, name)
}

export function assertMeshPath(
  object: unknown,
): asserts object is MeshType<Mesh.StringArray | Mesh.Path> {
  code.assertMesh(object, [Mesh.StringArray, Mesh.Path])
}

export function assertMeshPointer<T extends Mesh>(
  object: unknown,
  type: T | Array<T>,
): asserts object is MeshPointerType<T> {
  code.assertMesh(object, [Mesh.Pointer])
  code.assertMesh(object.value, type)
}

export function assertMeshPointerArray(
  array: Array<unknown>,
): asserts array is Array<MeshType<Mesh.Pointer>> {
  code.assertMeshArray(array, [Mesh.Pointer])
}

export function assertMeshStepArray(
  array: Array<unknown>,
): asserts array is Array<
  MeshType<Mesh.Call | Mesh.Assertion | Mesh.Constant>
> {
  code.assertMeshArray(array, [
    Mesh.Call,
    Mesh.Assertion,
    Mesh.Constant,
  ])
}

export function assertMeshTerm(
  object: unknown,
): asserts object is MeshType<Mesh.String | Mesh.Term> {
  code.assertMesh(object, MESH_TERM_LINK_TYPE)
}

export function assertMeshTermPointer(
  object: unknown,
): asserts object is MeshTermLinkPointerType {
  code.assertMesh(object, Mesh.Pointer)
  code.assertMeshTerm(object.value)
}

export function assertMeshText(
  object: unknown,
): asserts object is MeshType<Mesh.Text | Mesh.String> {
  code.assertMesh(object, [Mesh.String, Mesh.Text])
}

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

export function assumeLink<T extends Link>(
  input: SiteProcessInputType,
  type: T,
  name?: string,
): LinkType<T> {
  const nest = code.assumeLinkNest(input)
  code.assertLink(nest, type, name)
  return nest
}

export function assumeMesh<T extends Mesh>(
  input: SiteProcessInputType,
  type: T | Array<T>,
  name?: string,
): MeshType<T> {
  const nest = code.assumeLinkNest(input)
  code.assertMesh(nest, type, name)
  return nest
}

export function assumeZippedMesh<T extends Mesh>(
  input: SiteProcessInputType,
  name: string,
  type: T | Array<T>,
): MeshPointerType<T> {
  const value = code.findPlaceholderByName(input, name)
  code.assertGenericMeshPointer(value)
  code.replaceMeshPointerWithPlaceholder(value, type)
  return value
}

export function assumeZippedMeshArray<T extends Mesh>(
  input: SiteProcessInputType,
  name: string,
  type: T | Array<T>,
): Array<MeshPointerType<T>> {
  const array = code.filterPlaceholdersByName(input, name)
  code.assertMeshPointerArray(array)
  code.replaceEachMeshPointerWithPlaceholder(array, type)
  return array
}

export function assumeZippedMeshOrUndefined<T extends Mesh>(
  input: SiteProcessInputType,
  name: string,
  type: T | Array<T>,
): MeshPointerType<T> | undefined {
  const value = code.findPlaceholderByName(input, name)
  if (value) {
    code.assertMeshPointer(value)
    code.replaceMeshPointerWithPlaceholder(value, type)
  }
  return value
}

export function createMeshGather(
  name: string,
  scope: SiteStepScopeType,
): MeshGatherType {
  return {
    children: [],
    name,
    scope,
    type: Mesh.Gather,
  }
}

export function createMeshPointer(
  value: MeshType<Mesh>,
): MeshPointerType {
  return {
    type: Mesh.Pointer,
    value,
  }
}

export function createMeshText(
  value: LinkTextType,
  scope: SiteStepScopeType,
): MeshTextType {
  return {
    scope,
    type: Mesh.Text,
    value,
  }
}

export function getMeshHintFromChildren(
  input: SiteProcessInputType,
): MeshHint {
  const children = code.assumeChildren(input)
  const dynamicFound = children.find(
    child =>
      code.isGenericMesh(child) && child.hint === MeshHint.Dynamic,
  )
  return dynamicFound ? MeshHint.Dynamic : MeshHint.Static
}

export function isGenericLink(
  object: unknown,
): object is LinkType<Link> {
  return (
    code.isObjectWithType(object) &&
    LINK_TYPE.includes((object as LinkType<Link>).type)
  )
}

export function isGenericMesh(
  object: unknown,
): object is MeshType<Mesh> {
  return (
    code.isObjectWithType(object) &&
    MESH_TYPE.includes((object as MeshType<Mesh>).type)
  )
}

export function isLink<T extends Link>(
  object: unknown,
  type: T,
): object is LinkType<T> {
  return (
    code.isObjectWithType(object) &&
    (object as LinkType<T>).type === type
  )
}

export function isMesh<T extends Mesh>(
  object: unknown,
  type: T | Array<T>,
): object is MeshType<T> {
  const array: Array<T> = Array.isArray(type) ? type : [type]
  return (
    code.isRecord(object) &&
    'type' in object &&
    array.includes((object as MeshType<T>).type)
  )
}

export function isObjectWithType(object: unknown): boolean {
  return code.isRecord(object) && 'type' in object
}

export function potentiallyReplaceWithSemiStaticMesh(
  input: SiteProcessInputType,
  generator: () => MeshType<Mesh>,
): void {
  if (!code.childrenAreNotDirectlyDynamic(input.element)) {
    return
  }

  const data = code.assumeElementAsGenericMesh(input)
  const parentData = code.assumeElementAsMesh(input, Mesh.Gather, 1)

  if (
    !(
      'children' in parentData &&
      code.isArray(parentData.children) &&
      'children' in data &&
      code.isArray(data.children) &&
      data.children.length
    )
  ) {
    return
  }

  const index = parentData.children.indexOf(data)
  const generated = generator()
  parentData.children[index] = generated
}

export function replaceEachMeshPointerWithPlaceholder<T extends Mesh>(
  array: Array<MeshPointerType>,
  type: T | Array<T>,
): asserts array is Array<MeshPointerType<T>> {
  array.forEach(node => {
    code.assertMesh(node.value, Mesh.Placeholder)
    code.assertMesh(node.value.value, type)
    node.value = node.value.value
  })
}

export function replaceMeshPointerWithPlaceholder<T extends Mesh>(
  node: MeshPointerType,
  type: T | Array<T>,
): asserts node is MeshPointerType<T> {
  code.assertMesh(node.value, Mesh.Placeholder)
  node.value = node.value.value
  code.assertMesh(node.value, type)
}
