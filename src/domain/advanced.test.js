import test from 'node:test';
import assert from 'node:assert';
import { createAdvancedDf } from './advanced.js';

test('Advanced syntax domain function creation', async (t) => {
  await t.test('Simple definition', async () => {
    let called = 0;
    const container = { assert: {
      ok: assert.ok,
    },
    };
    const definition = {
      method: (ctx, args) => {
        called++;
        ctx.assert.ok(args);
      },
    };
    const dFn = createAdvancedDf(container, definition);
    await dFn(true);
    assert.strictEqual(called, 1);

    assert.throws(
      () => createAdvancedDf(container, { method: null }),
      new ReferenceError('method is not defined or null'),
    );
  });

  await t.test('Lifecycle hooks', async () => {
    const container = { assert: {
      ok: assert.ok,
      deepStrictEqual: assert.deepStrictEqual,
    },
    };
    const num = 1;
    let called = 0;
    const definition = {
      before: async (ctx, args) => {
        ctx.assert.ok(args);
        called++;
        return args + 1;
      },
      method: async (ctx, args) => {
        called++;
        return { result: args + 1 };
      },
      after: async (ctx, returns) => {
        called++;
        ctx.assert.deepStrictEqual(returns, { result: 3 });
      },
    };

    const dFn = createAdvancedDf(container, definition);
    await dFn(num);
    assert.strictEqual(called, 3);
  });

  await t.test('Lifecycle hooks error', async () => {
    const container = { assert: {
      ok: assert.ok,
      deepStrictEqual: assert.deepStrictEqual,
      fail: assert.fail,
    },
    };
    const testErr = new Error('test');
    const num = 1;
    let called = 0;
    const definition = {
      before: async (_ctx, _args) => {
        called++;
        throw testErr;
      },
      method: async (ctx, args) => {
        ctx.assert.fail(args);
      },
      error: (ctx, error) => {
        called++;
        ctx.assert.deepStrictEqual(error, testErr);
      },
    };

    const dFn = createAdvancedDf(container, definition);
    await dFn(num);
    assert.strictEqual(called, 2);
  });
});
