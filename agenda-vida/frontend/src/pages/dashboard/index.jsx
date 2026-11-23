import Header from "../../components/header/header"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useApp } from "../../context/AppContext"
import "./dashboard.css"

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { agendamentos, cancelAgendamento, carregandoAgendamentos } = useApp()
  const navigate = useNavigate()

  // Adapta tanto agendamentos vindos da API (campo status boolean) quanto locais (string)
  const proximos = agendamentos.filter(a => a.status === true || a.status === "Confirmado")
  const concluidos = agendamentos.filter(a => a.status === "Concluído")
  const proximoExame = proximos.length > 0 ? proximos[0] : null

  function handleLogout() {
    logout()
    navigate("/login")
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    const parts = String(dateStr).split("-")
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`
    return dateStr
  }

  const getNomeExame = (ag) =>
    ag.nome_exame ||
    ag.exame ||
    ag.horario?.exame?.nome_exame ||
    "Exame"

  const getLocal = (ag) =>
    ag.local ||
    ag.horario?.exame?.instituicao?.nome ||
    "Unidade de saúde"

  const getHora = (ag) =>
    ag.hora ||
    (ag.horario?.hora ? String(ag.horario.hora).substring(11, 16) : "—")

  const getDate = (ag) =>
    ag.data || ag.data_agendamento || ""

  return (
    <>
      <Header />

      <main className="dashboard-page page-container">
        {/* Welcome Banner */}
        <section className="welcome-banner">
          <div className="welcome-text">
            <h1>Olá, {user?.nome || "Paciente"}! 👋</h1>
            <p>Seja bem-vindo(a) ao seu painel de saúde no AgendaVida.</p>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Link to="/exames" className="btn-brand-primary">
              + Agendar Novo Exame
            </Link>
            <button
              onClick={handleLogout}
              className="btn-brand-secondary"
              style={{ whiteSpace: "nowrap" }}
            >
              Sair
            </button>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="dash-stat-card">
            <div className="stat-icon icon-blue">📅</div>
            <div className="stat-info">
              <h3>{carregandoAgendamentos ? "..." : proximos.length}</h3>
              <p>Próximos Exames</p>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-icon icon-green">✅</div>
            <div className="stat-info">
              <h3>{carregandoAgendamentos ? "..." : concluidos.length}</h3>
              <p>Exames Concluídos</p>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-icon icon-purple">🏥</div>
            <div className="stat-info">
              <h3>{agendamentos.length}</h3>
              <p>Total de Agendamentos</p>
            </div>
          </div>
        </section>

        {/* Spotlight Next Exam */}
        <section className="dashboard-main-grid">
          <div className="spotlight-section">
            <div className="section-title">
              <h2>Próximo Agendamento</h2>
              <Link to="/agendamentos">Ver todos ({agendamentos.length})</Link>
            </div>

            {carregandoAgendamentos ? (
              <div className="empty-spotlight"><p>Carregando...</p></div>
            ) : proximoExame ? (
              <div className="spotlight-card">
                <div className="spotlight-header">
                  <span className="badge-status confirmado">Confirmado</span>
                  <span className="spotlight-date">
                    📅 {formatDate(getDate(proximoExame))} às ⏱️ {getHora(proximoExame)}
                  </span>
                </div>

                <div className="spotlight-body">
                  <h3>{getNomeExame(proximoExame)}</h3>
                  <div className="spotlight-detail">
                    <span>🏥 <strong>Local:</strong> {getLocal(proximoExame)}</span>
                    {proximoExame.preparo && (
                      <div className="preparo-box">
                        <strong>⚠️ Recomendações de Preparo:</strong>
                        <p>{proximoExame.preparo}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="spotlight-actions">
                  <button
                    className="btn-cancel-outline"
                    onClick={() => cancelAgendamento(proximoExame.id_agendamento || proximoExame.id)}
                  >
                    Cancelar Agendamento
                  </button>
                  <Link to="/agendamentos" className="btn-brand-primary">
                    Ver Detalhes do Exame
                  </Link>
                </div>
              </div>
            ) : (
              <div className="empty-spotlight">
                <div className="empty-icon">🩺</div>
                <h3>Nenhum exame agendado no momento</h3>
                <p>Mantenha seus exames de rotina em dia. Escolha o exame e agende em poucos cliques.</p>
                <Link to="/exames" className="btn-brand-primary" style={{ marginTop: '16px' }}>
                  Agendar Exame Agora
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="side-panel">
            <div className="quick-actions-card">
              <h3>Ações Rápidas</h3>
              <div className="actions-list">
                <Link to="/exames" className="action-item">
                  <span className="action-icon">🩸</span>
                  <div>
                    <strong>Exame de Sangue</strong>
                    <small>Hemograma, Glicemia e outros</small>
                  </div>
                </Link>

                <Link to="/exames" className="action-item">
                  <span className="action-icon">🦴</span>
                  <div>
                    <strong>Exame de Imagem</strong>
                    <small>Raio-X, Ultrassom e Tomografia</small>
                  </div>
                </Link>

                <Link to="/agendamentos" className="action-item">
                  <span className="action-icon">📋</span>
                  <div>
                    <strong>Histórico de Exames</strong>
                    <small>Consulte agendamentos anteriores</small>
                  </div>
                </Link>
              </div>
            </div>

            <div className="health-tips-card">
              <h3>💡 Dica de Saúde</h3>
              <p>
                Lembre-se de levar documento oficial com foto e a carteira do seu plano no dia do exame!
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
