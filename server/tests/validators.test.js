const test = require('node:test');
const assert = require('node:assert/strict');
const { validateSignupInput, validateLoginInput } = require('../utils/validators');

test('rejects invalid signup input', () => {
  const result = validateSignupInput({
    name: '  ',
    email: 'not-an-email',
    password: '123',
  });

  assert.equal(result.isValid, false);
  assert.match(result.message, /name|email|password/i);
});

test('accepts valid signup input', () => {
  const result = validateSignupInput({
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'securepass123',
  });

  assert.equal(result.isValid, true);
  assert.equal(result.message, 'ok');
});

test('rejects invalid login input', () => {
  const result = validateLoginInput({ email: '', password: '' });

  assert.equal(result.isValid, false);
  assert.match(result.message, /email|password/i);
});
