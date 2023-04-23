import test from 'node:test';
import assert from 'node:assert';

import { createSimpleDf } from './simple.js';

test('createSimpleDf', () => {
  const container = { logger: {
    log: assert.ok,
  },
  };
  const fn = (ctx, args) => {
    ctx.logger.log(args);
  };
  const dFn = createSimpleDf(container, fn);
  dFn(true);
});
