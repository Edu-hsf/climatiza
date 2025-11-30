import { Header } from "../../components/Header";
import settingsBlackIcon from "../../assets/images/icons/settings-black-icon.svg";

export function Home() {
  return (
    <div className="w-full h-screen px-4 py-8">
      <Header.Root>
        <Header.IconButton icon={settingsBlackIcon}/>
        <Header.Title text="Climatiza"/>
      </Header.Root>
    </div>
  );
}
