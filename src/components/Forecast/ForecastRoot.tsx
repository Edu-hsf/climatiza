interface ForecastRootProps {
  children: React.ReactNode
}

export default function ForecastRoot({ children }: ForecastRootProps) {
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
        { children }
      </div>
    </div>
  );
}