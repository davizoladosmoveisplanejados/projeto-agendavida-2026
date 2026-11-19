import { useState } from "react";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./selecaoDataHora.css";

const HORARIOS_DISPONIVEIS = [
  "07:30", "08:15", "09:00", "09:45", "10:30", "11:15",
  "13:30", "14:15", "15:00", "15:45", "16:30", "17:15"
];

export default function SelecaoDataHora() {
  const navigate = useNavigate();
  const { draft, updateDraft, addAgendamento } = useApp();

  // Tomorrow as default date string YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const defaultDateStr = tomorrow.toISOString().split("T")[0];

  const [data, setData] = useState(draft.data || defaultDateStr);
  const [hora, setHora] = useState(draft.hora || "08:15");
  const [erro, setErro] = useState("");

  function confirmarAgendamento(e) {
    e.preventDefault();

    if (!data || !hora) {
      setErro("Por favor, selecione uma data e um horário.");
      return;
    }

    const finalDraft = {
      ...draft,
      data,
      hora
    };

    updateDraft(finalDraft);
    addAgendamento(finalDraft);
    navigate("/exames/confirmacao");
  }

  return (
    <>
      <Header />

      <main className="wizard-page page-container">
        {/* Wizard Step Progress */}
        <div className="wizard-progress">
          <div className="progress-step active">
            <span className="step-num">1</span>
            <span className="step-label">Exame</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step active">
            <span className="step-num">2</span>
            <span className="step-label">Dados</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step active">
            <span className="step-num">3</span>
            <span className="step-label">Local</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step active">
            <span className="step-num">4</span>
            <span className="step-label">Data e Hora</span>
          </div>
        </div>

        <section className="datahora-wrapper">
          <div className="datahora-card">
            <h1>Selecionar Data e Horário</h1>
            <p>Escolha o melhor dia e horário para a realização do seu exame</p>

            {/* Summary Box */}
            <div className="agendamento-summary-badge">
              <div>
                <strong>🔬 Exame:</strong> {draft.exame || "Hemograma Completo"}
              </div>
              <div>
                <strong>🏥 Unidade:</strong> {draft.local || "Hospital Central"}
              </div>
            </div>

            {erro && <div className="auth-error-banner">{erro}</div>}

            <form className="datahora-form" onSubmit={confirmarAgendamento}>
              <div className="form-group">
                <label>Selecione a Data *</label>
                <input
                  type="date"
                  value={data}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setData(e.target.value)}
                  className="date-picker-custom"
                  required
                />
              </div>

              <div className="form-group">
                <label>Horários Disponíveis para esta Data *</label>
                <div className="time-slots-grid">
                  {HORARIOS_DISPONIVEIS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`time-slot-btn ${hora === slot ? "selected" : ""}`}
                      onClick={() => setHora(slot)}
                    >
                      ⏱️ {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="wizard-actions">
                <button
                  type="button"
                  className="btn-brand-secondary"
                  onClick={() => navigate("/exames/local")}
                >
                  ← Voltar para Locais
                </button>
                <button type="submit" className="btn-brand-primary">
                  Finalizar e Confirmar Agendamento ✓
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}