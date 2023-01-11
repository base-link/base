import {
  BlackType,
  Color,
  LinkNodeType,
  LinkTermType,
  Mesh,
  MeshBaseType,
  SiteModuleBaseType,
} from '~'

export type RedBaseType = MeshBaseType & {
  color: Color.Red
}

export type RedGatherType = RedBaseType & {
  children: Array<BlackType | LinkNodeType>
  name?: string
  type: Mesh.Gather
}

export type RedModuleGatherType = SiteModuleBaseType &
  RedBaseType & {
    children: Array<BlackType>
    type: Mesh.ModuleGather
  }

export type RedType = RedGatherType | RedModuleGatherType
