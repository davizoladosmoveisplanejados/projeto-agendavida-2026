import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand-title">
            <span className="brand-icon">💚</span> AgendaVida
          </div>
          <p className="brand-desc">
            Sua saúde em primeiro lugar. Agendamento simples, rápido e transparente de exames e consultas médicas.
          </p>
        </div>

        <div className="footer-links">
          <h4>Navegação</h4>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/exames">Buscar Exames</Link></li>
            <li><Link to="/agendamentos">Meus Agendamentos</Link></li>
            <li><Link to="/login">Acessar Conta</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Atendimento</h4>
          <ul>
            <li><span>📞 Central: 0800 770 2026</span></li>
            <li><span>💬 WhatsApp: (11) 98765-4321</span></li>
            <li><span>✉️ contato@agendavida.com.br</span></li>
            <li><span>📍 Atendimento 24 horas</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 AgendaVida - Projeto SENAI. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
