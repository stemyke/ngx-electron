export interface IpcFunctions {
    [key: string]: (...args: any[]) => any;
}
export type OnlyFunctions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
};
export type FunctionKeys<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];
export type FunctionProperty<T, K extends keyof T> = OnlyFunctions<T>[K];
export type PromisedType<T> = T extends Promise<any> ? T : Promise<T>;
