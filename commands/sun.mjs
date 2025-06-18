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
    const sunriseLocal = moment.unix(data.sunrise).tz(timezone);
    const sunsetLocal = moment.unix(data.sunset).tz(timezone);
    const sunriseStr = sunriseLocal.format('HH:mm');
    const sunsetStr = sunsetLocal.format('HH:mm');
    const sunriseDiscord = `<t:${data.sunrise}:R>`;
    const sunsetDiscord = `<t:${data.sunset}:R>`;
    const daylightSeconds = data.sunset - data.sunrise;
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
