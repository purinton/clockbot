import { jest } from '@jest/globals';
import sunHandler from '../../commands/sun.mjs';

describe('sun command handler', () => {
  let interaction;
  let mockLogger;
  let mockMsg;
  let mockGetSun;

  beforeEach(() => {
    interaction = { reply: jest.fn() };
    mockLogger = { error: jest.fn(), warn: jest.fn(), info: jest.fn(), debug: jest.fn() };
    mockMsg = jest.fn((key, fallback) => {
      if (key === 'sunrise') return 'Sunrise';
      if (key === 'sunset') return 'Sunset';
      if (key === 'daylight') return 'Daylight';
      if (key === 'error') return 'Sorry, an error occured.';
      return fallback;
    });
    mockGetSun = jest.fn().mockResolvedValue({
      sunrise: 1717401600, // 2024-06-03T04:00:00Z
      sunset: 1717452000   // 2024-06-03T18:00:00Z
    });
  });

  test('replies with sunrise, sunset, and daylight info', async () => {
    await sunHandler(
      { log: mockLogger, msg: mockMsg },
      interaction,
      { timezone: 'UTC', latitude: '1', longitude: '2', getSunFn: mockGetSun }
    );
    expect(mockGetSun).toHaveBeenCalledWith('1', '2');
    expect(interaction.reply).toHaveBeenCalledWith(
      expect.stringContaining('Sunrise: 08:00')
    );
    expect(interaction.reply).toHaveBeenCalledWith(
      expect.stringContaining('Sunset: 22:00')
    );
    expect(interaction.reply).toHaveBeenCalledWith(
      expect.stringContaining('Daylight: 14h 0m')
    );
  });

  test('replies with error if getSun throws', async () => {
    mockGetSun.mockRejectedValueOnce(new Error('fail'));
    await sunHandler(
      { log: mockLogger, msg: mockMsg },
      interaction,
      { timezone: 'UTC', latitude: '1', longitude: '2', getSunFn: mockGetSun }
    );
    expect(interaction.reply).toHaveBeenCalledWith('Sorry, an error occured.');
    expect(mockLogger.error).toHaveBeenCalledWith('Failed to respond to /sun:', expect.any(Error));
  });

  test('does nothing if location is not configured', async () => {
    await sunHandler(
      { log: mockLogger, msg: mockMsg },
      interaction,
      { timezone: 'UTC', latitude: '', longitude: '', getSunFn: mockGetSun }
    );
    expect(mockLogger.error).toHaveBeenCalledWith('Location not configured.');
    expect(interaction.reply).not.toHaveBeenCalled();
  });
});
