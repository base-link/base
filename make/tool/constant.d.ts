import { BlueLinkType, BlueTermType, LinkNodeType, LinkTermType } from '~';
import type { BlueConstantType, BluePathType, BlueTermLinkType, BlueValueType, LinkPathType } from '~';
export declare function createBlueConstant(name: BlueTermLinkType, value: BlueValueType | Array<BlueConstantType>): BlueConstantType;
export declare function createBlueLink(value: LinkNodeType): BlueLinkType;
export declare function createBluePath(value: LinkPathType): BluePathType;
export declare function createBlueTerm(value: LinkTermType): BlueTermType;
