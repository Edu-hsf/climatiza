import { render, screen } from "@testing-library/react";
import { Thermometer } from "lucide-react";
import WeatherCard from '.';

describe('WeatherCard', () => {
    it('deve retornar o icone corretamente', () => {
        render(<WeatherCard icon={Thermometer} />);

        expect(screen.getByTestId('weather-icon')).toBeInTheDocument();
    });

    it('deve retornar a descrição corretamente', () => {
        render(<WeatherCard description='Sensação térmica' />);

        expect(screen.getByText('Sensação térmica')).toBeInTheDocument();
    });

    it('deve retornar o dado climático corretamente', () => {
        render(<WeatherCard type='temperature' weatherData={30} />);

        expect(screen.getByText('30')).toBeInTheDocument();
    });
});