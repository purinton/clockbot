import { jest } from '@jest/globals';
import errorEvent from '../../events/error.mjs';

const log = { error: jest.fn() };

test('error event logs error info', async () => {
  await errorEvent({ log }, 'test-error');
  expect(log.error).toHaveBeenCalledWith('error', { error: 'test-error' });
});
