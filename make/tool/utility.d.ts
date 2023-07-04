import _ from 'lodash';
export declare const keyBy: {
    <T>(collection: _.List<T> | null | undefined, iteratee?: _.ValueIterateeCustom<T, _.PropertyName> | undefined): _.Dictionary<T>;
    <T_1 extends object>(collection: T_1 | null | undefined, iteratee?: _.ValueIterateeCustom<T_1[keyof T_1], _.PropertyName> | undefined): _.Dictionary<T_1[keyof T_1]>;
};
export declare const omit: {
    <T extends object, K extends _.PropertyName[]>(object: T | null | undefined, ...paths: K): Pick<T, Exclude<keyof T, K[number]>>;
    <T_1 extends object, K_1 extends keyof T_1>(object: T_1 | null | undefined, ...paths: _.Many<K_1>[]): _.Omit<T_1, K_1>;
    <T_2 extends object>(object: T_2 | null | undefined, ...paths: _.Many<_.PropertyName>[]): Partial<T_2>;
};
