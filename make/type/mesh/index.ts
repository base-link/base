import {
  Mesh,
  MeshBearPotentialType,
  MeshBindPotentialType,
  MeshBindableObjectType,
  MeshBindableStringType,
  MeshBookCardPotentialType,
  MeshCallPotentialType,
  MeshCodeCardPotentialType,
  MeshCordPotentialType,
  MeshDeckCardPotentialType,
  MeshDeckFacePotentialType,
  MeshDeckPotentialType,
  MeshDeckTermPotentialType,
  MeshDependencyPartType,
  MeshDependencyType,
  MeshFacePotentialType,
  MeshFormPotentialType,
  MeshFusePotentialType,
  MeshHoldPotentialType,
  MeshHookPotentialType,
  MeshHostPotentialType,
  MeshLexicalScopeType,
  MeshLikePotentialType,
  MeshLoadPotentialType,
  MeshLoadTakePotentialType,
  MeshLoadTakeSavePotentialType,
  MeshMarkPotentialType,
  MeshReadDrawPotentialType,
  MeshReadLoanPotentialType,
  MeshReadMovePotentialType,
  MeshScopeType,
  MeshSuitPotentialType,
  MeshSuitTaskPotentialType,
  MeshTakePotentialType,
  MeshTaskPotentialType,
  MeshTermPotentialType,
  MeshTestPotentialType,
  MeshTreePotentialType,
  MeshWearPotentialType,
  MeshZonePotentialType,
  MeshZoneToolPotentialType,
} from '~'

export * from './book'
export * from './card'
export * from './code'
export * from './deck'
export * from './dependency'
export * from './list'

export type MeshNodeMappingType = {
  'mesh-bear': MeshBearPotentialType
  'mesh-bind': MeshBindPotentialType
  'mesh-bindable-object': MeshBindableObjectType
  'mesh-bindable-string': MeshBindableStringType
  'mesh-book-card': MeshBookCardPotentialType
  'mesh-call': MeshCallPotentialType
  'mesh-code-card': MeshCodeCardPotentialType
  'mesh-cord': MeshCordPotentialType
  'mesh-deck': MeshDeckPotentialType
  'mesh-deck-card': MeshDeckCardPotentialType
  'mesh-deck-face': MeshDeckFacePotentialType
  'mesh-deck-term': MeshDeckTermPotentialType
  'mesh-dependency': MeshDependencyType
  'mesh-dependency-part': MeshDependencyPartType
  'mesh-face': MeshFacePotentialType
  'mesh-form': MeshFormPotentialType
  'mesh-fuse': MeshFusePotentialType
  'mesh-hold': MeshHoldPotentialType
  'mesh-hook': MeshHookPotentialType
  'mesh-host': MeshHostPotentialType
  'mesh-lexical-scope': MeshLexicalScopeType
  'mesh-like': MeshLikePotentialType
  'mesh-load': MeshLoadPotentialType
  'mesh-load-take': MeshLoadTakePotentialType
  'mesh-load-take-save': MeshLoadTakeSavePotentialType
  'mesh-mark': MeshMarkPotentialType
  'mesh-read-draw': MeshReadDrawPotentialType
  'mesh-read-loan': MeshReadLoanPotentialType
  'mesh-read-move': MeshReadMovePotentialType
  'mesh-scope': MeshScopeType
  'mesh-suit': MeshSuitPotentialType
  'mesh-suit-task': MeshSuitTaskPotentialType
  'mesh-take': MeshTakePotentialType
  'mesh-task': MeshTaskPotentialType
  'mesh-term': MeshTermPotentialType
  'mesh-test': MeshTestPotentialType
  'mesh-tree': MeshTreePotentialType
  'mesh-wear': MeshWearPotentialType
  'mesh-zone': MeshZonePotentialType
  'mesh-zone-tool': MeshZoneToolPotentialType
}

export type MeshType<T extends Mesh> = MeshNodeMappingType[T]
