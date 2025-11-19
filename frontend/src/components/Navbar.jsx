import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken, getToken } from '../utils/auth';

export default function Navbar() {
  const token = getToken();
  const navigate = useNavigate();

  function logout() {
    clearToken();
    navigate('/login');
    window.location.reload();
  }

  return (
    <nav className="nav-top">
      <div className="nav-inner">
        <div className="brand"><Link to="/">Gestão de Estoque</Link></div>
        <ul className="nav-links">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/products">Produtos</Link></li>
          <li><Link to="/suppliers">Fornecedores</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          {!token ? (
            <>
              <li><Link to="/login">Entrar</Link></li>
              <li><Link to="/register">Registrar</Link></li>
            </>
          ) : (
            <li><button onClick={logout} className="btn-ghost">Sair</button></li>
          )}
        </ul>
      </div>
    </nav>
  );
}
