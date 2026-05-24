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
        render(<WeatherCard type='temperature' weatherData={30} />);

        expect(screen.getByText('30°C')).toBeInTheDocument();
    });
});