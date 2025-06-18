import { jest } from '@jest/globals';
import invalidatedEvent from '../../events/invalidated.mjs';

const log = { debug: jest.fn() };

test('invalidated event logs invalidated', async () => {
  await invalidatedEvent({ log });
  expect(log.debug).toHaveBeenCalledWith('invalidated');
});
