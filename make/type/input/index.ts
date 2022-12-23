import {
  InitialMeshCodeCardType,
  InitialMeshDeckCardType,
  InitialMeshFormType,
  MeshForkType,
  TreeNestType,
} from '~'

export type ForkInputType = {
  fork: MeshForkType
}

export type FormInputType = ForkInputType & {
  form: InitialMeshFormType
}

export type MeshCodeCardInputType = ForkInputType & {
  card: InitialMeshCodeCardType
}

export type MeshDeckCardInputType = ForkInputType & {
  card: InitialMeshDeckCardType
}

export type NestInputType = ForkInputType & {
  index: number
  nest: TreeNestType
}
