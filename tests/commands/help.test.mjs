import { jest } from '@jest/globals';
import helpHandler from '../../commands/help.mjs';

describe('help command handler', () => {
  let interaction;
  let mockLogger;
  let mockMsg;

  beforeEach(() => {
    interaction = {
      reply: jest.fn()
    };
    mockLogger = { error: jest.fn(), warn: jest.fn(), info: jest.fn(), debug: jest.fn() };
    mockMsg = jest.fn().mockReturnValue('Help text!');
  });

  test('replies with help content', async () => {
    await helpHandler({ log: mockLogger, msg: mockMsg }, interaction);
    expect(mockMsg).toHaveBeenCalledWith('help', 'This is the default help text.');
    expect(interaction.reply).toHaveBeenCalledWith({
      content: 'Help text!',
      flags: 1 << 6
    });
  });

  test('logs debug for request and response', async () => {
    await helpHandler({ log: mockLogger, msg: mockMsg }, interaction);
    expect(mockLogger.debug).toHaveBeenCalledWith('help Request', { interaction });
    expect(mockLogger.debug).toHaveBeenCalledWith('help Response', expect.any(Object));
  });
});
