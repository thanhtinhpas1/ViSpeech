import { ID } from '../models';

export type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

export type WritableKeys<T> = {
    [K in keyof T]-?: IfEquals<{ [P in K]: T[K] }, { -readonly [P in K]: T[K] }, K>;
}[keyof T];

export type ReadonlyKeys<T> = {
    [K in keyof T]-?: IfEquals<{ [P in K]: T[K] }, { -readonly [P in K]: T[K] }, never, K>;
}[keyof T];

export type Writeable<T> = {
    -readonly [K in keyof T]: T[K];
};

export type Input<T> = Pick<T, WritableKeys<T>>;

export type Filter<T> = Pick<Writeable<Partial<T>>, {
    [K in keyof T]-?: T[K] extends ID | Date ? never : K;
}[keyof T]> & {
    // those that should be common to every type of models
    ids?: ID[];
    // for free-text searching
    search?: string;
    // for pagination
    offset?: number;
    limit?: number;
    // for sorting
    sorts?: { by: string; desc?: boolean; }[];
};