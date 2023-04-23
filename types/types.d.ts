export type Context = object;
export type AnyFn = (...args: any[]) => any;
export type AnyAsyncFn = (...args: any[]) => Promise<any>;
export type DeclarativeDf = {
    before?: AnyFn;
    method: AnyFn;
    after?: AnyFn;
    error?: AnyFn;
};
