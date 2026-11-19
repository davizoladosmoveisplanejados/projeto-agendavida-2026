import Header from "../../components/header/header";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./dashboard.css";

export default function Dashboard() {
  const { user, agendamentos, cancelAgendamento } = useApp();

  // Find upcoming active appointments
  const proximos = agendamentos.filter(a => a.status === "Confirmado");
  const concluidos = agendamentos.filter(a => a.status === "Concluído");

  const proximoExame = proximos.length > 0 ? proximos[0] : null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <>
      <Header />

      <main className="dashboard-page page-container">
        {/* Welcome Banner */}
        <section className="welcome-banner">
          <div className="welcome-text">
            <h1>Olá, {user.nome || "Paciente"}! 👋</h1>
            <p>Seja bem-vindo(a) ao seu painel de saúde no AgendaVida.</p>
          </div>
          <Link to="/exames" className="btn-brand-primary">
            + Agendar Novo Exame
          </Link>
        </section>

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="dash-stat-card">
            <div className="stat-icon icon-blue">📅</div>
            <div className="stat-info">
              <h3>{proximos.length}</h3>
              <p>Próximos Exames</p>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-icon icon-green">✅</div>
            <div className="stat-info">
              <h3>{concluidos.length}</h3>
              <p>Exames Concluídos</p>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-icon icon-purple">🏥</div>
            <div className="stat-info">
              <h3>4</h3>
              <p>Clínicas Salvas</p>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-icon icon-orange">🔔</div>
            <div className="stat-info">
              <h3>2</h3>
              <p>Lembretes Pendentes</p>
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

            {proximoExame ? (
              <div className="spotlight-card">
                <div className="spotlight-header">
                  <span className="badge-status confirmado">Confirmado</span>
                  <span className="spotlight-date">
                    📅 {formatDate(proximoExame.data)} às ⏱️ {proximoExame.hora}
                  </span>
                </div>

                <div className="spotlight-body">
                  <h3>{proximoExame.exame}</h3>
                  <div className="spotlight-detail">
                    <span>🏥 <strong>Local:</strong> {proximoExame.local}</span>
                    <span>📍 <strong>Endereço:</strong> {proximoExame.endereco}</span>
                    <span>💳 <strong>Convênio:</strong> {proximoExame.convenio}</span>
                  </div>

                  {proximoExame.preparo && (
                    <div className="preparo-box">
                      <strong>⚠️ Recomendações de Preparo:</strong>
                      <p>{proximoExame.preparo}</p>
                    </div>
                  )}
                </div>

                <div className="spotlight-actions">
                  <button 
                    className="btn-cancel-outline"
                    onClick={() => cancelAgendamento(proximoExame.id)}
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

          {/* Quick Actions & Recent */}
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
  );
}
