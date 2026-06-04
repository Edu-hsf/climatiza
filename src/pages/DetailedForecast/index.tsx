import { Header } from "@/components/Header";
import {
  ArrowLeft,
  CalendarDays,
  Droplets,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLocation } from "@/hooks/location/useLocation";
import { Skeleton } from "@/components/ui/skeleton";
import { toDayName, toFullDateFormat, toSimplifiedDateFormat, toTimeFormat } from "@/utils/formatter";
import { useWeather } from "@/hooks/weather/useWeather";
import WeatherCard from "@/components/WeatherCard";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

export function DetailedForecast() {
  const location = useLocation();
  const weather = useWeather();
  const navigate = useNavigate();
  const isLoading = location.isLoading || weather.isLoading;
  const CurrentWeatherIcon = weather.data?.current.weatherIcon;

  const chartData = useMemo(() => {
    return (
      weather.data?.hourly
        .slice(0, 24)
        .map((item) => ({
          time: toTimeFormat(item.time),
          temperature: item.temperature,
        })) ?? []
    );
  }, [weather.data]);

  const chartConfig = {
    temperature: {
      label: 'Temperatura',
      color: 'var(--accent)',
    },
  };

  return (
    <>
      <Header.Root>
        <Header.Button onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </Header.Button>
      </Header.Root>

      <main className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="flex items-center gap-3">
          {isLoading ? (
            <>
              <Skeleton className="w-5 h-5 rounded-full " />
              <Skeleton className="w-50 h-5" />
            </>
          ) : (
            <>
              <CalendarDays size={20} />
              <p>{toFullDateFormat(new Date())}</p>
            </>
          )}
        </div>

        <Card>
          <CardContent className="flex gap-6 items-center">
            {isLoading ? (
              <>
                <Skeleton className="w-22.5 h-22.5 rounded-full shrink-0" />
                <div className="space-y-2 min-w-0 flex-1">
                  <Skeleton className="w-30 max-w-full h-14 rounded-full" />
                  <Skeleton className="w-40 max-w-full h-6 rounded-full" />
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-white/10 rounded-full">
                  {CurrentWeatherIcon && <CurrentWeatherIcon size={75} />}
                </div>
                <div className="space-y-2 flex flex-col">
                  <span className="text-5xl md:text-6xl">{weather.data?.current.temperature}{weather.data?.current.units.temperature}</span>
                  <span className="text-foreground text-xl capitalize">{weather.data?.current.weatherDescription}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <WeatherCard type="temperature" isLoading={isLoading} value={weather.data?.current.apparentTemperature} unit={weather.data?.current.units.apparentTemperature} />
          <WeatherCard type="wind_speed" isLoading={isLoading} value={weather.data?.current.windSpeed} unit={weather.data?.current.units.windSpeed} />
          <WeatherCard type="humidity" isLoading={isLoading} value={weather.data?.current.humidity} unit={weather.data?.current.units.humidity} />
          <WeatherCard type="visibility" isLoading={isLoading} value={weather.data?.current.visibility} unit={weather.data?.current.units.visibility} />
          <WeatherCard type="pressure" isLoading={isLoading} value={weather.data?.current.pressure} unit={weather.data?.current.units.pressure} />
          <WeatherCard type="precipitation" isLoading={isLoading} value={weather.data?.current.precipitation} unit={weather.data?.current.units.precipitation} />
        </div>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Variação Climática</CardTitle>
            <CardDescription>
              Exibindo a variação de temperatura durante 24 horas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80 w-full">
              <ChartContainer
                config={chartConfig}
                className="h-full w-full"
              >
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, left: 0, right: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="var(--accent)"
                        stopOpacity={0.45}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--accent)"
                        stopOpacity={0}
                      />
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
                    domain={['dataMin - 2', 'dataMax + 2']}
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
                        <div className="flex items-center gap-3 rounded-xl bg-background/70 backdrop-blur-xl border border-white/10 px-4 py-3 shadow-black/20">
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
                    type="natural"
                    dataKey="temperature"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    fill="url(#tempGradient)"
                    dot={false}
                    activeDot={{
                      r: 6,
                      strokeWidth: 2,
                    }}
                    animationDuration={1200}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h2 className="font-bold">Previsão de 7 dias</h2>
          {isLoading ? (
            Array.from({ length: 7 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="w-full sm:w-40 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Skeleton className="w-18 h-5" />
                      <Skeleton className="w-15 h-5" />
                    </div>
                    <Skeleton className="w-6.25 h-6.25 rounded-full" />
                  </div>

                  <div className="flex justify-between gap-7 self-stretch items-center w-full sm:w-auto">
                    <div className="flex gap-5">
                      <div className="flex flex-col items-center gap-1">
                        <Skeleton className="w-10 h-5" />
                        <Skeleton className="w-8 h-4" />
                      </div>
                      <div className="bg-white/20 w-px self-stretch" />
                      <div className="flex flex-col items-center gap-1">
                        <Skeleton className="w-10 h-5" />
                        <Skeleton className="w-8 h-4" />
                      </div>
                    </div>
                    <Skeleton className="w-24 h-9 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            weather.data?.daily.map((day, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="w-full sm:w-40 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{toDayName(day.time)}</span>
                      <span className="font-extralight">{toSimplifiedDateFormat(day.time)}</span>
                    </div>
                    <day.weatherIcon size={25} />
                  </div>

                  <div className="flex justify-between gap-7 self-stretch items-center w-full sm:w-auto">
                    <div className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <span className="font-bold">{day.temperatureMax}{day.units.temperatureMax}</span>
                        <span className="font-extralight">Max</span>
                      </div>
                      <div className="bg-white/20 w-px self-stretch" />
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-white/65">{day.temperatureMin}{day.units.temperatureMin}</span>
                        <span className="font-extralight text-white/65">Min</span>
                      </div>
                    </div>

                    <Button variant="glass" className="space-x-2">
                      <Droplets size={25} />
                      <span>{day.humidity} {day.units.humidity}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </>
  );
}
