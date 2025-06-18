import moment from 'moment-timezone';
import { getSun } from '@purinton/openweathermap';

// Command handler for /sun and !sun 
export default async function ({ log, msg }, interaction, {
  timezone = process.env.TIMEZONE || 'UTC',
  latitude = process.env.LOCATION_LAT,
  longitude = process.env.LOCATION_LON,
  getSunFn = getSun,
} = {}) {
  try {
    if (!latitude || !longitude) {
      log.error('Location not configured.');
      return;
    }
    const data = await getSunFn(latitude, longitude);
    if (!data) {
      log.error('No sun data returned.');
      const errorMsg = msg('error', 'Sorry, an error occured.');
      await interaction.reply(errorMsg);
      return;
    }
    // data: {sunriseUtc, sunsetUtc, sunriseLocal, sunsetLocal, offset}
    // Format using the passed timezone
    const sunriseStr = moment.unix(data.sunriseUtc).tz(timezone).format('HH:mm');
    const sunsetStr = moment.unix(data.sunsetUtc).tz(timezone).format('HH:mm');
    const sunriseDiscord = `<t:${data.sunriseUtc}:R>`;
    const sunsetDiscord = `<t:${data.sunsetUtc}:R>`;
    const daylightSeconds = data.sunsetLocal - data.sunriseLocal;
    const daylightHours = Math.floor(daylightSeconds / 3600);
    const daylightMinutes = Math.floor((daylightSeconds % 3600) / 60);
    const daylightStr = `${daylightHours}h ${daylightMinutes}m`;
    const sunriseLbl = msg('sunrise', 'Sunrise');
    const sunsetLbl = msg('sunset', 'Sunset');
    const daylightLbl = msg('daylight', 'Daylight');
    await interaction.reply(
      `${sunriseLbl}: ${sunriseStr} (${sunriseDiscord})\n${sunsetLbl}: ${sunsetStr} (${sunsetDiscord})\n${daylightLbl}: ${daylightStr}`
    );
  } catch (err) {
    log.error('Failed to respond to /sun:', err);
    const errorMsg = msg('error', 'Sorry, an error occured.');
    await interaction.reply(errorMsg);
  }
}
