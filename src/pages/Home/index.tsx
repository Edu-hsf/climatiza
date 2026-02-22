import { Header } from "@/components/Header";
import { MapPinIcon, Settings } from "lucide-react"
import { useAppSelector } from "@/hooks";
import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast"

export function Home() {
  const location = useAppSelector(state => state.location)
  
  return (
    <div className="h-full">
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
        <CurrentWeather/>
        <Forecast/>
      </main>
    </div>
  );
}
