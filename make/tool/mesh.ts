import {
  BlackType,
  BlueBooleanLinkType,
  BlueNodeType,
  Color,
  Distributive,
  LINK_TYPE,
  Link,
  LinkNodeType,
  LinkType,
  MESH_TERM_LINK_TYPE,
  Mesh,
  RedGatherType,
  SiteProcessInputType,
  code,
} from '~'

export function assertBlue<T extends Mesh>(
  object: unknown,
  type: T | Array<T>,
  name?: string,
): asserts object is BlueNodeType<T> {
  if (!code.isBlue(object, type)) {
    code.throwError(code.generateIncorrectlyTypedVariable('mesh', name))
    // code.throwError(code.generateObjectNotTypeError(type))
  }
}

export function assertBlueArray<T extends Mesh>(
  array: Array<unknown>,
  type: T | Array<T>,
  name?: string,
): asserts array is Array<BlueNodeType<T>> {
  array.forEach(object => {
    if (!code.isBlue(object, type)) {
      code.throwError(
        code.generateIncorrectlyTypedVariable('mesh', name),
      )
      // code.throwError(code.generateObjectNotTypeError(type))
    }
  })
}

export function assertBlueBoolean(
  object: unknown,
): asserts object is BlueBooleanLinkType {
  code.assertBlue(object, [
    Mesh.Boolean,
    Mesh.String,
    Mesh.StringArray,
    Mesh.Term,
    Mesh.Path,
  ])
}

export function assertBlueOrUndefined<T extends Mesh>(
  object: unknown,
  type: T | Array<T>,
  name?: string,
): asserts object is BlueNodeType<T> | undefined {
  if (code == undefined) {
    return
  }

  code.assertBlue(object, type, name)
}

export function assertBluePath(
  object: unknown,
): asserts object is BlueNodeType<Mesh.StringArray | Mesh.Path> {
  code.assertBlue(object, [Mesh.StringArray, Mesh.Path])
}

export function assertBlueStepArray(
  array: Array<unknown>,
): asserts array is Array<
  BlueNodeType<Mesh.Call | Mesh.Assertion | Mesh.Constant>
> {
  code.assertBlueArray(array, [
    Mesh.Call,
    Mesh.Assertion,
    Mesh.Constant,
  ])
}

export function assertBlueTerm(
  object: unknown,
): asserts object is BlueNodeType<Mesh.String | Mesh.Term> {
  code.assertBlue(object, MESH_TERM_LINK_TYPE)
}

export function assertBlueText(
  object: unknown,
): asserts object is BlueNodeType<Mesh.Text | Mesh.String> {
  code.assertBlue(object, [Mesh.String, Mesh.Text])
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

export function createRedGather(
  input: SiteProcessInputType,
  name: string | undefined,
  children: Array<Distributive<BlackType | LinkNodeType>> = [],
): RedGatherType {
  return {
    children,
    color: Color.Red,
    name,
    scope: input.scope,
    type: Mesh.Gather,
  }
}

export function isBlue<T extends Mesh>(
  object: unknown,
  type: T,
): object is BlueNodeType<T> {
  const array: Array<T> = Array.isArray(type) ? type : [type]
  return (
    code.isRecord(object) &&
    'type' in object &&
    code.isString(object.type) &&
    array.includes((object as BlueNodeType<T>).type)
  )
}

export function isGenericLink(
  object: unknown,
): object is LinkType<Link> {
  return (
    code.isObjectWithType(object) &&
    LINK_TYPE.includes((object as LinkType<Link>).type)
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
