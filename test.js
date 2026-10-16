const { test, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('./index');

let server;
let base;

before(() => {
  server = app.listen(0);
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

test('GET /live returns status live', async () => {
  const res = await fetch(`${base}/live`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'live' });
});

test('GET /hello returns a greeting', async () => {
  const res = await fetch(`${base}/hello`);
  const body = await res.json();
  assert.match(body.message, /Hello/);
});

test('GET /os reports the environment', async () => {
  const res = await fetch(`${base}/os`);
  const body = await res.json();
  assert.ok(body.host);
  assert.strictEqual(body.env, 'local');
});
