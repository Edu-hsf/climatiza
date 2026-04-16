import { Header } from "@/components/Header";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ArrowLeft, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const frameworks = [
  "React",
  "Angular",
]

export function Settings() {
  return (
    <>
      <Header.Root>
        <NavLink to={'/'}>
          <Header.HeaderButton>
            <ArrowLeft size={24} />
          </Header.HeaderButton>
        </NavLink>
      </Header.Root>

      <main className="flex flex-col items-center w-full">
        <div className="w-3xl flex flex-col gap-6">
          <h1 className="text-3xl">Localização</h1>
          <InputGroup variant="glass" className="px-6 py-6" >
            <InputGroupInput
              type="text"
              placeholder="Pesquise por uma cidade"
            />
            <InputGroupAddon>
              <Search size={20} />
            </InputGroupAddon>
          </InputGroup>

          <Combobox
            items={frameworks}
            open={true}
            onOpenChange={() => { }}
          >
            <ComboboxInput
              variant="glass"
              placeholder="Select a framework"
              className="px-2 py-6"
              showTrigger={false}
              showSearch={true}
            />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </main>
    </>
  );
}
