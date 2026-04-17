import { Header } from "@/components/Header";
import WeatherDetailCards from "@/components/WeatherDetailCards";
import getWeatherIcon from "@/components/WeatherIcons";
import { useAppSelector } from "@/hooks";
import {
  ArrowLeft,
  CalendarDays,
  Thermometer,
  Wind,
  Droplet,
  Eye,
  Gauge,
  Sun
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart"
import { NavLink } from "react-router-dom";

export function DetailedForecast() {
  const weather = useAppSelector(state => state.weather);

  if (weather.status !== 'succeeded' || !weather.data) {
    return <div>Carregando...</div>
  }

  const weatherData = weather.data;
  const formater = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full'
  });

  const chartData = () => {
    let data: { time: string, temperature: number }[] = [];

    for (let i = 0; i < 24; i++) {
      data.push({
        time: weatherData.hourly[i].time.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        temperature: weatherData.hourly[i].temperature,
      });
    };

    return data;
  }

  const chartConfig = {
    temperature: {
      label: "Temperatura",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig

  const CurrentWeatherIcon = getWeatherIcon(weatherData.currentWeather.weatherCode, weatherData.currentWeather.isDay)

  return (
    <>
      <Header.Root>
        <NavLink to={'/'}>
          <Header.HeaderButton>
            <ArrowLeft size={24} />
          </Header.HeaderButton>
        </NavLink>
      </Header.Root>

      <main className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays size={20} />
          <p>{formater.format(new Date)}</p>
        </div>

        <Card className="p-8 flex-row gap-5 mb-8">
          <div className="glass rounded-full p-4">
            {CurrentWeatherIcon && <CurrentWeatherIcon size={64} />}
          </div>
          <div>
            <p className="text-5xl md:text-6xl mb-2">{weatherData.currentWeather.temperature}°C</p>
            <p className="text-foreground text-xl capitalize">{weatherData.currentWeather.weatherDescription}</p>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <WeatherDetailCards icon={Thermometer} label="Sensação Térmica" data={weatherData.currentWeather.apparentTemp.toString() + '°C'} />
          <WeatherDetailCards icon={Wind} label="Velocidade do Vento" data={weatherData.currentWeather.windSpeed.toString() + ' km/h'} />
          <WeatherDetailCards icon={Droplet} label="Humidade" data={weatherData.currentWeather.humidity.toString() + '%'} />
          <WeatherDetailCards icon={Eye} label="Visibilidade" data={weatherData.hourly[0].visibility.toString() + ' km'} />
          <WeatherDetailCards icon={Gauge} label="Pressão" data={weatherData.currentWeather.pressure.toString() + ' hPa'} />
          <WeatherDetailCards icon={Sun} label="Precipitação" data={weatherData.currentWeather.precipitation.toString() + '%'} />
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
                data={chartData()}
                margin={{ top: 20, left: 0, right: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="var(--accent)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                  vertical={false}
                />

                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
                  interval={2}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
                  width={35}
                />

                <ChartTooltip
                  cursor={{ stroke: "var(--accent)" }}
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;

                    const value = payload[0].value;

                    return (
                      <div className="flex items-center gap-3 rounded-lg glass-border px-3 py-2 shadow-lg">
                        <div className="h-7 w-1 rounded-full bg-white" />
                        <div className="flex flex-col text-white">
                          <span className="text-sm font-medium opacity-80">
                            {label}
                          </span>
                          <span className="text-sm font-semibold">
                            {value}°C
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="var(--accent)"
                  strokeWidth={3}
                  fill="url(#tempGradient)"
                  dot={{ r: 4, strokeWidth: 2, fill: "var(--accent)", stroke: "var(--foreground)" }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </main>
    </>
  );


}
