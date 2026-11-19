import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./confirmacaoExame.css";

export default function ConfirmacaoExame() {
  const navigate = useNavigate();
  const { agendamentos } = useApp();

  const ultimoAgendamento = agendamentos.length > 0 ? agendamentos[0] : null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header />

      <main className="confirmacao-wrapper page-container">
        <div className="confirmacao-card">
          <div className="check-animated">
            <span className="check-icon-symbol">✓</span>
          </div>

          <h1>Exame Agendado com Sucesso!</h1>
          <p className="confirmacao-subtitle">
            Seu agendamento foi registrado. Enviamos a confirmação também para seu e-mail.
          </p>

          {ultimoAgendamento ? (
            <div className="voucher-card">
              <div className="voucher-header">
                <span className="voucher-title">Comprovante de Agendamento</span>
                <span className="voucher-code">{ultimoAgendamento.id}</span>
              </div>

              <div className="voucher-body">
                <div className="voucher-row">
                  <span className="voucher-label">🔬 Exame</span>
                  <span className="voucher-value highlight">{ultimoAgendamento.exame}</span>
                </div>

                <div className="voucher-row">
                  <span className="voucher-label">🏥 Local</span>
                  <span className="voucher-value">{ultimoAgendamento.local}</span>
                </div>

                <div className="voucher-row">
                  <span className="voucher-label">📍 Endereço</span>
                  <span className="voucher-value">{ultimoAgendamento.endereco}</span>
                </div>

                <div className="voucher-row">
                  <span className="voucher-label">📅 Data e Hora</span>
                  <span className="voucher-value">
                    {formatDate(ultimoAgendamento.data)} às {ultimoAgendamento.hora}
                  </span>
                </div>

                <div className="voucher-row">
                  <span className="voucher-label">💳 Convênio</span>
                  <span className="voucher-value">{ultimoAgendamento.convenio}</span>
                </div>

                {ultimoAgendamento.preparo && (
                  <div className="voucher-preparo">
                    <strong>⚠️ Instruções para o Dia:</strong>
                    <p>{ultimoAgendamento.preparo}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>Nenhum agendamento recente para exibir.</p>
          )}

          <div className="confirmacao-actions">
            <button className="btn-brand-secondary" onClick={handlePrint}>
              🖨️ Imprimir Voucher
            </button>
            <button className="btn-brand-primary" onClick={() => navigate("/agendamentos")}>
              Ver Meus Agendamentos
            </button>
            <button
              className="btn-link-action"
              onClick={() => navigate("/dashboard")}
            >
              Ir para o Painel
            </button>
          </div>
        </div>
      </main>
    </>
  );
}