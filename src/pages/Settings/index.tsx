import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getCoordinatesBySearch } from "@/services/mapBox/mapBoxAPI";
import { changeLocation } from "@/store/locationSlice";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { useEffect, useState, type EventHandler, type MouseEvent, type MouseEventHandler } from "react";
import { NavLink } from "react-router-dom";

interface citiesType {
  name: string,
  country: string,
  coordinates: { lat: number; long: number }
}

export function Settings() {
  const location = useAppSelector(state => state.location);
  const dispatch = useAppDispatch();
  const [cities, setCities] = useState<citiesType[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchCities = async () => {
      let res: any;
      let citiesData: citiesType[] = [];
      setCities([])

      if (search) {
        res = await getCoordinatesBySearch(search);
        if (res.features.length < 1) return

        res.features.forEach((element: any) => {
          citiesData.push({
            name: element.properties.name,
            country: element.properties.context.country.name,
            coordinates: {
              lat: element.properties.coordinates.latitude,
              long: element.properties.coordinates.logitude
            }
          });
        });
      } else {
        res = await getCoordinatesBySearch(location.city);
        if (res.features.length < 1) return

        citiesData = [
          {
            name: res.features[0].properties.name,
            country: res.features[0].properties.context.country.name,
            coordinates: {
              lat: res.features[0].properties.coordinates.latitude,
              long: res.features[0].properties.coordinates.logitude
            }
          },
          {
            name: 'Paris',
            country: 'França',
            coordinates: {
              lat: 48.860067857878086,
              long: 2.3405085443350777
            }
          },
          {
            name: 'Tóquio',
            country: 'japão',
            coordinates: {
              lat: 35.70618879815802,
              long: 139.49496591571125
            }
          },
          {
            name: 'Nova York',
            country: 'Estados Unidos',
            coordinates: {
              lat: 40.71565960777229,
              long: -74.0038526759007
            }
          },
        ]
      }

      setCities([...citiesData]);
    }

    fetchCities();
  }, [location.city, search]);

  const handleCityClick = (
    city: string,
    country: string,
    coordinates: { lat: number, long: number }
  ) => {
    dispatch(changeLocation({
      city,
      country,
      coordinates
    }))
  }

  return (
    <>
      <Header.Root>
        <NavLink to={'/'}>
          <Header.HeaderButton>
            <ArrowLeft size={24} />
          </Header.HeaderButton>
        </NavLink>
      </Header.Root>

      <main className="flex flex-col items-center w-full ">
        <div className="w-3xl flex flex-col gap-6">
          <h1 className="text-3xl" id="loc">Localização:</h1>

          <InputGroup variant="glassBorder" className="px-6 py-6" >
            <InputGroupInput
              type="text"
              placeholder="Pesquise por uma cidade"
              onChange={(ev) => {
                setSearch(ev.target.value)
              }}
            />
            <InputGroupAddon>
              <Search size={20} />
            </InputGroupAddon>
          </InputGroup>

          <div className="w-full bg-glass border border-glass-border rounded-md overflow-hidden">
            {cities.map((city, key) => (
              <Button
                key={key}
                variant="ghost"
                className={`w-full justify-between px-7 py-5 border-s-5 ${city.name === cities[0].name ? 'border-white/65' : 'border-transparent'} rounded-none`}
                onClick={() => handleCityClick(city.name, city.country, city.coordinates)}
              >
                <div className="flex items-center gap-4">
                  <MapPin size={20} />
                  <div className="flex flex-col">
                    <p className="w-fit text-sm">{city.name}</p>
                    <p className="w-fit text-xs text-muted-foreground p-0">{city.country}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
