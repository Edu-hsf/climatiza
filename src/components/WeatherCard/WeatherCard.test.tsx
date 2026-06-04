import { render, screen } from "@testing-library/react";
import WeatherCard from '.';

describe('WeatherCard', () => {
    it('deve retornar o icone corretamente', () => {
        render(<WeatherCard type="temperature" />);

        expect(screen.getByTestId('weather-icon')).toBeInTheDocument();
    });

    it('deve retornar a descrição corretamente', () => {
        render(<WeatherCard type="temperature" />);

        expect(screen.getByText('Sensação Térmica')).toBeInTheDocument();
    });

    it('deve retornar o dado climático corretamente', () => {
        render(
            <WeatherCard
                type='temperature'
                value={30}
                unit="°C"
            />,
        );

        expect(
            screen.getByText('30°C'),
        ).toBeInTheDocument();
    });

    it('deve renderizar os skeleton quando estiver carregando', () => {
        render(
            <WeatherCard
                type="temperature"
                isLoading
            />,
        );

        expect(
            screen.queryByTestId('weather-icon'),
        ).not.toBeInTheDocument();

        expect(
            screen.queryByText('Sensação Térmica'),
        ).not.toBeInTheDocument();
    });
});