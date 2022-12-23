import {
  Mesh,
  MeshBearType,
  MeshBindType,
  MeshBondType,
  MeshBookCardType,
  MeshCallType,
  MeshCodeCardType,
  MeshCordType,
  MeshDeckCardType,
  MeshDeckFaceType,
  MeshDeckTermType,
  MeshDeckType,
  MeshFaceType,
  MeshFormType,
  MeshHoldType,
  MeshHookType,
  MeshHostType,
  MeshLikeType,
  MeshLoadTakeSaveType,
  MeshLoadTakeType,
  MeshLoadType,
  MeshMarkType,
  MeshReadDrawType,
  MeshReadLoanType,
  MeshReadMoveType,
  MeshReadType,
  MeshSeekType,
  MeshSuitTaskType,
  MeshSuitType,
  MeshTakeType,
  MeshTaskFlowType,
  MeshTaskType,
  MeshTermType,
  MeshTestType,
  MeshTreeType,
  MeshWearType,
  MeshZoneToolType,
  MeshZoneType,
} from '~'

export * from './book'
export * from './card'
export * from './code'
export * from './deck'
export * from './list'

export type MeshForkType = {
  data: Record<string, unknown>
  like: Mesh.Fork
  parent?: MeshForkType
}

export type MeshNodeMappingType = {
  'mesh-bear': MeshBearType
  'mesh-bind': MeshBindType
  'mesh-bond': MeshBondType
  'mesh-book-card': MeshBookCardType
  'mesh-call': MeshCallType
  'mesh-code-card': MeshCodeCardType
  'mesh-cord': MeshCordType
  'mesh-deck': MeshDeckType
  'mesh-deck-card': MeshDeckCardType
  'mesh-deck-face': MeshDeckFaceType
  'mesh-deck-term': MeshDeckTermType
  'mesh-face': MeshFaceType
  'mesh-fork': MeshForkType
  'mesh-form': MeshFormType
  'mesh-hold': MeshHoldType
  'mesh-hook': MeshHookType
  'mesh-host': MeshHostType
  'mesh-like': MeshLikeType
  'mesh-load': MeshLoadType
  'mesh-load-take': MeshLoadTakeType
  'mesh-load-take-save': MeshLoadTakeSaveType
  'mesh-mark': MeshMarkType
  'mesh-read': MeshReadType
  'mesh-read-draw': MeshReadDrawType
  'mesh-read-loan': MeshReadLoanType
  'mesh-read-move': MeshReadMoveType
  'mesh-seek': MeshSeekType
  'mesh-suit': MeshSuitType
  'mesh-suit-task': MeshSuitTaskType
  'mesh-take': MeshTakeType
  'mesh-task': MeshTaskType
  'mesh-task-flow': MeshTaskFlowType
  'mesh-term': MeshTermType
  'mesh-test': MeshTestType
  'mesh-tree': MeshTreeType
  'mesh-wear': MeshWearType
  'mesh-zone': MeshZoneType
  'mesh-zone-tool': MeshZoneToolType
}

export type MeshType<T extends Mesh> = MeshNodeMappingType[T]
