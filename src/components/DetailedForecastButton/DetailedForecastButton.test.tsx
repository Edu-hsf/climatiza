import { render, screen } from "@testing-library/react"
import DetailedForecastButton from "."

describe('DetailedForecastButton', () => {
    it('deve renderizar o componente corretamente', () => {
        render(<DetailedForecastButton/>)
        expect(screen.getByText('Ver Previsão Detalhada')).toBeInTheDocument()
    })
})