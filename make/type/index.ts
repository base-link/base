import { ASTModuleBaseType, ASTScopeType } from '~'

export * from './mesh'

export type APIInputType = {
  card: ASTModuleBaseType
  lexicalScope: ASTScopeType
  nestScope?: ASTScopeType
  objectScope: ASTScopeType
}
