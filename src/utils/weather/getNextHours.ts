import type { HourlyWeather } from '@/services/weather/weather.types';

export function getNextHours(
  hourly: HourlyWeather[],
  amount = 4,
) {
  const now = new Date();

  return hourly
    .filter((item) => item.time >= now)
    .sort(
      (a, b) =>
        a.time.getTime() -
        b.time.getTime(),
    )
    .slice(0, amount);
}