import { useState } from "react"
import Header from "../../components/header/header"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import "./login.css"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, carregando } = useAuth()

  const [tipo, setTipo] = useState("cliente") // 'cliente' | 'instituicao'
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")

  // Redireciona para a página de onde veio (ou dashboard padrão)
  const from = location.state?.from?.pathname

  async function entrar(e) {
    e.preventDefault()
    setErro("")

    if (!email || !senha) {
      setErro("Por favor, preencha o e-mail e a senha.")
      return
    }

    const resultado = await login(email, senha)

    if (!resultado.sucesso) {
      setErro(resultado.erro)
      return
    }

    const tipoUsuario = resultado.usuario.tipo
    if (from && from !== "/login") {
      navigate(from, { replace: true })
    } else if (tipoUsuario === "instituicao") {
      navigate("/instituicao/painel", { replace: true })
    } else {
      navigate("/dashboard", { replace: true })
    }
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

            {/* Seletor de tipo */}
            <div className="tipo-selector">
              <button
                type="button"
                className={`tipo-btn ${tipo === "cliente" ? "active" : ""}`}
                onClick={() => setTipo("cliente")}
              >
                👤 Sou Paciente
              </button>
              <button
                type="button"
                className={`tipo-btn ${tipo === "instituicao" ? "active" : ""}`}
                onClick={() => setTipo("instituicao")}
              >
                🏥 Sou Instituição
              </button>
            </div>

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

              <button type="submit" className="btn-submit-auth" disabled={carregando}>
                {carregando ? "Entrando..." : "Entrar na Conta"}
              </button>
            </form>

            <div className="cadastro-link">
              <p>
                Ainda não possui conta?{" "}
                {tipo === "cliente"
                  ? <Link to="/cadastro">Criar Conta de Paciente</Link>
                  : <Link to="/cadastro/instituicao">Cadastrar Instituição</Link>
                }
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
