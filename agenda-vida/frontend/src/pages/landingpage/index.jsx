import Header from "../../components/header/header";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./landingpage.css";
import Imagem from '../../assets/logo1.png';

export default function LandingPage() {
  const { user } = useApp();

  return (
    <>
      <Header />

      <main className="landing-wrapper">
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">✨ Saúde & Agendamento Digital</span>
            <h1>
              Organize sua rotina de exames com o <span>AgendaVida</span>
            </h1>

            <p>
              Agende exames laboratoriais e de imagem em clínicas parceiras, 
              acompanhe prazos e mantenha seu histórico médico em um único lugar.
            </p>

            <div className="hero-buttons">
              <Link 
                to={user.isLoggedIn ? "/exames" : "/cadastro"} 
                className="btn-primary-landing"
              >
                {user.isLoggedIn ? "Agendar Exame Agora" : "Criar Conta Grátis"}
              </Link>

              <Link 
                to={user.isLoggedIn ? "/dashboard" : "/login"} 
                className="btn-secondary-landing"
              >
                {user.isLoggedIn ? "Acessar Meu Painel" : "Já possuo uma conta"}
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-frame">
              <img className="imagem" src={Imagem} alt="AgendaVida Sistema" />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-card">
              <h3>+50 mil</h3>
              <p>Exames Agendados</p>
            </div>
            <div className="stat-card">
              <h3>120+</h3>
              <p>Clínicas & Laboratórios</p>
            </div>
            <div className="stat-card">
              <h3>99.4%</h3>
              <p>Satisfação dos Pacientes</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Agendamento Online</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="steps-section">
          <div className="section-header">
            <h2>Como Funciona</h2>
            <p>Agendar seus exames com o AgendaVida é simples, seguro e rápido</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🔬</div>
              <h3>Escolha o Exame</h3>
              <p>Selecione entre exames de sangue, imagem, ultrassom, cardiologia e muito mais.</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🏥</div>
              <h3>Selecione o Local</h3>
              <p>Escolha o laboratório ou clínica mais próximo com o melhor horário para você.</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">📅</div>
              <h3>Confirme & Acompanhe</h3>
              <p>Receba confirmação instantânea, lembretes e acesse o histórico completo.</p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="cta-banner">
          <div className="cta-content">
            <h2>Pronto para cuidar da sua saúde com facilidade?</h2>
            <p>Junte-se a milhares de pacientes que simplificaram seus agendamentos médicos.</p>
            <Link to="/exames" className="btn-cta">
              Começar Agendamento
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}