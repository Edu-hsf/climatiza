import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '.';

describe('Header', () => {
  describe('Root', () => {
    it('deve renderizar os children corretamente', () => {
      render(
        <Header.Root>
          <span>Esquerda</span>
          <span>Direita</span>
        </Header.Root>,
      );

      expect(screen.getByText('Esquerda')).toBeInTheDocument();
      expect(screen.getByText('Direita')).toBeInTheDocument();
    });
  });

  describe('Info', () => {
    it('deve renderizar a cidade e o país corretamente', () => {
      render(
        <Header.Info
          city='Brasília'
          country='Brasil'
        />,
      );

      expect(screen.getByText('Brasília, Brasil')).toBeInTheDocument();
    });
  });

  describe('Button', () => {
    it('deve rederizar o botão corretamente', () => {
      render(
        <Header.Button>Configurações</Header.Button>,
      );

      expect(screen.getByText('Configurações')).toBeInTheDocument();
    });

    it('deve ser clicável', async () => {
      const handleClick = vi.fn();

      render(<Header.Button onClick={handleClick}>Configurações</Header.Button>);

      await userEvent.click(screen.getByRole('button', { name: /Configurações/i }));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('deve ser acessível via teclado', async () => {
      
      render(
        <Header.Button>
          Botão
        </Header.Button>,
      );

      const button = screen.getByRole('button');

      await userEvent.tab();

      expect(button).toHaveFocus();
    });
  });
});