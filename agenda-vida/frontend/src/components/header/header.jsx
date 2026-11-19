import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import "./header.css";

export default function Header() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to={user.isLoggedIn ? "/dashboard" : "/"} className="logo-brand">
          <div className="logo-icon">💚</div>
          <span className="logo-text">Agenda<strong>Vida</strong></span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        <nav className={`header-nav ${mobileOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <NavLink
                to={user.isLoggedIn ? "/dashboard" : "/"}
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={() => setMobileOpen(false)}
              >
                Início
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/exames"
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={() => setMobileOpen(false)}
              >
                Agendar Exame
              </NavLink>
            </li>
            {user.isLoggedIn && (
              <li>
                <NavLink
                  to="/agendamentos"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => setMobileOpen(false)}
                >
                  Meus Agendamentos
                </NavLink>
              </li>
            )}
          </ul>

          <div className="header-actions">
            {user.isLoggedIn ? (
              <div className="user-profile">
                <div className="user-avatar">
                  {user.nome ? user.nome.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="user-name">{user.nome || "Usuário"}</span>
                <button className="btn-logout" onClick={handleLogout} title="Sair da conta">
                  Sair
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login-link">
                  Entrar
                </Link>
                <Link to="/cadastro" className="btn-register-link">
                  Criar Conta
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}