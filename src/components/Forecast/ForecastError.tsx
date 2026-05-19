import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { TriangleAlert } from 'lucide-react';

type Props = {
  onRetry?: () => void;
};

export default function ForecastError({
  onRetry,
}: Props) {
  return (
    <Alert
      variant="destructive"
      className="max-w-4xl"
    >
      <TriangleAlert className="h-4 w-4" />

      <AlertTitle>
        Erro ao carregar previsão
      </AlertTitle>

      <AlertDescription
        className="
          flex
          items-center
          justify-between
          gap-4
          mt-2
        "
      >
        <span>
          Não foi possível obter os dados climáticos.
        </span>

        {onRetry && (
          <button
            onClick={onRetry}
            className="
              text-sm
              underline
              hover:opacity-80
            "
          >
            Tentar novamente
          </button>
        )}
      </AlertDescription>
    </Alert>
  );
}