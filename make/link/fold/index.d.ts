import type { TextResultType } from '../../index.js';
import { Fold } from './type.js';
import type { FoldNodeType, FoldResultType } from './type.js';
export * from './type.js';
export type FoldNestType = {
    list: Array<FoldNestType>;
    parent?: FoldNestType;
};
export type FoldStateHandleType = (input: FoldStateInputType) => void;
export type FoldStateInputType = TextResultType & {
    state: FoldStateType;
};
export type FoldStateType = {
    base: <T extends Fold>(type: T) => {
        id: number;
        type: T;
    };
    count: (type: Fold) => number;
    index: number;
    result: Array<FoldNodeType>;
    stack: Array<Fold>;
};
export declare function generateLinkTextBuildingDirections(input: TextResultType): FoldResultType;
