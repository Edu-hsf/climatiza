import { render, screen } from "@testing-library/react";
import WeatherCard from '.';

describe('WeatherCard', () => {
    describe('temperature', () => {
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
                    weatherData={30}
                />,
            );

            expect(
                screen.getByText('30°C'),
            ).toBeInTheDocument();
        });
    });

    describe('wind_speed', () => {
        it('deve retornar a descrição corretamente', () => {
            render(<WeatherCard type="wind_speed" />);

            expect(
                screen.getByText('Velocidade do Vento'),
            ).toBeInTheDocument();
        });

        it('deve retornar o dado climático corretamente', () => {
            render(
                <WeatherCard
                    type='wind_speed'
                    weatherData={12}
                />,
            );

            expect(
                screen.getByText('12 km/h S'),
            ).toBeInTheDocument();
        });
    });

    describe('humidity', () => {
        it('deve retornar a descrição corretamente', () => {
            render(<WeatherCard type="humidity" />);

            expect(
                screen.getByText('Humidade'),
            ).toBeInTheDocument();
        });

        it('deve retornar o dado climático corretamente', () => {
            render(
                <WeatherCard
                    type='humidity'
                    weatherData={65}
                />,
            );

            expect(
                screen.getByText('65%'),
            ).toBeInTheDocument();
        });
    });

    describe('visibility', () => {
        it('deve retornar a descrição corretamente', () => {
            render(<WeatherCard type="visibility" />);

            expect(
                screen.getByText('Visibilidade'),
            ).toBeInTheDocument();
        });

        it('deve retornar o dado climático corretamente', () => {
            render(
                <WeatherCard
                    type='visibility'
                    weatherData={10}
                />,
            );

            expect(
                screen.getByText('10 km'),
            ).toBeInTheDocument();
        });
    });

    describe('pressure', () => {
        it('deve retornar a descrição corretamente', () => {
            render(<WeatherCard type="pressure" />);

            expect(
                screen.getByText('Pressão'),
            ).toBeInTheDocument();
        });

        it('deve retornar o dado climático corretamente', () => {
            render(
                <WeatherCard
                    type='pressure'
                    weatherData={1013}
                />,
            );

            expect(
                screen.getByText('1013 hPa'),
            ).toBeInTheDocument();
        });
    });

    describe('precipitation', () => {
        it('deve retornar a descrição corretamente', () => {
            render(<WeatherCard type="precipitation" />);

            expect(
                screen.getByText('Precipitação'),
            ).toBeInTheDocument();
        });

        it('deve retornar o dado climático corretamente', () => {
            render(
                <WeatherCard
                    type='precipitation'
                    weatherData={10}
                />,
            );

            expect(
                screen.getByText('10%'),
            ).toBeInTheDocument();
        });
    });

    describe('loading', () => {
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
});