import { Header } from "@/components/Header";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/hooks/weather/useWeather";
import { useLocation } from "@/hooks/location/useLocation";
import { Skeleton } from "@/components/ui/skeleton";
import { Forecast } from "@/components/Forecast";
import { getNextHours } from "@/utils/weather/getNextHours";
import { ErrorState } from "@/components/ErrorState";

export function Home() {
  const location = useLocation();
  const weather = useWeather();
  const navigate = useNavigate();
  const WeatherIcon = weather.data?.current.weatherIcon;
  const isLoading = weather.isLoading || location.isLoading;
  const isError = weather.isError || location.isError;
  const nextHours = weather.data && getNextHours(weather.data?.hourly);

  if (isError) return (
    <ErrorState title="Algo deu errado" description="Não foi possível carregar os dados no momento"/>
  );

  return (
    <>
      {isLoading ? <Header.Skeleton /> : (
        <Header.Root>
          <Header.Info city={location.data?.city} country={location.data?.country} />
          <Header.Button onClick={() => navigate('/settings')}>
            <Settings size={24} />
          </Header.Button>
        </Header.Root>
      )}
      <main className="px-6 py-20 h-full flex flex-col items-center gap-12">
        <div className="flex flex-col items-center">
          {isLoading ? (
            <>
              <Skeleton className="w-30 h-30 rounded-full mb-8" />
              <Skeleton className="h-20 w-52 mb-6" />
              <Skeleton className="h-8 w-40" />
            </>
          ) : (
            <>
              <div className="bg-white/10 w-fit h-fit p-6 rounded-full mb-6">
                {WeatherIcon && <WeatherIcon size={80} />}
              </div>

              <h1 className="text-7xl md:text-8xl mb-4">
                {`${weather.data?.current.temperature}°C`}
              </h1>

              <p className="text-2xl">
                {weather.data?.current.weatherDescription}
              </p>
            </>
          )}
        </div>

        {isLoading ? <Forecast.Skeleton /> : (
          <Forecast.Root>
            {nextHours?.map((item, i) => (
              <Forecast.Card
                key={i}
                time={item.time}
                icon={item.weatherIcon}
                temperature={item.temperature}
              />
            ))}
          </Forecast.Root>
        )}

        {!isLoading && (
          <Button size="lg" onClick={() => navigate('/detailed-forecast')}>
            Ver Previsão Detalhada
          </Button>
        )}
      </main>
    </>
  );
}
