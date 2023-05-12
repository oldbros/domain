export type Context = object;

export type AnyFn = (...args: any[]) => any;
export type AnyAsyncFn = (...args: any[]) => Promise<any>;

export type HookName = 'before' | 'after' | 'error' | 'metadata';

export type DeclarativeDf = {
  before?: AnyFn;
  method: AnyFn;
  after?: AnyFn;
  error?: AnyFn;
  metadata?: AnyFn;
};
