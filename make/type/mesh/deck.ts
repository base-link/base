import { Mesh } from '~'

export type MeshDeckFaceType = {
  email?: string
  like: Mesh.DeckFace
  name?: string
}

export type MeshDeckTermType = {
  like: Mesh.DeckTerm
  name: string
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
