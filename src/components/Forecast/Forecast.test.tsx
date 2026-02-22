import { render, screen } from "@testing-library/react"
import Forecast from "."

describe('Forecast', () => {
    it('Deve renderizar o componente com as classes corretas', () => {
        const { container } = render(<Forecast/>)
        const root = container.firstChild as HTMLElement
        
        expect(root).toHaveClass(
            'w-full', 
            'max-w-4xl'
        )
    })

    it('deve renderizar o título do componente corretamente', () => {
        render(<Forecast/>)
        expect(screen.getByText('Previsão horária')).toBeInTheDocument()
    })

    it('deve renderizar a estrutura de grid corretamente', () => {
        render(<Forecast/>)

        expect(screen.getByTestId('forecast-grid')).toHaveClass(
            'grid', 
            'grid-cols-2', 
            'md:grid-cols-4', 
            'gap-4'
        )
    })
})