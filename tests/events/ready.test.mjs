import { jest } from '@jest/globals';
import ready from '../../events/ready.mjs';

jest.mock('moment-timezone', () => {
  const m = jest.fn(() => ({
    tz: () => ({
      format: (fmt) => (fmt === 'H' ? '12' : '30'),
    }),
  }));
  m.tz = () => m();
  return m;
});

jest.mock('../../src/emoji.mjs', () => ({ getClockEmoji: () => '🕛' }));
jest.mock('../../src/format.mjs', () => ({ formatShortTime: () => '12:30' }));

describe('ready event', () => {
  it('logs ready and info, sets presence, and sets interval', async () => {
    const log = { debug: jest.fn(), info: jest.fn(), error: jest.fn() };
    const setPresence = jest.fn();
    const client = { user: { tag: 'test#1234', setPresence } };
    global.setInterval = jest.fn();
    await ready({ log, presence: { status: 'online' } }, client);
    expect(log.debug).toHaveBeenCalledWith('ready', { tag: 'test#1234' });
    expect(log.info).toHaveBeenCalledWith('Logged in as test#1234');
    expect(setPresence).toHaveBeenCalled();
    expect(global.setInterval).toHaveBeenCalled();
  });
});
