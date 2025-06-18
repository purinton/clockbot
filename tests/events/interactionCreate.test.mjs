import { jest } from '@jest/globals';
import interactionCreate from '../../events/interactionCreate.mjs';

test('calls the correct command handler if present', async () => {
  const handler = jest.fn();
  const commandHandlers = { foo: handler };
  const interaction = { commandName: 'foo', locale: 'en-US' };
  const msg = jest.fn();
  const log = {};
  await interactionCreate({ client: {}, log, msg, commandHandlers }, interaction);
  expect(handler).toHaveBeenCalled();
});

test('does nothing if no handler', async () => {
  const commandHandlers = {};
  const interaction = { commandName: 'bar', locale: 'en-US' };
  const msg = jest.fn();
  const log = {};
  await interactionCreate({ client: {}, log, msg, commandHandlers }, interaction);
  // No error should be thrown
});
