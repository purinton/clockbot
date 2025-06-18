import moment from 'moment-timezone';
import { getClockEmoji } from '../src/emoji.mjs';
import { getOffsetStr, formatFullTime } from '../src/format.mjs';

// Handles the !time & /time commands
export default async function ({ log, msg }, interaction, {
  timezone = process.env.TIMEZONE || 'UTC'
} = {}) {
  const now = new Date();
  try {
    const emoji = getClockEmoji(
      parseInt(moment(now).tz(timezone).format('H'), 10),
      parseInt(moment(now).tz(timezone).format('m'), 10)
    );
    const formattedTime = formatFullTime(now, timezone);
    const offsetStr = getOffsetStr(now, timezone);
    await interaction.reply(`${emoji} ${formattedTime} (${offsetStr})`);
  } catch (err) {
    log.error('Failed to respond to /time:', err);
  }
};
