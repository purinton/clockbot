import { jest } from '@jest/globals';
import timeHandler from '../../commands/time.mjs';

describe('time command handler', () => {
  let interaction;
  let mockLogger;
  let mockMsg;

  beforeEach(() => {
    interaction = { reply: jest.fn() };
    mockLogger = { error: jest.fn(), warn: jest.fn(), info: jest.fn(), debug: jest.fn() };
    mockMsg = jest.fn();
  });

  test('replies with a string containing the time and offset', async () => {
    await timeHandler(
      { log: mockLogger, msg: mockMsg },
      interaction,
      { timezone: 'UTC' }
    );
    expect(interaction.reply).toHaveBeenCalledWith(expect.any(String));
  });

  test('logs error if reply fails', async () => {
    interaction.reply.mockImplementation(() => { throw new Error('fail'); });
    try {
      await timeHandler(
        { log: mockLogger, msg: mockMsg },
        interaction,
        { timezone: 'UTC' }
      );
    } catch (e) {
      // error is expected to propagate
    }
    expect(mockLogger.error).toHaveBeenCalledWith(
      'Failed to respond to /time:', expect.any(Error)
    );
  });
});
