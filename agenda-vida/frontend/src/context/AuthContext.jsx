import { createContext, useContext, useState, useEffect } from "react"
import api from "../services/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("agendavida_user")
    return saved ? JSON.parse(saved) : null
  })
  const [carregando, setCarregando] = useState(false)

  // Mantém localStorage sincronizado com o estado
  useEffect(() => {
    if (user) {
      localStorage.setItem("agendavida_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("agendavida_user")
    }
  }, [user])

  // ─── Login ────────────────────────────────────────────────────────────────
  async function login(email, senha) {
    setCarregando(true)
    try {
      const { data } = await api.post("/auth/login", { email, senha })
      localStorage.setItem("agendavida_token", data.token)
      setUser(data.usuario)
      return { sucesso: true, usuario: data.usuario }
    } catch (err) {
      const mensagem = err.response?.data?.erro || "Erro ao fazer login."
      return { sucesso: false, erro: mensagem }
    } finally {
      setCarregando(false)
    }
  }

  // ─── Cadastro de Cliente ──────────────────────────────────────────────────
  async function registrarCliente(dados) {
    setCarregando(true)
    try {
      const { data } = await api.post("/auth/register", dados)
      localStorage.setItem("agendavida_token", data.token)
      setUser(data.usuario)
      return { sucesso: true, usuario: data.usuario }
    } catch (err) {
      const mensagem = err.response?.data?.erro || "Erro ao criar conta."
      return { sucesso: false, erro: mensagem }
    } finally {
      setCarregando(false)
    }
  }

  // ─── Cadastro de Instituição ──────────────────────────────────────────────
  async function registrarInstituicao(dados) {
    setCarregando(true)
    try {
      const { data } = await api.post("/auth/register/instituicao", dados)
      localStorage.setItem("agendavida_token", data.token)
      setUser(data.usuario)
      return { sucesso: true, usuario: data.usuario }
    } catch (err) {
      const mensagem = err.response?.data?.erro || "Erro ao cadastrar instituição."
      return { sucesso: false, erro: mensagem }
    } finally {
      setCarregando(false)
    }
  }

  // ─── Logout ───────────────────────────────────────────────────────────────
  function logout() {
    localStorage.removeItem("agendavida_token")
    localStorage.removeItem("agendavida_user")
    setUser(null)
  }

  const isLoggedIn = !!user
  const isCliente = user?.tipo === "cliente"
  const isInstituicao = user?.tipo === "instituicao"

  return (
    <AuthContext.Provider
      value={{
        user,
        carregando,
        isLoggedIn,
        isCliente,
        isInstituicao,
        login,
        registrarCliente,
        registrarInstituicao,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
