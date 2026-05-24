import { render, screen } from "@testing-library/react";
import { CloudDrizzle } from 'lucide-react';
import { Forecast } from ".";

describe('Forecast', () => {
    describe('Root', () => {
        it('deve renderizar o título do componente corretamente', () => {
            render(
                <Forecast.Root>
                    <span></span>
                </Forecast.Root>,
            );

            expect(screen.getByText('Previsão horária')).toBeInTheDocument();
        });

        it('deve renderizar os children corretamente', () => {
            render(
                <Forecast.Root>
                    <span>Card 1</span>
                    <span>Card 2</span>
                    <span>Card 3</span>
                    <span>Card 4</span>
                </Forecast.Root>,
            );

            expect(screen.getByText('Card 1')).toBeInTheDocument();
            expect(screen.getByText('Card 2')).toBeInTheDocument();
            expect(screen.getByText('Card 3')).toBeInTheDocument();
            expect(screen.getByText('Card 4')).toBeInTheDocument();
        });
    });

    describe('Card', () => {
        it('deve renderizar a hora corretamente', () => {
            const date = new Date('Sun May 24 2026 10:42:59 GMT-0300');

            render(
                <Forecast.Card
                    time={date}
                />,
            );
            expect(screen.getByText('10:42')).toBeInTheDocument();
        });

        it('deve renderizar a temperatura corretamente', () => {
            render(
                <Forecast.Card
                    temperature={23}
                />,
            );

            expect(screen.getByText('23°C')).toBeInTheDocument();
        });

        it('deve renderizar o ícone corretamente', () => {
            const { container } = render(
                <Forecast.Card
                    icon={CloudDrizzle}
                />,
            );

            expect(container.querySelector('svg')).toBeInTheDocument();
        });
    });
});