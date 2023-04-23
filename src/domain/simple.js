/**
 * @typedef {import('../types').Context} Context
 * @typedef {import('../types').AnyFn} AnyFn
 */
import shiftjs from '@oldbros/shiftjs';

/**
 * Creates a simple domain function by injecting Context to a given function
 * @param {Context} ctx can be DI container or any object you want to inject
 * @param {AnyFn} fn any contract function
 * @returns {AnyFn}
 */
export const createSimpleDf = (ctx, fn) => shiftjs.partial(fn, ctx);
