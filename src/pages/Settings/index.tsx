import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Settings() {
  const cities = [
    {
      name: "París",
      country: "França"
    },
    {
      name: "Londres",
      country: "Reino Unido"
    },
    {
      name: "New York",
      country: "Estados Unidos"
    },
  ];


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
            />
            <InputGroupAddon>
              <Search size={20} />
            </InputGroupAddon>
          </InputGroup>

          <div className="w-full bg-glass border border-glass-border rounded-md overflow-hidden">
            <Button variant="ghost" className="w-full justify-between px-7 py-5 border-s-5 border-white/65 rounded-none">
              <div className="flex items-center gap-4">
                <MapPin size={20}/>
                <div>
                  <p className="text-sm">Brasília, DF</p>
                  <p className="w-fit text-xs text-muted-foreground p-0">Brasil</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-primary" />
            </Button> 
            {cities.map((city) => (
              <Button key={city.name} variant="ghost" className="w-full justify-between px-7 py-5 border-s-5 border-transparent rounded-none">
                <div className="flex items-center gap-4">
                  <MapPin size={20}/>
                  <div>
                    <p className="text-sm">{city.name}</p>
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
