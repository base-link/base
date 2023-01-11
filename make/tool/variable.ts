import {
  BlueBooleanType,
  BlueStringType,
  Color,
  Mesh,
  MeshNodeType,
  MeshPlaceholderType,
  code,
} from '~'
import type {
  MeshPathLinkType,
  MeshStringArrayType,
  MeshVariableType,
} from '~'

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

export function createMeshPlaceholder(
  name: string,
  value: MeshNodeType,
): MeshPlaceholderType {
  return {
    name,
    type: Mesh.Placeholder,
    value,
  }
}

export function createMeshStringArray(
  value: Array<string>,
): MeshStringArrayType {
  return {
    type: Mesh.StringArray,
    value,
  }
}

export function createMeshVariable(
  path: MeshPathLinkType,
): MeshVariableType {
  return {
    isDereference: code.createMeshBoolean(false),
    isMutable: code.createMeshBoolean(false),
    isOwner: code.createMeshBoolean(false),
    isReference: code.createMeshBoolean(false),
    // mapping, // where in the text tree it is.
    path,
    type: Mesh.Variable,
  }
}
