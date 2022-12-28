import { api } from '~'
import type { ModuleBaseType, ScopeType } from '~'

export * from './mesh/index.js'

export type APIInputType = {
  card: ASTModuleBaseType
  lexicalScope: ASTScopeType
  nestScope?: ASTScopeType
  objectScope: ASTScopeType
}
