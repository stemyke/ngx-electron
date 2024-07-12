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
export type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
export type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;
