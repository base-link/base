import { ParserNestNodeType } from '~parse'
import { CompilerListType, CompilerMeshType } from '~server'

export type ASTLoadType = {
  like: 'load'
  link: string
  take: Array<ASTLoadTakeType>
}

export type ASTLoadTakeType = {
  like: 'load-take'
  form: string
  name: string
  save?: ASTLoadTakeSaveType
}

export type ASTLoadTakeSaveType = {
  like: 'load-take-save'
  form: string
  name: string
}

export type ASTBearType = {
  like: 'bear'
  link: string
}

export type ASTTreeType = {
  like: 'tree'
  take: CompilerMeshType<Record<string, ASTTakeType>>
}

export type ASTTakeType = {
  like: 'take'
  name: string
  takeLike: ASTLikeType
}

export type ASTLikeType = {
  like: 'like'
  name: string
  bind?: CompilerMeshType<Record<string, ASTLikeType>>
}

export type ASTFormType = {
  like: 'form'
  name: string
  base: CompilerListType<ASTFormType>
  link: CompilerMeshType<Record<string, ASTTakeType>>
  task: CompilerMeshType<Record<string, ASTTaskType>>
  wear: CompilerMeshType<Record<string, ASTWearType>>
  hook: CompilerMeshType<Record<string, ASTHookType>>
}

export type ASTWearType = {
  like: 'wear'
  name: string
  link: CompilerMeshType<Record<string, ASTTakeType>>
  task: CompilerMeshType<Record<string, ASTTaskType>>
}

export type ASTTaskType = {
  like: 'task'
  take: CompilerMeshType<Record<string, ASTTakeType>>
  task: CompilerMeshType<Record<string, ASTTaskType>>
  move: Array<ASTTaskFlowType>
}

export type ASTTaskCallType = {
  like: 'call'
  bind: CompilerMeshType<Record<string, ASTBindType>>
}

export type ASTBindType = {
  like: 'bind'
  name: string
  bond: ASTBondType
}

export type ASTFlexMixinType = {
  flex: boolean
}

// move
export type ASTReadMoveType = ASTFlexMixinType & {
  like: 'read-move'
  link: ParserNestNodeType
}

// borrow
export type ASTReadLoanType = ASTFlexMixinType & {
  like: 'read-loan'
  link: ParserNestNodeType
}

// clone
export type ASTReadDrawType = ASTFlexMixinType & {
  like: 'read-draw'
  link: ParserNestNodeType
}

export type ASTReadType =
  | ASTReadMoveType
  | ASTReadLoanType
  | ASTReadDrawType

export type ASTCordType = {
  like: 'cord'
  cord: string
}

export type ASTMarkType = {
  like: 'mark'
  mark: number
}

export type ASTBondType = ASTCordType | ASTMarkType

export type ASTTaskFlowType = ASTTaskCallType | ASTHoldType

export type ASTSuitType = {
  like: 'suit'
  link: CompilerMeshType<Record<string, ASTTakeType>>
  task: CompilerMeshType<Record<string, ASTSuitTaskType>>
}

export type ASTSuitTaskType = {
  like: 'suit-task'
}

export type ASTHostType = {
  like: 'host'
}

export type ASTFaceType = {
  like: 'face'
}

export type ASTTestType = {
  like: 'test'
}

export type ASTHookType = {
  like: 'hook'
}

export type ASTZoneType = {
  like: 'zone'
  name: string
  tool: Array<ASTZoneToolType>
}

export type ASTZoneToolType = {
  like: 'zone-tool'
  zone: ASTZoneType
}

export type ASTHoldType = {
  like: 'hold'
}

// request handler
export type ASTSeekType = {
  like: 'seek'
  link: ASTCordType | ASTTermType
  task: ASTTaskType
}

export type ASTTermType = {
  like: 'term'
  name: string
}
