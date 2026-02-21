import { Header } from "@/components/Header";
import settingsBlackIcon from "@/assets/images/icons/settings-black-icon.svg";
import { MapPinIcon } from "lucide-react"

import { useAppSelector } from "@/hooks";
import { GearIcon } from "@/components/icons/akar-icons-gear";

export function Home() {
  const location = useAppSelector(state => state.location)
  
  return (
    <div>
      <Header.Root>
        <Header.Info>
          <MapPinIcon size={20}/>
          {location.city}, {location.country}
        </Header.Info>
        <Header.HeaderButton>
          <GearIcon size={24}/>
        </Header.HeaderButton>
      </Header.Root>
    </div>
  );
}
