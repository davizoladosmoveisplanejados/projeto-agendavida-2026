import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {

    return (
        <header className="header">

            <div className="logo-area">
                <h2 className="logo">AgendaVida</h2>
            </div>

            <nav className="navbar">

                <ul className="nav-list">

                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            Início
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/exames">
                            Exames
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/cadastro">
                            Meus Agendamentos
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link logout-btn" to="/">
                            Sair
                        </Link>
                    </li>

                </ul>

            </nav>

        </header>
    );
}