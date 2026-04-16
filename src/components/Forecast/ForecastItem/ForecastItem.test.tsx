import { render, screen } from "@testing-library/react"
import ForecastItem from "."
import { CloudDrizzle } from 'lucide-react'

describe('ForecastItem', () => {
    it('deve renderizar o horário corretamente', () => {
        render(<ForecastItem time='11:59'/>)
        expect(screen.getByText('11:59')).toBeInTheDocument()
    })

    it('deve renderizar o ícone do clima corretamente', () => {
        const { container } = render(<ForecastItem icon={ CloudDrizzle }/>)
        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('deve renderizar a temperatura corretamente', () => {
        render(<ForecastItem temperature='29°C'/>)
        expect(screen.getByText('29°C')).toBeInTheDocument()
    })
})