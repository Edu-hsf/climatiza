import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <div className="app-container">
      {/* Aqui você pode adicionar componentes fixos como Header, Navbar, Footer */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}