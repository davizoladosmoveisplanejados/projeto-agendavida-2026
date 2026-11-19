import { useState } from "react";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./cadastroExames.css";

export default function CadastroExames() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useApp();

  const [exame, setExame] = useState(draft.exame || "Hemograma Completo");
  const [convenio, setConvenio] = useState(draft.convenio || "SUS");
  const [observacoes, setObservacoes] = useState(draft.observacoes || "");

  function escolherLocal(e) {
    e.preventDefault();

    updateDraft({
      exame: exame,
      convenio: convenio,
      observacoes: observacoes
    });

    navigate("/exames/local");
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
          <div className="progress-step">
            <span className="step-num">3</span>
            <span className="step-label">Local</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="step-num">4</span>
            <span className="step-label">Data e Hora</span>
          </div>
        </div>

        <section className="exame-form-wrapper">
          <div className="exame-card-wizard">
            <h1>Preencha os Dados do Exame</h1>
            <p>Confira o nome do exame e informe a modalidade de pagamento/convênio</p>

            <form className="exame-form" onSubmit={escolherLocal}>
              <div className="form-group">
                <label>Nome do Exame</label>
                <input
                  type="text"
                  placeholder="Ex: Hemograma Completo"
                  value={exame}
                  onChange={(e) => setExame(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Plano de Saúde / Modalidade</label>
                <select
                  value={convenio}
                  onChange={(e) => setConvenio(e.target.value)}
                  className="form-select-custom"
                >
                  <option value="SUS">SUS (Sistema Único de Saúde)</option>
                  <option value="Particular">Particular</option>
                  <option value="Unimed">Unimed</option>
                  <option value="Bradesco Saúde">Bradesco Saúde</option>
                  <option value="SulAmérica">SulAmérica</option>
                  <option value="Amil">Amil</option>
                  <option value="NotreDame Intermédica">NotreDame Intermédica</option>
                  <option value="Porto Seguro">Porto Seguro Saúde</option>
                </select>
              </div>

              <div className="form-group">
                <label>Observações / Recomendações do Médico (Opcional)</label>
                <textarea
                  placeholder="Ex: Exame solicitado com urgência / Paciente alérgico a iodo..."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  rows="3"
                ></textarea>
              </div>

              {draft.preparo && (
                <div className="info-preparo-snippet">
                  <strong>💡 Preparo Recomendado:</strong>
                  <p>{draft.preparo}</p>
                </div>
              )}

              <div className="wizard-actions">
                <button
                  type="button"
                  className="btn-brand-secondary"
                  onClick={() => navigate("/exames")}
                >
                  ← Alterar Exame
                </button>
                <button type="submit" className="btn-brand-primary">
                  Escolher Local do Exame →
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}