import { Mesh, PartialState } from '~'

export type MeshDeckFacePartialType = PartialState<
  MeshDeckFaceType,
  {
    like: 1
  },
  true
>

export type MeshDeckFacePotentialType =
  | MeshDeckFacePartialType
  | MeshDeckFaceType

export type MeshDeckFaceType = {
  email?: string
  like: Mesh.DeckFace
  name?: string
}

export type MeshDeckPartialType = PartialState<
  MeshDeckType,
  {
    face: 1
    like: 1
    term: 1
  },
  true
>

export type MeshDeckPotentialType =
  | MeshDeckPartialType
  | MeshDeckType

export type MeshDeckTermPartialType = PartialState<
  MeshDeckTermType,
  {
    like: 1
  },
  true
>

export type MeshDeckTermPotentialType =
  | MeshDeckTermPartialType
  | MeshDeckTermType

export type MeshDeckTermType = {
  like: Mesh.DeckTerm
  name: string
  partial: false
}

export type MeshDeckType = {
  bear?: string
  face: Array<MeshDeckFaceType>
  host: string
  like: Mesh.Deck
  mark: string
  name: string
  read?: string
  site?: string
  term: Array<MeshDeckTermType>
  test?: string
}
