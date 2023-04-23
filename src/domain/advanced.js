/**
 * @typedef {import('../types').Context} Context
 * @typedef {import('../types').AnyFn} AnyFn
 * @typedef {import('../types').AnyAsyncFn} AnyAsyncFn
 * @typedef {import('../types').DeclarativeDf} DeclarativeDf
 */
import shiftjs from '@oldbros/shiftjs';

/**
 * Throws error if invalid definition
 * @param {DeclarativeDf} definition
 * @returns {void}
 */
const validateDef = (definition) => {
  if ('method' in definition && !!definition.method) return;
  throw new ReferenceError('method is not defined or null');
};

/**
 * returns a piped async function for declarative definition format
 * @param {Context} ctx
 * @param {DeclarativeDf} definition
 * @returns {AnyAsyncFn}
 */
const pipeWithHooks = (ctx, definition) => {
  const fns = [];
  if ('before' in definition) fns.push(shiftjs.partial(definition.before, ctx));
  fns.push(shiftjs.partial(definition.method, ctx));
  if ('after' in definition) fns.push(shiftjs.partial(definition.after, ctx));
  const piped = shiftjs.async.pipe(...fns);
  if ('error' in definition) {
    const errFn = shiftjs.partial(definition.error, ctx);
    return (args) => piped(args).catch(errFn);
  }
  return piped;
};

/**
 * Creates a simple domain function by injecting Context to a given function
 * @param {Context} ctx can be DI container or any object you want to inject
 * @param {DeclarativeDf} definition any contract function
 * @returns {AnyAsyncFn}
 */
export const createAdvancedDf = (ctx, definition) => {
  validateDef(definition);
  return pipeWithHooks(ctx, definition);
};
