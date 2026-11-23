import { useState } from "react"
import Header from "../../components/header/header"
import { Link } from "react-router-dom"
import { useApp } from "../../context/AppContext"
import "./agendamentos.css"

export default function Agendamentos() {
  const { agendamentos, cancelAgendamento, carregandoAgendamentos } = useApp()
  const [activeTab, setActiveTab] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedId, setExpandedId] = useState(null)
  const [cancelingId, setCancelingId] = useState(null)

  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    const parts = String(dateStr).split("-")
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`
    return dateStr
  }

  // Adapta tanto agendamentos da API (status boolean) quanto os mock (string)
  const getStatus = (ag) => {
    if (ag.status === true) return "Confirmado"
    if (ag.status === false) return "Cancelado"
    return ag.status || "Confirmado"
  }

  const getNomeExame = (ag) =>
    ag.nome_exame ||
    ag.exame ||
    ag.horario?.exame?.nome_exame ||
    "Exame"

  const getLocal = (ag) =>
    ag.local ||
    ag.horario?.exame?.instituicao?.nome ||
    "—"

  const getEndereco = (ag) =>
    ag.endereco ||
    ag.horario?.exame?.instituicao?.endereco ||
    "—"

  const getId = (ag) =>
    ag.id_agendamento || ag.id || Math.random()

  const getHora = (ag) =>
    ag.hora ||
    (ag.horario?.hora ? String(ag.horario.hora).substring(11, 16) : "—")

  const getDate = (ag) =>
    ag.data || ag.data_agendamento || ""

  const filteredAgendamentos = agendamentos.filter((item) => {
    const status = getStatus(item)
    if (activeTab === "Próximos" && status !== "Confirmado") return false
    if (activeTab === "Concluídos" && status !== "Concluído") return false
    if (activeTab === "Cancelados" && status !== "Cancelado") return false

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase()
      return (
        getNomeExame(item).toLowerCase().includes(term) ||
        getLocal(item).toLowerCase().includes(term) ||
        String(getId(item)).toLowerCase().includes(term)
      )
    }

    return true
  })

  const confirmCancel = () => {
    if (cancelingId !== null) {
      cancelAgendamento(cancelingId)
      setCancelingId(null)
    }
  }

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

        {carregandoAgendamentos ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#6b7280" }}>
            Carregando seus agendamentos...
          </div>
        ) : filteredAgendamentos.length > 0 ? (
          <div className="agendamentos-list">
            {filteredAgendamentos.map((item) => {
              const id = getId(item)
              const isExpanded = expandedId === id
              const status = getStatus(item)
              const statusClass = status.toLowerCase().replace("í", "i")

              return (
                <div key={id} className="agendamento-card">
                  <div className="agendamento-card-header">
                    <div className="card-header-left">
                      <span className="agendamento-code">#{id}</span>
                      <span className={`badge-status ${statusClass}`}>{status}</span>
                    </div>
                    <div className="card-header-right">
                      <span className="date-badge">
                        📅 {formatDate(getDate(item))} às ⏱️ {getHora(item)}
                      </span>
                    </div>
                  </div>

                  <div className="agendamento-card-body">
                    <h3>{getNomeExame(item)}</h3>

                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">🏥 Local</span>
                        <span className="info-value">{getLocal(item)}</span>
                      </div>

                      <div className="info-item">
                        <span className="info-label">📍 Endereço</span>
                        <span className="info-value">{getEndereco(item)}</span>
                      </div>

                      {item.convenio && (
                        <div className="info-item">
                          <span className="info-label">💳 Convênio</span>
                          <span className="info-value">{item.convenio}</span>
                        </div>
                      )}
                    </div>

                    {isExpanded && item.preparo && (
                      <div className="expanded-details">
                        <div className="detail-block">
                          <strong>📋 Recomendações de Preparo:</strong>
                          <p>{item.preparo}</p>
                        </div>
                        {item.observacoes && (
                          <div className="detail-block">
                            <strong>📝 Observações:</strong>
                            <p>{item.observacoes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="agendamento-card-footer">
                    {item.preparo && (
                      <button
                        className="btn-toggle-details"
                        onClick={() => setExpandedId(isExpanded ? null : id)}
                      >
                        {isExpanded ? "▲ Ocultar Preparo" : "▼ Ver Instruções de Preparo"}
                      </button>
                    )}

                    <div className="footer-action-buttons">
                      {status === "Confirmado" && (
                        <button
                          className="btn-cancel"
                          onClick={() => setCancelingId(id)}
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="empty-agendamentos">
            <div className="empty-icon">📁</div>
            <h3>Nenhum agendamento encontrado</h3>
            <p>
              {searchTerm
                ? `Nenhum resultado para "${searchTerm}".`
                : `Não há agendamentos na categoria "${activeTab}".`}
            </p>
            <Link to="/exames" className="btn-brand-primary" style={{ marginTop: '16px' }}>
              Agendar Novo Exame
            </Link>
          </div>
        )}

        {/* Modal Confirm Cancel */}
        {cancelingId !== null && (
          <div className="modal-backdrop">
            <div className="modal-card">
              <h3>Confirmar Cancelamento</h3>
              <p>Tem certeza de que deseja cancelar este agendamento?</p>

              <div className="modal-buttons">
                <button className="btn-brand-secondary" onClick={() => setCancelingId(null)}>
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
  )
}
