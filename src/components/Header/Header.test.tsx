import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Header } from "."

describe('Header', () => {
    describe('HeaderRoot', () => {
        it('deve renderizar com a estrutura correta de flexbox', () => {
            const { container } = render(
                <Header.Root>
                    <div>Conteúdo 1</div>
                    <div>Conteúdo 2</div>
                </Header.Root>
            )
            
            const root = container.firstChild as HTMLElement
            expect(root).toHaveClass('flex', 'flex-row', 'justify-between', 'p-8')
        })

        it('deve renderizar todos os children corretamente', () => {
            render(
                <Header.Root>
                    <span>Esquerda</span>
                    <span>Direita</span>
                </Header.Root>
            )
            
            expect(screen.getByText('Esquerda')).toBeInTheDocument()
            expect(screen.getByText('Direita')).toBeInTheDocument()
        })

        it('deve renderizar com um único child', () => {
            render(
                <Header.Root>
                    <div>Único conteúdo</div>
                </Header.Root>
            )
            
            expect(screen.getByText('Único conteúdo')).toBeInTheDocument()
        })

        it('deve renderizar como elemento div', () => {
            const { container } = render(
                <Header.Root>
                    <span>Test</span>
                </Header.Root>
            )
            
            expect(container.querySelector('div')).toBeInTheDocument()
        })
    })

    describe('HeaderInfo', () => {
        it('deve renderizar com as classes corretas', () => {
            const { container } = render(
                <Header.Info>
                    <span>Info</span>
                </Header.Info>
            )
            
            const info = container.firstChild as HTMLElement
            expect(info).toHaveClass('flex', 'items-center', 'text-lg', 'gap-2')
        })

        it('deve renderizar children corretamente', () => {
            render(
                <Header.Info>
                    <span>Brasília</span>
                    <span>Brasil</span>
                </Header.Info>
            )
            
            expect(screen.getByText('Brasília')).toBeInTheDocument()
            expect(screen.getByText('Brasil')).toBeInTheDocument()
        })

        it('deve renderizar como div', () => {
            const { container } = render(
                <Header.Info>
                    <span>conteúdo</span>
                </Header.Info>
            )
            
            expect(container.querySelector('div')).toBeInTheDocument()
        })
    })

    describe('HeaderButton', () => {
        it('deve renderizar como elemento button', () => {
            render(
                <Header.HeaderButton>
                    <span>Botão</span>
                </Header.HeaderButton>
            )
            
            expect(screen.getByRole('button')).toBeInTheDocument()
        })

        it('deve renderizar com as classes corretas de styling', () => {
            const { container } = render(
                <Header.HeaderButton>
                    <span>Icon</span>
                </Header.HeaderButton>
            )
            
            const button = container.querySelector('button') as HTMLElement
            expect(button).toHaveClass(
                'glass',
                'text-white',
                'w-fit',
                'h-fit',
                'p-3',
                'rounded-full'
            )
        })

        it('deve renderizar children corretamente', () => {
            render(
                <Header.HeaderButton>
                    <span>Ícone</span>
                </Header.HeaderButton>
            )
            
            expect(screen.getByText('Ícone')).toBeInTheDocument()
        })

        it('deve ser clicável', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()
            
            render(
                <Header.HeaderButton onClick={handleClick}>
                    <span>Clique</span>
                </Header.HeaderButton>
            )
            
            const button = screen.getByRole('button')
            await user.click(button)
            
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('deve renderizar múltiplos children', () => {
            render(
                <Header.HeaderButton>
                    <span>Ícone</span>
                    <span>Texto</span>
                </Header.HeaderButton>
            )
            
            expect(screen.getByText('Ícone')).toBeInTheDocument()
            expect(screen.getByText('Texto')).toBeInTheDocument()
        })

        it('deve ter padding de 3 unidades Tailwind', () => {
            const { container } = render(
                <Header.HeaderButton>
                    <span>Test</span>
                </Header.HeaderButton>
            )
            
            const button = container.querySelector('button') as HTMLElement
            expect(button).toHaveClass('p-3')
        })

        it('deve ser completamente redondo', () => {
            const { container } = render(
                <Header.HeaderButton>
                    <span>Test</span>
                </Header.HeaderButton>
            )
            
            const button = container.querySelector('button') as HTMLElement
            expect(button).toHaveClass('rounded-full')
        })
    })

    describe('Header Composition', () => {
        it('deve renderizar Header completo com Root, Info e Button', () => {
            render(
                <Header.Root>
                    <Header.Info>
                        <span>Localização</span>
                    </Header.Info>
                    <Header.HeaderButton>
                        <span>⚙️</span>
                    </Header.HeaderButton>
                </Header.Root>
            )
            
            expect(screen.getByText('Localização')).toBeInTheDocument()
            expect(screen.getByText('⚙️')).toBeInTheDocument()
            expect(screen.getByRole('button')).toBeInTheDocument()
        })

        it('deve renderizar múltiplos Info e Button components', () => {
            render(
                <Header.Root>
                    <Header.Info>
                        <span>Info 1</span>
                    </Header.Info>
                    <Header.Info>
                        <span>Info 2</span>
                    </Header.Info>
                    <Header.HeaderButton>
                        <span>Botão</span>
                    </Header.HeaderButton>
                </Header.Root>
            )
            
            expect(screen.getByText('Info 1')).toBeInTheDocument()
            expect(screen.getByText('Info 2')).toBeInTheDocument()
            expect(screen.getByText('Botão')).toBeInTheDocument()
        })

        it('deve manter estrutura correta com nested components', () => {
            const { container } = render(
                <Header.Root>
                    <Header.Info>
                        <span>Esquerda</span>
                    </Header.Info>
                    <Header.HeaderButton>
                        <span>Direita</span>
                    </Header.HeaderButton>
                </Header.Root>
            )
            
            const root = container.firstChild as HTMLElement
            expect(root).toHaveClass('justify-between')
            expect(screen.getByText('Esquerda')).toBeInTheDocument()
            expect(screen.getByText('Direita')).toBeInTheDocument()
        })
    })

    describe('Acessibilidade', () => {
        it('HeaderButton deve ser acessível via teclado', async () => {
            const user = userEvent.setup()
            render(
                <Header.HeaderButton>
                    <span>Configurações</span>
                </Header.HeaderButton>
            )
            
            const button = screen.getByRole('button')
            expect(button).toBeEnabled()
            
            await user.tab()
            expect(button).toHaveFocus()
        })

        it('deve renderizar conteúdo de texto acessível', () => {
            render(
                <Header.Root>
                    <Header.Info>
                        <span>Temperatura atual</span>
                    </Header.Info>
                </Header.Root>
            )
            
            expect(screen.getByText('Temperatura atual')).toBeInTheDocument()
        })
    })
})