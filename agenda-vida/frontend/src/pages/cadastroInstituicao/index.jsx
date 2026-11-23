import { useState } from "react"
import Header from "../../components/header/header"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import "../cadastro/cadastro.css"

export default function CadastroInstituicao() {
  const navigate = useNavigate()
  const { registrarInstituicao, carregando } = useAuth()

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [telefone, setTelefone] = useState("")
  const [endereco, setEndereco] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [erro, setErro] = useState("")

  async function cadastrar(e) {
    e.preventDefault()
    setErro("")

    if (!nome || !email || !telefone || !endereco || !senha) {
      setErro("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.")
      return
    }

    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.")
      return
    }

    const resultado = await registrarInstituicao({ nome, email, cnpj, telefone, endereco, senha })

    if (!resultado.sucesso) {
      setErro(resultado.erro)
      return
    }

    navigate("/instituicao/painel")
  }

  return (
    <>
      <Header />

      <main className="cadastro-wrapper">
        <section className="cadastro-container">
          <div className="cadastro-card">
            <div className="cadastro-icon">🏥</div>
            <h1>Cadastrar Instituição</h1>
            <p>Registre sua clínica, laboratório ou hospital no AgendaVida</p>

            {erro && <div className="auth-error-banner">{erro}</div>}

            <form className="cadastro-form" onSubmit={cadastrar}>
              <div className="form-group">
                <label>Nome da Instituição *</label>
                <input
                  type="text"
                  placeholder="Ex: Laboratório Vida"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>E-mail de Acesso *</label>
                <input
                  type="email"
                  placeholder="contato@instituicao.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>CNPJ</label>
                  <input
                    type="text"
                    placeholder="00.000.000/0001-00"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Telefone / WhatsApp *</label>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Endereço Completo *</label>
                <input
                  type="text"
                  placeholder="Ex: Av. Brasil, 450 - Centro, São Paulo/SP"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                />
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

              <button type="submit" className="btn-submit-auth" disabled={carregando}>
                {carregando ? "Cadastrando..." : "Cadastrar Instituição"}
              </button>
            </form>

            <div className="login-link">
              <p>
                Já tem conta? <Link to="/login">Fazer Login</Link>
              </p>
              <p>
                É paciente? <Link to="/cadastro">Criar conta de paciente</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
