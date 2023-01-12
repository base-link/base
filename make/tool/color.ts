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
  Red,
  RedGatherType,
  RedNodeType,
  RedType,
  RedValueType,
  SiteBlueType,
  SiteColorsType,
  SiteObserverState,
  SiteProcessInputType,
  SiteRedType,
  code,
} from '~'

export function assertBlue<T extends Mesh>(
  object: unknown,
  type: T | Array<T>,
  name?: string,
): asserts object is BlueNodeType<T> {
  if (!code.isBlue(object, type)) {
    code.throwError(code.generateIncorrectlyTypedVariable('blue', name))
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
        code.generateIncorrectlyTypedVariable('blue', name),
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

export function assertGenericBlue(
  object: unknown,
  name?: string,
): asserts object is BlueType {
  if (!code.isGenericBlue(object)) {
    code.throwError(code.generateIncorrectlyTypedVariable('blue', name))
  }
}

export function assertRed<T extends Red>(
  object: unknown,
  type: T,
  property?: string,
): asserts object is RedNodeType<T> {
  if (!code.isRed(object, type)) {
    code.throwError(
      code.generateIncorrectlyTypedVariable('red', property),
    )
  }
}

export function attachBlue(
  input: SiteProcessInputType,
  property: string,
  node: DistributiveOmit<BlueType, 'color' | 'state'>,
): SiteBlueType {
  const child: SiteBlueType = code.createBlue(input, node)
  const parent = child.parent
  code.assertRecord(parent)

  child.node.attachedAs = property
  ;(parent.node as Record<string, unknown>)[property] = child.node

  return child
}

export function attachBlueValue(
  input: SiteProcessInputType,
  property: string,
  node: unknown,
): void {
  code.assertRecord(input.blue)
  if (code.isGenericBlue(node)) {
    node.attachedAs = property
  }
  ;(input.blue.node as Record<string, unknown>)[property] = node
}

export function createBlue(
  input: SiteProcessInputType,
  node: DistributiveOmit<BlueType, 'color' | 'state' | 'attachedAs'>,
): SiteBlueType {
  return {
    node: {
      ...node,
      color: Color.Blue,
      state: SiteObserverState.Initialized,
    },
    parent: input.blue,
  }
}

export function createBlueBoolean(value: boolean): BlueBooleanType {
  return {
    color: Color.Blue,
    state: SiteObserverState.RuntimeComplete,
    type: Mesh.Boolean,
    value,
  }
}

export function createBlueString(value: string): BlueStringType {
  return {
    color: Color.Blue,
    state: SiteObserverState.RuntimeComplete,
    type: Mesh.String,
    value,
  }
}

export function createBlueStringArray(
  value: Array<string>,
): BlueStringArrayType {
  return {
    color: Color.Blue,
    state: SiteObserverState.RuntimeComplete,
    type: Mesh.StringArray,
    value,
  }
}

export function createBlueText(
  input: SiteProcessInputType,
  value: LinkTextType,
): BlueTextType {
  return {
    color: Color.Blue,
    scope: input.scope,
    state: SiteObserverState.Initialized,
    type: Mesh.Text,
    value,
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

export function createRedValue(
  input: SiteProcessInputType,
  name: string | undefined,
  value: BlackType | LinkNodeType,
): RedValueType {
  return {
    color: Color.Red,
    name,
    scope: input.scope,
    type: Mesh.Value,
    value,
  }
}

export function createTopBlue(
  node: DistributiveOmit<BlueType, 'color' | 'state' | 'attachedAs'>,
): SiteBlueType {
  return {
    node: {
      ...node,
      color: Color.Blue,
      state: SiteObserverState.Initialized,
    },
  }
}

export function createTopRed(
  node: DistributiveOmit<RedType, 'color' | 'state'>,
): SiteRedType {
  return {
    node: {
      ...node,
      color: Color.Red,
    },
  }
}

export function getBlueValue(
  input: SiteProcessInputType,
  property: string,
): unknown {
  code.assertRecord(input.blue)
  return (input.blue.node as Record<string, unknown>)[property]
}

export function hasBlueValue(
  input: SiteProcessInputType,
  property: string,
): boolean {
  code.assertRecord(input.blue)
  return property in input.blue.node
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
    array.includes(object.type) &&
    object.color === Color.Blue
  )
}

export function isGenericBlue(object: unknown): object is BlueType {
  return (
    code.isRecord(object) &&
    'color' in object &&
    code.isString(object.color) &&
    object.color === Color.Blue
  )
}

export function isRed<T extends Red>(
  object: unknown,
  type: T | Array<T>,
): object is RedNodeType<T> {
  const array: Array<string> = Array.isArray(type) ? type : [type]
  return (
    code.isRecord(object) &&
    'type' in object &&
    code.isString(object.type) &&
    array.includes(object.type) &&
    object.color === Color.Red
  )
}

export function pushBlue(
  input: SiteProcessInputType,
  property: string,
  node: DistributiveOmit<BlueType, 'color' | 'state' | 'attachedAs'>,
): SiteBlueType {
  const child: SiteBlueType = {
    node: {
      ...node,
      attachedAs: '*',
      color: Color.Blue,
      state: SiteObserverState.Initialized,
    },
    parent: input.blue,
  }

  if (child.parent) {
    const node = child.parent.node
    const array = (node as Record<string, unknown>)[property]
    code.assertArray(array, property, input.module.path)
    array.push(child.node)
  }

  code.triggerObjectBindingUpdate

  return child
}

export function pushRed(
  input: SiteProcessInputType,
  node: DistributiveOmit<RedType, 'color' | 'state'>,
): SiteRedType {
  const child: SiteRedType = {
    node: {
      ...node,
      color: Color.Red,
    },
    parent: input.red,
  }

  if (child.parent) {
    const node = child.parent.node
    code.assertRed(node, Mesh.Gather)
    node.children.push(child.node)
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
