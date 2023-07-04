import { BlackType, Color, LinkNodeType, Mesh, MeshBaseType } from '../..';
export type Red = Mesh.Value | Mesh.Gather;
export type RedBaseType = MeshBaseType & {
    color: Color.Red;
};
export type RedGatherType = RedBaseType & {
    children: Array<BlackType | LinkNodeType>;
    name?: string;
    type: Mesh.Gather;
};
export type RedMappingType = {
    'mesh-gather': RedGatherType;
    'mesh-value': RedValueType;
};
export type RedNodeType<T extends Red> = RedMappingType[T];
export type RedType = RedGatherType | RedValueType;
export type RedValueType = RedBaseType & {
    name?: string;
    type: Mesh.Value;
    value: BlackType | LinkNodeType;
};
