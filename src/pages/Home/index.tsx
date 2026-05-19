import { Header } from "@/components/Header";
import { MapPinIcon, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/hooks/weather/useWeather";

export function Home() {
  const { data, isLoading, isError } = useWeather();

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
