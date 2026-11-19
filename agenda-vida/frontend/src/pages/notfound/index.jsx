import Header from "../../components/header/header";
import { Link } from "react-router-dom";
import "./notfound.css";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="notfound-wrapper page-container">
        <div className="notfound-card">
          <div className="notfound-code">404</div>
          <h1>Página Não Encontrada</h1>
          <p>Ops! A página que você está procurando não existe ou foi movida.</p>

          <div className="notfound-actions">
            <Link to="/dashboard" className="btn-brand-primary">
              Ir para o Painel
            </Link>
            <Link to="/" className="btn-brand-secondary">
              Voltar ao Início
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
