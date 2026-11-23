import axios from "axios"

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  }
})

// ─── Interceptor de Requisição: injeta o token JWT ───────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("agendavida_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Interceptor de Resposta: trata erros globais ────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido: limpa sessão
      localStorage.removeItem("agendavida_token")
      localStorage.removeItem("agendavida_user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api
