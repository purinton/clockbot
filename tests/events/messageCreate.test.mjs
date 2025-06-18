import { jest } from '@jest/globals';
import messageCreate from '../../events/messageCreate.mjs';

describe('messageCreate', () => {
  const log = { debug: jest.fn() };
  const msg = jest.fn();

  it('logs messageCreate and ignores bot messages', async () => {
    const message = { id: '1', author: { bot: true } };
    await messageCreate({ log, msg }, message);
    expect(log.debug).toHaveBeenCalledWith('messageCreate', { id: '1' });
  });

  it('calls time handler for !time', async () => {
    const message = { id: '2', author: { bot: false }, content: '!time', guild: { preferredLocale: 'en-US' } };
    jest.unstable_mockModule('../../commands/time.mjs', () => ({ default: jest.fn() }));
    const { default: timeHandler } = await import('../../commands/time.mjs');
    await messageCreate({ log, msg }, message);
    expect(timeHandler).toHaveBeenCalled();
  });

  it('calls sun handler for !sun', async () => {
    const message = { id: '3', author: { bot: false }, content: '!sun', guild: { preferredLocale: 'en-US' } };
    jest.unstable_mockModule('../../commands/sun.mjs', () => ({ default: jest.fn() }));
    const { default: sunHandler } = await import('../../commands/sun.mjs');
    await messageCreate({ log, msg }, message);
    expect(sunHandler).toHaveBeenCalled();
  });
});
