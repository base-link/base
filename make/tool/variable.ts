import {
  BluePathLinkType,
  BlueVariableType,
  Color,
  Mesh,
  code,
} from '~'

export function createBlueVariable(
  path: BluePathLinkType,
): BlueVariableType {
  return {
    color: Color.Blue,
    isDereference: code.createBlueBoolean(false),
    isMutable: code.createBlueBoolean(false),
    isOwner: code.createBlueBoolean(false),
    isReference: code.createBlueBoolean(false),
    // mapping, // where in the text tree it is.
    path,
    type: Mesh.Variable,
  }
}
