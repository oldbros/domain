/**
 * @typedef {import('../types').Context} Context
 * @typedef {import('../types').AnyFn} AnyFn
 * @typedef {import('../types').AnyAsyncFn} AnyAsyncFn
 * @typedef {import('../types').DeclarativeDf} DeclarativeDf
 * @typedef {import('../types').HookName} HookName
 */
import shiftjs from '@oldbros/shiftjs';
import { createSimpleDf } from './simple.js';
import { createAdvancedDf } from './advanced.js';

export class DomainFunction {
  static hookNames = ['before', 'after', 'error', 'metadata'];

  /**
   *
   * @param {AnyFn} fn
   * @returns {DomainFunction}
   */
  static fromFunction = (fn) => new DomainFunction({ method: fn });

  /**
   *
   * @param {DeclarativeDf} declarative
   * @returns {DomainFunction}
   */
  static fromLongform = (declarative) => new DomainFunction(declarative);

  /**
   * @param {HookName} name
   * @param {AnyFn} hook
   */
  static #checkHook = (name, hook) => {
    if (!DomainFunction.hookNames.includes(name)) {
      throw new TypeError(`"${name}" is not a valid hook name`);
    }
    if (typeof hook !== 'function') {
      throw new TypeError('Hook must be a function');
    }
  };

  /**
   * @param {DeclarativeDf} val
   */
  constructor(val) {
    this.method = val.method;
    this.before = val?.before;
    this.after = val?.after;
    this.error = val?.error;
    this.metadata = val?.metadata;
  }

  /**
   * @param {HookName} name
   * @param {AnyFn} hook
   */
  addHook = (name, hook) => {
    DomainFunction.#checkHook(name, hook);
    this[name] = hook;
    return this;
  };

  
}
