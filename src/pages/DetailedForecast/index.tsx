import { Header } from "@/components/Header";
import WeatherDetailCards from "@/components/WeatherDetailCards";
import getWeatherIcon from "@/components/WeatherIcons";
import { useAppSelector } from "@/hooks";
import getOpenMeteoAPI from "@/services/openMeteo/openMeteoAPI";
import WeatherData from "@/utils/weather/weatherData";
import { ArrowLeft, CalendarDays, Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

export function DetailedForecast() {
  const location = useAppSelector(state => state.location);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (location.status != 'succeeded') return;

    async function fetchWeather() {
      const data = await getOpenMeteoAPI(location.coordinates.lat, location.coordinates.long);

      setWeather(new WeatherData(data));
    };

    fetchWeather();
  }, [location.status, location.coordinates])

  if (!weather) {
    return <div>Carregando...</div>
  }

  const date = weather.currentWeather.time;
    const formater = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'full'
    });

    return (
      <>
        <Header.Root>
          <Header.HeaderButton>
            <ArrowLeft size={24} />
          </Header.HeaderButton>
        </Header.Root>

        <main className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays size={20} />
            <p className="">{formater.format(date)}</p>
          </div>

          <div className="p-8 glass-border rounded-3xl mb-8">
            <div className="flex gap-5">
              <div className="glass rounded-full p-4">
                {getWeatherIcon(weather?.currentWeather.weatherCode, weather?.currentWeather.isDay, 64)}
              </div>
              <div>
                <p className="text-5xl md:text-6xl mb-2">{ weather.currentWeather.temperature }°C</p>
                <p className="text-white/90 text-xl capitalize">{ weather.currentWeather.weatherDescription }</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">  
            <WeatherDetailCards icon={Thermometer} label="Sensação Térmica" data={weather.currentWeather.apparentTemp.toString()+'°C'}/>
            <WeatherDetailCards icon={Thermometer} label="Velocidade do Vento" data={weather.currentWeather.windSpeed.toString()+' km/h'}/>
            <WeatherDetailCards icon={Thermometer} label="Humidade" data={weather.currentWeather.humidity.toString()+'%'}/>
            <WeatherDetailCards icon={Thermometer} label="Visibilidade" data={weather.hourly[0].visibility.toString()+' km'}/>
            <WeatherDetailCards icon={Thermometer} label="Pressão" data={weather.currentWeather.pressure.toString()+' hPa'}/>
            <WeatherDetailCards icon={Thermometer} label="Precipitação" data={weather.currentWeather.precipitation.toString()+'%'}/>
          </div>
        </main>
      </>
    );


}
