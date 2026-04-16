import { Header } from "@/components/Header";
import WeatherDetailCards from "@/components/WeatherDetailCards";
import getWeatherIcon from "@/components/WeatherIcons";
import { useAppSelector } from "@/hooks";
import getOpenMeteoAPI from "@/services/openMeteo/openMeteoAPI";
import WeatherData from "@/utils/weather/weatherData";
import { 
  ArrowLeft, 
  CalendarDays, 
  Thermometer, 
  TrendingUp, 
  Wind, 
  Droplet, 
  Eye,
  Gauge,
  Sun
} from "lucide-react";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export function DetailedForecast() {
  const location = useAppSelector(state => state.location);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (location.status != 'succeeded') return;

    async function fetchWeather() {
      const data = await getOpenMeteoAPI(location.coordinates.lat.toString(), location.coordinates.long.toString());

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

  const chartData = () => {
    let data: { time: string, temperature: number }[] = [];

    for (let i = 0; i < 24; i++) {
      data.push({
        time: weather.hourly[i].time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        temperature: weather.hourly[i].temperature,
      });
    };

    return data;
  }

  const chartConfig = {
    temperature: {
      label: "Temperatura:",
      color: "var(--chart-2 )",
    },
  } satisfies ChartConfig

    const CurrentWeatherIcon = getWeatherIcon(weather?.currentWeather.weatherCode, weather?.currentWeather.isDay)

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
          <p>{formater.format(date)}</p>
        </div>

        <Card className="p-8 flex-row gap-5 mb-8">
            <div className="glass rounded-full p-4">
              {CurrentWeatherIcon && <CurrentWeatherIcon size={64}/>}
            </div>
            <div>
              <p className="text-5xl md:text-6xl mb-2">{weather.currentWeather.temperature}°C</p>
              <p className="text-foreground text-xl capitalize">{weather.currentWeather.weatherDescription}</p>
            </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <WeatherDetailCards icon={Thermometer} label="Sensação Térmica" data={weather.currentWeather.apparentTemp.toString() + '°C'} />
          <WeatherDetailCards icon={Wind} label="Velocidade do Vento" data={weather.currentWeather.windSpeed.toString() + ' km/h'} />
          <WeatherDetailCards icon={Droplet } label="Humidade" data={weather.currentWeather.humidity.toString() + '%'} />
          <WeatherDetailCards icon={Eye} label="Visibilidade" data={weather.hourly[0].visibility.toString() + ' km'} />
          <WeatherDetailCards icon={Gauge} label="Pressão" data={weather.currentWeather.pressure.toString() + ' hPa'} />
          <WeatherDetailCards icon={Sun} label="Precipitação" data={weather.currentWeather.precipitation.toString() + '%'} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas Climáticas</CardTitle>
            <CardDescription>
              Exibindo a variação de temperatura durante 24 horas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData()}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      className="[&_*]:!text-background"
                    />
                  }
                />
                <Area
                  dataKey="temperature"
                  type="natural"
                  fill="var(--color-temperature)"
                  fillOpacity={0.4}
                  stroke="var(--color-temperature)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  );


}
