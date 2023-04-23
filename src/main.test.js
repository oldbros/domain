import test from 'node:test';
import assert from 'node:assert';

import * as domain from './main.js';

test('Check exports', () => {
  assert.ok('createSimpleDf' in domain);
});
