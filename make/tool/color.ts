import {
  BlackType,
  BlueBooleanLinkType,
  BlueBooleanType,
  BlueNodeType,
  BlueStringArrayType,
  BlueStringType,
  BlueTextType,
  BlueType,
  Color,
  Distributive,
  DistributiveOmit,
  LinkNodeType,
  LinkTextType,
  MESH_TERM_LINK_TYPE,
  Mesh,
  RedGatherType,
  RedType,
  SiteBlueType,
  SiteColorsType,
  SiteProcessInputType,
  SiteRedType,
  SiteStepScopeType,
  code,
} from '~'

export function assertBlue<T extends Mesh>(
  object: unknown,
  type: T | Array<T>,
  name?: string,
): asserts object is BlueNodeType<T> {
  if (!code.isBlue(object, type)) {
    code.throwError(code.generateIncorrectlyTypedVariable('mesh', name))
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

export function assertRed<T extends RedType, M extends Mesh>(
  object: unknown,
  type: M,
  property?: string,
): asserts object is T {
  if (!code.isRed(object, type)) {
    code.throwError(
      code.generateIncorrectlyTypedVariable('mesh', property),
    )
    // code.throwError(code.generateObjectNotTypeError(type))
  }
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

export function createBlueBoolean(value: boolean): BlueBooleanType {
  return {
    color: Color.Blue,
    type: Mesh.Boolean,
    value,
  }
}

export function createBlueString(value: string): BlueStringType {
  return {
    color: Color.Blue,
    type: Mesh.String,
    value,
  }
}

export function createBlueStringArray(
  value: Array<string>,
): BlueStringArrayType {
  return {
    color: Color.Blue,
    type: Mesh.StringArray,
    value,
  }
}

export function createBlueText(
  value: LinkTextType,
  scope: SiteStepScopeType,
): BlueTextType {
  return {
    color: Color.Blue,
    scope,
    type: Mesh.Text,
    value,
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

export function isBlue<T extends Mesh>(
  object: unknown,
  type: T | Array<T>,
): object is BlueNodeType<T> {
  const array: Array<string> = Array.isArray(type) ? type : [type]
  return (
    code.isRecord(object) &&
    'type' in object &&
    code.isString(object.type) &&
    array.includes((object as BlueNodeType<T>).type)
  )
}

export function isRed<T extends RedType>(
  object: unknown,
  type: string | Array<string>,
): object is T {
  const array: Array<string> = Array.isArray(type) ? type : [type]
  return (
    code.isRecord(object) &&
    'type' in object &&
    code.isString(object.type) &&
    array.includes(object.type)
  )
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
