import { Mesh, MeshNodeType, MeshPlaceholderType, code } from '~'
import type {
  MeshBooleanType,
  MeshPathLinkType,
  MeshStringArrayType,
  MeshStringType,
  MeshVariableType,
} from '~'

export function createMeshBoolean(value: boolean): MeshBooleanType {
  return {
    type: Mesh.Boolean,
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

export function createMeshString(value: string): MeshStringType {
  return {
    type: Mesh.String,
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
