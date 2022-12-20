import { ParserNestNodeType } from '~parse'

export type ASTBearType = {
  like: 'bear'
  link: string
}

export type ASTBindType = {
  bond: ASTBondType
  like: 'bind'
  name: string
}

export type ASTBondType = ASTCordType | ASTMarkType

export type ASTCordType = {
  cord: string
  like: 'cord'
}

export type ASTFaceType = {
  like: 'face'
}

export type ASTFlexMixinType = {
  flex: boolean
}

export type ASTFormType = {
  base: ASTFormType
  hook: Record<string, ASTHookType>
  like: 'form'
  link: Record<string, ASTTakeType>
  name: string
  task: Record<string, ASTTaskType>
  wear: Record<string, ASTWearType>
}

export type ASTHoldType = {
  like: 'hold'
}

export type ASTHookType = {
  like: 'hook'
}

export type ASTHostType = {
  like: 'host'
}

export type ASTLikeType = {
  bind?: Record<string, ASTLikeType>
  like: 'like'
  name: string
}

export type ASTLoadTakeSaveType = {
  form: string
  like: 'load-take-save'
  name: string
}

export type ASTLoadTakeType = {
  form: string
  like: 'load-take'
  name: string
  save?: ASTLoadTakeSaveType
}

export type ASTLoadType = {
  like: 'load'
  link: string
  take: Array<ASTLoadTakeType>
}

export type ASTMarkType = {
  like: 'mark'
  mark: number
}

// clone
export type ASTReadDrawType = ASTFlexMixinType & {
  like: 'read-draw'
  link: ParserNestNodeType
}

// borrow
export type ASTReadLoanType = ASTFlexMixinType & {
  like: 'read-loan'
  link: ParserNestNodeType
}

// move
export type ASTReadMoveType = ASTFlexMixinType & {
  like: 'read-move'
  link: ParserNestNodeType
}

export type ASTReadType =
  | ASTReadMoveType
  | ASTReadLoanType
  | ASTReadDrawType

// request handler
export type ASTSeekType = {
  like: 'seek'
  link: ASTCordType | ASTTermType
  task: ASTTaskType
}

export type ASTSuitTaskType = {
  like: 'suit-task'
}

export type ASTSuitType = {
  like: 'suit'
  link: Record<string, ASTTakeType>
  task: Record<string, ASTSuitTaskType>
}

export type ASTTakeType = {
  like: 'take'
  name: string
  takeLike: ASTLikeType
}

export type ASTTaskCallType = {
  bind: Record<string, ASTBindType>
  like: 'call'
}

export type ASTTaskFlowType = ASTTaskCallType | ASTHoldType

export type ASTTaskType = {
  like: 'task'
  move: Array<ASTTaskFlowType>
  take: Record<string, ASTTakeType>
  task: Record<string, ASTTaskType>
}

export type ASTTermType = {
  like: 'term'
  name: string
}

export type ASTTestType = {
  like: 'test'
}

export type ASTTreeType = {
  like: 'tree'
  take: Record<string, ASTTakeType>
}

export type ASTWearType = {
  like: 'wear'
  link: Record<string, ASTTakeType>
  name: string
  task: Record<string, ASTTaskType>
}

export type ASTZoneToolType = {
  like: 'zone-tool'
  zone: ASTZoneType
}

export type ASTZoneType = {
  like: 'zone'
  name: string
  tool: Array<ASTZoneToolType>
}
