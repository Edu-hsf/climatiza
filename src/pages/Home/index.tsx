import { Header } from "@/components/Header";
import { MapPinIcon, Settings } from "lucide-react"
import { useAppSelector } from "@/hooks";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ForecastItem from "@/components/Forecast/ForecastItem";
import { useEffect, useState } from "react";
import getOpenMeteoAPI from "@/services/openMeteo/openMeteoAPI";
import WeatherData from "@/utils/weather/weatherData";
import getWeatherIcon from "@/components/WeatherIcons";

export function Home() {
  const location = useAppSelector(state => state.location);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  
  useEffect(() => {
    if (location.status != 'succeeded') return;

    async function fetchWeather() {
      const data = await getOpenMeteoAPI(location.coordinates.lat.toString(), location.coordinates.long.toString());

      setWeather(new WeatherData(data));
    };

    fetchWeather();
  }, [location.status, location.coordinates.lat, location.coordinates.long])

  if (!weather) {
    return <div>Carregando...</div>
  }

  const currentTime = new Date(weather.currentWeather.time.setMinutes(0, 0, 0)) 

  const currentIndex = weather.hourly.findIndex(
    item => item.time.getTime() === currentTime.getTime()
  );

  const hourly = currentIndex !== -1 
  ? weather.hourly.slice(currentIndex + 1, currentIndex + 5) 
  : [];

  const CurrentWeatherIcon = getWeatherIcon(weather.currentWeather.weatherCode, weather.currentWeather.isDay)

  return (
    <>
      <Header.Root>
        <Header.Info>
          <MapPinIcon size={20} />
          {location.city}, {location.country}
        </Header.Info>
        <Header.HeaderButton>
          <Settings size={24} />
        </Header.HeaderButton>
      </Header.Root>
      <main className="px-6 py-20 h-full flex flex-col items-center gap-12">
        <div className="flex flex-col items-center">
          <div className="glass w-fit h-fit p-6 rounded-full mb-6">
            {CurrentWeatherIcon && <CurrentWeatherIcon size={80} />}
          </div>

          <h1 className="text-7xl md:text-8xl mb-4">
            {`${weather.currentWeather.temperature}°C`}
          </h1>

          <p className="text-2xl">
            {weather.currentWeather.weatherDescription}
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
