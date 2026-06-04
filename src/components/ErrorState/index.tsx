import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

export function ErrorState({
    title = 'Algo deu errado',
    description = 'Não foi possível carregar os dados no momento.',
    onRetry,
}: ErrorStateProps) {
    return (
        <div className="relative flex h-full min-h-175 w-full items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21')",
                }}
            />

            <div className="absolute inset-0 bg-black/75" />

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                    <AlertTriangle className="h-14 w-14 text-white" />
                </div>

                <h2 className="text-5xl font-light text-white">
                    Erro
                </h2>

                <p className="mt-3 max-w-md text-white/80">
                    {title}
                </p>

                <p className="mt-2 max-w-lg text-sm text-white/60">
                    {description}
                </p>

                {onRetry && (
                    <Button
                        onClick={onRetry}
                        className="mt-10 rounded-full px-8"
                        variant="default"
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Tentar novamente
                    </Button>
                )}
            </div>
        </div>
    );
}