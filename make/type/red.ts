import { BlackType, Color, LinkNodeType, Mesh, MeshBaseType } from '~'

export type RedBaseType = MeshBaseType & {
  color: Color.Red
}

export type RedGatherType = RedBaseType & {
  children: Array<BlackType | LinkNodeType>
  name?: string
  type: Mesh.Gather
}

export type RedType = RedGatherType
