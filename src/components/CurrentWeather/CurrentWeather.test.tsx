import { render, screen } from "@testing-library/react"
import CurrentWeather from "."

describe('CurrentWeather', () => {
    it('deve renderizar a temperatura corretamente', () => {
        render(<CurrentWeather/>)
        expect(screen.getByText('28°C')).toBeInTheDocument()
    }) 

    it('deve renderizar com a descrição do clima corretamente', () => {
        render(<CurrentWeather/>)
        expect(screen.getByText('Chuva fraca')).toBeInTheDocument()
    })

    it('deve renderizar o ícone do clima corretamente', () => {
        const { container } = render(<CurrentWeather/>)
        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('deve com as classes corretas', () => {
        const { container } = render(<CurrentWeather/>)
        const root = container.firstChild as HTMLElement

        expect(root).toHaveClass('flex flex-col items-center')
    })
})