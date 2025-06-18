// events/ready.mjs
import moment from 'moment-timezone';
import { getClockEmoji } from '../src/emoji.mjs';
import { formatShortTime } from '../src/format.mjs';

export default async function ({ log, presence }, client) {
    log.debug('ready', { tag: client.user.tag });
    log.info(`Logged in as ${client.user.tag}`);
    if (presence) client.user.setPresence(presence);
    async function updatePresence() {
        const timezone = process.env.TIMEZONE || 'UTC';
        const now = new Date();
        const m = moment(now).tz(timezone);
        const hour = parseInt(m.format('H'), 10);
        const minute = parseInt(m.format('m'), 10);
        const emoji = getClockEmoji(hour, minute);
        const timeString = `${emoji} ${formatShortTime(now, timezone)}`;
        try {
            await client.user.setPresence({
                activities: [{ name: timeString, type: 4 }],
                status: 'online',
            });
        } catch (err) {
            log.error('Failed to update presence:', err);
        }
    }
    setInterval(updatePresence, 10000);
}
