export type ASTDeckFaceType = {
  email?: string
  like: 'deck-face'
  name?: string
}

export type ASTDeckTermType = {
  like: 'deck-term'
  name: string
}

export type ASTDeckType = {
  bear?: string
  face: ASTDeckFaceType
  host: string
  like: 'deck'
  mark: string
  name: string
  read?: string
  site?: string
  term: ASTDeckTermType
  test?: string
}
