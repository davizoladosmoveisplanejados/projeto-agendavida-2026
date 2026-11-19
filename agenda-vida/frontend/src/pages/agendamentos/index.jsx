import { useState } from "react";
import Header from "../../components/header/header";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./agendamentos.css";

export default function Agendamentos() {
  const { agendamentos, cancelAgendamento } = useApp();
  const [activeTab, setActiveTab] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [cancelingId, setCancelingId] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const filteredAgendamentos = agendamentos.filter((item) => {
    // Tab filter
    if (activeTab === "Próximos" && item.status !== "Confirmado") return false;
    if (activeTab === "Concluídos" && item.status !== "Concluído") return false;
    if (activeTab === "Cancelados" && item.status !== "Cancelado") return false;

    // Search filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      const matchExame = item.exame.toLowerCase().includes(term);
      const matchLocal = item.local.toLowerCase().includes(term);
      const matchId = item.id.toLowerCase().includes(term);
      return matchExame || matchLocal || matchId;
    }

    return true;
  });

  const confirmCancel = () => {
    if (cancelingId) {
      cancelAgendamento(cancelingId);
      setCancelingId(null);
    }
  };

  return (
    <>
      <Header />

      <main className="agendamentos-page page-container">
        <header className="page-header agendamentos-header">
          <div>
            <h1>Meus Agendamentos</h1>
            <p>Gerencie e consulte o histórico de todos os seus exames marcados</p>
          </div>
          <Link to="/exames" className="btn-brand-primary">
            + Novo Agendamento
          </Link>
        </header>

        {/* Filter Controls Bar */}
        <div className="controls-bar">
          <div className="tabs-list">
            {["Todos", "Próximos", "Concluídos", "Cancelados"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por exame ou clínica..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Agendamentos List */}
        {filteredAgendamentos.length > 0 ? (
          <div className="agendamentos-list">
            {filteredAgendamentos.map((item) => {
              const isExpanded = expandedId === item.id;
              const statusClass = item.status ? item.status.toLowerCase() : "confirmado";

              return (
                <div key={item.id} className="agendamento-card">
                  <div className="agendamento-card-header">
                    <div className="card-header-left">
                      <span className="agendamento-code">{item.id}</span>
                      <span className={`badge-status ${statusClass}`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="card-header-right">
                      <span className="date-badge">
                        📅 {formatDate(item.data)} às ⏱️ {item.hora}
                      </span>
                    </div>
                  </div>

                  <div className="agendamento-card-body">
                    <h3>{item.exame}</h3>
                    
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">🏥 Local</span>
                        <span className="info-value">{item.local}</span>
                      </div>

                      <div className="info-item">
                        <span className="info-label">📍 Endereço</span>
                        <span className="info-value">{item.endereco}</span>
                      </div>

                      <div className="info-item">
                        <span className="info-label">💳 Convênio</span>
                        <span className="info-value">{item.convenio}</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="expanded-details">
                        <div className="detail-block">
                          <strong>📋 Recomendações e Preparo Pré-Exame:</strong>
                          <p>{item.preparo || "Nenhuma recomendação especial."}</p>
                        </div>

                        {item.observacoes && (
                          <div className="detail-block">
                            <strong>📝 Observações Médicas:</strong>
                            <p>{item.observacoes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="agendamento-card-footer">
                    <button
                      className="btn-toggle-details"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    >
                      {isExpanded ? "▲ Ocultar Preparo" : "▼ Ver Instruções de Preparo"}
                    </button>

                    <div className="footer-action-buttons">
                      {item.status === "Confirmado" && (
                        <button
                          className="btn-cancel"
                          onClick={() => setCancelingId(item.id)}
                        >
                          Cancelar
                        </button>
                      )}

                      {item.status === "Concluído" && (
                        <button
                          className="btn-results"
                          onClick={() => alert(`Visualizando resultado online do exame ${item.exame}`)}
                        >
                          📄 Baixar Resultado (PDF)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-agendamentos">
            <div className="empty-icon">📁</div>
            <h3>Nenhum agendamento encontrado</h3>
            <p>
              {searchTerm 
                ? `Nenhum resultado para "${searchTerm}". Tente buscar por outros termos.`
                : `Não há agendamentos na categoria "${activeTab}".`}
            </p>
            <Link to="/exames" className="btn-brand-primary" style={{ marginTop: '16px' }}>
              Agendar Novo Exame
            </Link>
          </div>
        )}

        {/* Modal Confirm Cancel */}
        {cancelingId && (
          <div className="modal-backdrop">
            <div className="modal-card">
              <h3>Confirmar Cancelamento</h3>
              <p>Tem certeza de que deseja cancelar este agendamento? Esta ação não pode ser desfeita.</p>

              <div className="modal-buttons">
                <button
                  className="btn-brand-secondary"
                  onClick={() => setCancelingId(null)}
                >
                  Manter Agendamento
                </button>
                <button className="btn-danger-confirm" onClick={confirmCancel}>
                  Sim, Cancelar Exame
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
