import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./selecaoLocal.css";

const LOCAIS = [
  {
    id: 1,
    nome: "Hospital Central",
    tipo: "Hospital de Referência",
    endereco: "Rua Principal, 120 - Bairro da Saúde",
    distancia: "1.2 km",
    avaliacao: "4.9 ⭐",
    tags: ["Estacionamento Grátis", "Resultado Online em 24h", "Acessibilidade"]
  },
  {
    id: 2,
    nome: "Laboratório Vida",
    tipo: "Laboratório Especializado",
    endereco: "Avenida Brasil, 450 - Centro",
    distancia: "2.5 km",
    avaliacao: "4.8 ⭐",
    tags: ["Coleta Domiciliar", "Atendimento Preferencial", "Café de Desjejum"]
  },
  {
    id: 3,
    nome: "Clínica Saúde+",
    tipo: "Centro Médico Integrado",
    endereco: "Rua das Flores, 89 - Jardim Paulista",
    distancia: "3.8 km",
    avaliacao: "4.7 ⭐",
    tags: ["Ambiente Climatizado", "Aceita Vários Convênios", "Resultados Via App"]
  },
  {
    id: 4,
    nome: "Centro Diagnóstico São Lucas",
    tipo: "Instituto de Imagem & Diagnóstico",
    endereco: "Alameda dos Anjos, 300 - Vila Nova",
    distancia: "4.1 km",
    avaliacao: "4.9 ⭐",
    tags: ["Equipamentos de Última Geração", "Laudos Prioritários"]
  }
];

export default function SelecaoLocal() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useApp();

  function selecionarLocal(localItem) {
    updateDraft({
      local: localItem.nome,
      endereco: localItem.endereco
    });
    navigate("/exames/datahora");
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
          <div className="progress-step">
            <span className="step-num">4</span>
            <span className="step-label">Data e Hora</span>
          </div>
        </div>

        <header className="page-header text-center">
          <h1>Selecione o Local do Exame</h1>
          <p>
            Exame escolhido: <strong>{draft.exame || "Exame Selecionado"}</strong> 
            {draft.convenio && ` (${draft.convenio})`}
          </p>
        </header>

        <div className="local-cards-grid">
          {LOCAIS.map((item) => (
            <div
              key={item.id}
              className="local-card-item"
              onClick={() => selecionarLocal(item)}
            >
              <div className="local-card-top">
                <div>
                  <span className="local-tipo">{item.tipo}</span>
                  <h2>{item.nome}</h2>
                </div>
                <span className="local-distancia">📍 {item.distancia}</span>
              </div>

              <p className="local-endereco">📍 {item.endereco}</p>
              
              <div className="local-tags">
                <span className="rating-tag">{item.avaliacao}</span>
                {item.tags.map((tag, i) => (
                  <span key={i} className="feature-tag">{tag}</span>
                ))}
              </div>

              <div className="local-card-footer">
                <button className="btn-select-local">
                  Selecionar esta Unidade →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="wizard-actions text-center" style={{ marginTop: '32px' }}>
          <button
            type="button"
            className="btn-brand-secondary"
            onClick={() => navigate("/exames/cadastro")}
          >
            ← Voltar para Dados do Exame
          </button>
        </div>
      </main>
    </>
  );
}