import type { LucideIcon } from "lucide-react";
import ForecastCard from "./ForecastCard";

type ForecastProps = {
  items: {
    time: string;
    icon: LucideIcon;
    temperature: string;
  }[];
};

export default function ForecastRoot({ items }: ForecastProps) {
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-xl px-2 mb-4">
        Previsão horária
      </h2>

      <div
        data-testid="forecast-grid"
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
        "
      >
        {items.map((item) => (
          <ForecastCard
            key={item.time}
            time={item.time}
            icon={item.icon}
            temperature={item.temperature}
          />
        ))}
      </div>
    </div>
  );
}