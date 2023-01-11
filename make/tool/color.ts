import {
  BlueBooleanType,
  BlueStringArrayType,
  BlueStringType,
  BlueTextType,
  BlueType,
  Color,
  DistributiveOmit,
  LinkTextType,
  Mesh,
  RedType,
  SiteBlueType,
  SiteColorsType,
  SiteProcessInputType,
  SiteRedType,
  SiteStepScopeType,
  code,
} from '~'

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
