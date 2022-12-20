import { ASTCordType, CompilerListType } from '~base/server'

export type ASTDeckType = {
  like: 'deck'
  host?: ASTCordType
  name?: ASTCordType
  mark?: ASTCordType // version
  bear?: ASTCordType // entrypoint to library, tells us what to copy over.
  site?: ASTCordType // entrypoint to app.
  test?: ASTCordType // entrypoint to tests.
  read?: ASTCordType
  term: CompilerListType<ASTDeckTermType> // licenses
  face: CompilerListType<ASTDeckFaceType> // people
}

export type ASTDeckTermType = {
  like: 'deck-term'
  name: ASTCordType
}

export type ASTDeckFaceType = {
  like: 'deck-face'
  name?: ASTCordType
  email?: ASTCordType
}
