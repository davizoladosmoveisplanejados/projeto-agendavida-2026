import { useState, useEffect } from "react"
import Header from "../../components/header/header"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import api from "../../services/api"
import "./painelInstituicao.css"

export default function PainelInstituicao() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [agendamentos, setAgendamentos] = useState([])
  const [exames, setExames] = useState([])
  const [horarios, setHorarios] = useState([])
  const [aba, setAba] = useState("agendamentos")
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregar() {
      setCarregando(true)
      try {
        const [resAg, resEx] = await Promise.all([
          api.get("/agendamentos"),
          api.get("/exames")
        ])
        setAgendamentos(resAg.data)
        setExames(resEx.data)
      } catch (err) {
        console.error("Erro ao carregar dados:", err)
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [])

  function handleLogout() {
    logout()
    navigate("/login")
  }

  const totalAtivos = agendamentos.filter(a => a.status === true).length
  const totalCancelados = agendamentos.filter(a => a.status === false).length

  return (
    <>
      <Header />

      <main className="painel-page page-container">
        {/* Banner de boas-vindas */}
        <section className="welcome-banner">
          <div className="welcome-text">
            <h1>Painel da Instituição 🏥</h1>
            <p>Bem-vindo(a), <strong>{user?.nome}</strong>. Gerencie seus exames e agendamentos.</p>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Sair da Conta
          </button>
        </section>

        {/* Cards de resumo */}
        <section className="stats-grid">
          <div className="dash-stat-card">
            <div className="stat-icon icon-blue">📅</div>
            <div className="stat-info">
              <h3>{totalAtivos}</h3>
              <p>Agendamentos Ativos</p>
            </div>
          </div>
          <div className="dash-stat-card">
            <div className="stat-icon icon-red">❌</div>
            <div className="stat-info">
              <h3>{totalCancelados}</h3>
              <p>Cancelados</p>
            </div>
          </div>
          <div className="dash-stat-card">
            <div className="stat-icon icon-green">🔬</div>
            <div className="stat-info">
              <h3>{exames.length}</h3>
              <p>Exames Cadastrados</p>
            </div>
          </div>
        </section>

        {/* Abas */}
        <div className="painel-tabs">
          <button
            className={`tab-btn ${aba === "agendamentos" ? "active" : ""}`}
            onClick={() => setAba("agendamentos")}
          >
            📋 Agendamentos
          </button>
          <button
            className={`tab-btn ${aba === "exames" ? "active" : ""}`}
            onClick={() => setAba("exames")}
          >
            🔬 Exames
          </button>
        </div>

        {carregando ? (
          <div className="loading-state">Carregando dados...</div>
        ) : (
          <>
            {aba === "agendamentos" && (
              <section className="painel-section">
                <h2>Todos os Agendamentos</h2>
                {agendamentos.length === 0 ? (
                  <p className="empty-msg">Nenhum agendamento registrado.</p>
                ) : (
                  <div className="painel-table-wrapper">
                    <table className="painel-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Paciente</th>
                          <th>Exame</th>
                          <th>Data</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agendamentos.map(ag => (
                          <tr key={ag.id_agendamento}>
                            <td>{ag.id_agendamento}</td>
                            <td>{ag.usuario?.nome || "—"}</td>
                            <td>{ag.horario?.exame?.nome_exame || "—"}</td>
                            <td>{ag.data_agendamento}</td>
                            <td>
                              <span className={`badge-status ${ag.status ? "confirmado" : "cancelado"}`}>
                                {ag.status ? "Ativo" : "Cancelado"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}

            {aba === "exames" && (
              <section className="painel-section">
                <div className="section-title">
                  <h2>Exames Cadastrados</h2>
                  <Link to="/exames/cadastro" className="btn-brand-primary">
                    + Novo Exame
                  </Link>
                </div>
                {exames.length === 0 ? (
                  <p className="empty-msg">Nenhum exame cadastrado ainda.</p>
                ) : (
                  <div className="painel-table-wrapper">
                    <table className="painel-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nome do Exame</th>
                          <th>Descrição</th>
                          <th>Instituição</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exames.map(ex => (
                          <tr key={ex.id_exame}>
                            <td>{ex.id_exame}</td>
                            <td>{ex.nome_exame}</td>
                            <td>{ex.descricao || "—"}</td>
                            <td>{ex.instituicao?.nome || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </main>
    </>
  )
}
