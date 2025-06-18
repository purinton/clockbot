import { jest } from '@jest/globals';
import debugEvent from '../../events/debug.mjs';

const log = { debug: jest.fn() };

test('debug event logs debug info', async () => {
  await debugEvent({ log }, 'test-debug');
  expect(log.debug).toHaveBeenCalledWith('debug', { debug: 'test-debug' });
});
