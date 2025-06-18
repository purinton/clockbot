import { jest } from '@jest/globals';
import warnEvent from '../../events/warn.mjs';

const log = { warn: jest.fn() };

test('warn event logs warn info', async () => {
  await warnEvent({ log }, 'test-warn');
  expect(log.warn).toHaveBeenCalledWith('warn', { warn: 'test-warn' });
});
