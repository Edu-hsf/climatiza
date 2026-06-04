import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { CoordinatesContext } from "@/contexts/CoordinatesContext";
import { useLocation, useLocationSearch } from "@/hooks/location/useLocation";
import type { Location } from "@/services/location/location.types";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Settings() {
  const [search, setSearch] = useState<string>('');
  const locationCoordinates = useLocation();
  const locationSearch = useLocationSearch(search);
  const { setCoordinates } = useContext(CoordinatesContext);
  const navigate = useNavigate();
  const [cityFocused, setCityFocused] = useState<string | undefined>();
  const [unitFocused, setUnitFocused] = useState<number | undefined>();

  const isLoading = !locationCoordinates.data || !locationSearch.data;

  useEffect(() => {
    if (locationCoordinates.data?.city) {
      setSearch(`${locationCoordinates.data.city} ${locationCoordinates.data.state}`);
    }
    
    setCityFocused(locationCoordinates.data?.id);
  }, [locationCoordinates.data]);

  useEffect(() => {
    setUnitFocused(1);
  }, []);

  const handleCityClick = (data: Location) => {
    setCoordinates({
      lat: data.latitude,
      long: data.longitude,
    });
    console.log(data);
  };

  const handleUnitClick = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <Header.Root>
        <Header.Button onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </Header.Button>
      </Header.Root>

      <main className="flex flex-col items-center w-full ">
        <div className="w-3xl flex flex-col gap-6">
          <h1 className="text-3xl font-semibold">Localização</h1>

          <InputGroup variant="glassBorder" className="px-6 py-6" >
            <InputGroupInput
              type="text"
              placeholder="Pesquise por uma cidade"
              onChange={(ev) => {
                setSearch(ev.target.value);
              }}
            />
            <InputGroupAddon>
              <Search size={20} />
            </InputGroupAddon>
          </InputGroup>

          <Card className="w-full p-0 overflow-hidden">
            <CardContent>
              {isLoading ? (
                <>
                  {Array.from({ length: 4 }).map((_, id) => (
                    <div
                      key={id}
                      className={`w-full px-7 py-5 rounded-none bg-transparent`}
                    >
                      <div className="flex items-center gap-4">
                        <MapPin size={20} />
                        <div className="flex flex-col gap-2">
                          <Skeleton className="w-22 h-4" />
                          <Skeleton className="w-15 h-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {locationSearch.data?.map((data, id) => (
                    <Button
                      key={id}
                      variant="ghost"
                      className={`w-full justify-between px-7 py-5 rounded-none ${cityFocused === data.id && 'bg-white/30 border-s-5 border-white/80'}`}
                      onClick={() => handleCityClick(data)}
                    >
                      <div className="flex items-center gap-4">
                        <MapPin size={20} />
                        <div className="flex flex-col">
                          <p className="w-fit text-sm">{data.city}</p>
                          <p className={`w-fit text-xs text-muted-foreground p-0`}>{data.country}</p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </>
              )}
            </CardContent>
          </Card>

          <h1 className="text-3xl font-semibold my-2">Unidade de Temperatura</h1>

          <div className="grid grid-1 md:grid-cols-3 gap-x-3 w-full">
            <Button variant="glassBorder" className={`${unitFocused === 1 && 'bg-white/30'} w-full text-xl py-5 hover:bg-white/30`} onClick={() => handleUnitClick(1)}>Celsius (°C)</Button>
            <Button variant="glassBorder" className={`${unitFocused === 2 && 'bg-white/30'} w-full text-xl py-5 hover:bg-white/30`} onClick={() => handleUnitClick(2)}>Fahrenheit (°F)</Button>
            <Button variant="glassBorder" className={`${unitFocused === 3 && 'bg-white/30'} w-full text-xl py-5 hover:bg-white/30`} onClick={() => handleUnitClick(3)}>Kelvin (°K)</Button>
          </div>
        </div>
      </main>
    </>
  );
}
