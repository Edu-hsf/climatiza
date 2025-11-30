import { render, screen } from "@testing-library/react"
import { Header } from "."

describe('Header', () => {
    it('Deve renderizar o componente AppTitle', () => { 
        render(
            <Header.Root>
                <Header.Title text="Climatiza"/>
            </Header.Root>
        ) 
        expect(screen.getByText('Climatiza')).toBeInTheDocument()
    })
    
    it('Deve renderizar o componente IconButton', () => {
        render(
            <Header.Root>
                <Header.IconButton icon="../../assets/images/icons/arrow-black-icon.svg"/>
            </Header.Root>
        )   
        expect(screen.getByTestId('iconButton')).toBeInTheDocument()
    })
})