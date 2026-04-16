import { Header } from "@/components/Header";
import { MapPinIcon, Settings } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ForecastItem from "@/components/Forecast/ForecastItem";
import { useEffect } from "react";
import getWeatherIcon from "@/components/WeatherIcons";
import { fetchWeatherAsync } from "@/store/weatherSlice";

export function Home() {
  const dispatch = useAppDispatch();
  const location = useAppSelector(state => state.location);
  const weather = useAppSelector(state => state.weather);

  useEffect(() => {
    if (location.status !== 'succeeded') return;
    if (weather.data) return; // Se já tem dados, não recarrega

    dispatch(fetchWeatherAsync({
      lat: location.coordinates.lat.toString(),
      long: location.coordinates.long.toString()
    }));
  }, [location.status, dispatch, weather.data])

  if (weather.status !== 'succeeded' || !weather.data) {
    return <div>Carregando...</div>
  }

  const currentTime = new Date(weather.data.currentWeather.time);
  currentTime.setMinutes(0, 0, 0)

  const currentIndex = weather.data.hourly.findIndex(
    item => item.time.getTime() === currentTime.getTime()
  );

  const hourly = currentIndex !== -1
    ? weather.data.hourly.slice(currentIndex + 1, currentIndex + 5)
    : [];

  const CurrentWeatherIcon = getWeatherIcon(weather.data.currentWeather.weatherCode, weather.data.currentWeather.isDay)

  return (
    <>
      <Header.Root>
        <Header.Info>
          <MapPinIcon size={20} />
          {location.city}, {location.country}
        </Header.Info>
        <NavLink to='settings'>
          <Header.HeaderButton>
            <Settings size={24} />
          </Header.HeaderButton>
        </NavLink>
      </Header.Root>
      <main className="px-6 py-20 h-full flex flex-col items-center gap-12">
        <div className="flex flex-col items-center">
          <div className="glass w-fit h-fit p-6 rounded-full mb-6">
            {CurrentWeatherIcon && <CurrentWeatherIcon size={80} />}
          </div>

          <h1 className="text-7xl md:text-8xl mb-4">
            {`${weather.data.currentWeather.temperature}°C`}
          </h1>

          <p className="text-2xl">
            {weather.data.currentWeather.weatherDescription}
          </p>
        </div>
        <div className="w-full max-w-4xl">
          <h2 className="text-xl px-2 mb-4">Previsão horária</h2>
          <div
            data-testid="forecast-grid"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {hourly.map((item) => (
              <ForecastItem
                time={item.time.toLocaleTimeString().slice(0, 5)}
                icon={getWeatherIcon(item.weatherCode, item.isDay)}
                temperature={item.temperature.toString() + '°C'}
              />
            ))}
          </div>
        </div>
        <NavLink to={'detailedforecast'}>
          <Button size="lg">
            Ver Previsão Detalhada
          </Button>
        </NavLink>
      </main>
    </>
  );
}
