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

    it('deve aplicar as classes principais de layout', () => {
      const { container } = render(
        <Header.Root>
          <span>Conteúdo</span>
        </Header.Root>,
      );

      const root = container.firstChild as HTMLElement;

      expect(root).toHaveClass('flex');
      expect(root).toHaveClass('justify-between');
    });
  });

  describe('Info', () => {
    it('deve renderizar os conteúdos informativos', () => {
      render(
        <Header.Info>
          <span>Brasília</span>
          <span>Brasil</span>
        </Header.Info>,
      );

      expect(screen.getByText('Brasília')).toBeInTheDocument();
      expect(screen.getByText('Brasil')).toBeInTheDocument();
    });
  });

  describe('Button', () => {
    it('deve renderizar como botão acessível', () => {
      render(
        <Header.HeaderButton>
          Abrir menu
        </Header.HeaderButton>,
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('deve renderizar o conteúdo corretamente', () => {
      render(
        <Header.HeaderButton>
          <span>Configurações</span>
        </Header.HeaderButton>,
      );

      expect(screen.getByText('Configurações')).toBeInTheDocument();
    });

    it('deve disparar onClick ao ser clicado', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Header.HeaderButton onClick={handleClick}>
          Clique
        </Header.HeaderButton>,
      );

      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('deve ser acessível via teclado', async () => {
      const user = userEvent.setup();

      render(
        <Header.HeaderButton>
          Botão
        </Header.HeaderButton>,
      );

      const button = screen.getByRole('button');

      await user.tab();

      expect(button).toHaveFocus();
    });
  });

  describe('Composição', () => {
    it('deve renderizar Header completo corretamente', () => {
      render(
        <Header.Root>
          <Header.Info>
            <span>Localização</span>
          </Header.Info>

          <Header.HeaderButton>
            ⚙️
          </Header.HeaderButton>
        </Header.Root>,
      );

      expect(screen.getByText('Localização')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('deve suportar múltiplos componentes filhos', () => {
      render(
        <Header.Root>
          <Header.Info>
            <span>Info 1</span>
          </Header.Info>

          <Header.Info>
            <span>Info 2</span>
          </Header.Info>

          <Header.HeaderButton>
            Botão
          </Header.HeaderButton>
        </Header.Root>,
      );

      expect(screen.getByText('Info 1')).toBeInTheDocument();
      expect(screen.getByText('Info 2')).toBeInTheDocument();
      expect(screen.getByText('Botão')).toBeInTheDocument();
    });
  });
});