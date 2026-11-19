import { useState } from "react";
import Header from "../../components/header/header";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar(e) {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Por favor, preencha o e-mail e a senha.");
      return;
    }

    login(email, senha);
    navigate("/dashboard");
  }

  function preencherDemo() {
    setEmail("maria.silva@email.com");
    setSenha("123456");
    setErro("");
  }

  return (
    <>
      <Header />

      <main className="login-wrapper">
        <section className="login-container">
          <div className="login-card">
            <div className="login-icon">🔒</div>
            <h1>Acessar Conta</h1>
            <p>Entre para gerenciar seus exames e agendamentos</p>

            {erro && <div className="auth-error-banner">{erro}</div>}

            <form className="login-form" onSubmit={entrar}>
              <div className="form-group">
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Sua senha secreta"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit-auth">
                Entrar na Conta
              </button>
            </form>

            <div className="demo-box">
              <p>Quer testar rapidamente?</p>
              <button type="button" className="btn-demo" onClick={preencherDemo}>
                Preencher Usuário Demo
              </button>
            </div>

            <div className="cadastro-link">
              <p>
                Ainda não possui conta?
                <Link to="/cadastro"> Criar Conta Grátis</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}