import { useState } from "react";
import Header from "../../components/header/header";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();
  const { register } = useApp();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  function cadastrar(e) {
    e.preventDefault();
    if (!nome || !email || !senha) {
      setErro("Por favor, preencha os campos obrigatórios.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    register({ nome, email, cpf, telefone });
    navigate("/dashboard");
  }

  return (
    <>
      <Header />

      <main className="cadastro-wrapper">
        <section className="cadastro-container">
          <div className="cadastro-card">
            <div className="cadastro-icon">📝</div>
            <h1>Criar Conta</h1>
            <p>Preencha seus dados para começar a usar o AgendaVida</p>

            {erro && <div className="auth-error-banner">{erro}</div>}

            <form className="cadastro-form" onSubmit={cadastrar}>
              <div className="form-group">
                <label>Nome Completo *</label>
                <input
                  type="text"
                  placeholder="Ex: Maria Silva Santos"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>E-mail *</label>
                <input
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>CPF</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Telefone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Senha *</label>
                  <input
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirmar Senha *</label>
                  <input
                    type="password"
                    placeholder="Repita sua senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit-auth">
                Cadastrar e Acessar
              </button>
            </form>

            <div className="login-link">
              <p>
                Já possui uma conta?
                <Link to="/login"> Fazer Login</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}