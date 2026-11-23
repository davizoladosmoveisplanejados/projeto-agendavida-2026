import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useAuth } from "./AuthContext"
import api from "../services/api"

const AppContext = createContext()

export function AppProvider({ children }) {
  const { user, isLoggedIn } = useAuth()

  const [agendamentos, setAgendamentos] = useState([])
  const [carregandoAgendamentos, setCarregandoAgendamentos] = useState(false)

  const [draft, setDraft] = useState(() => {
    const saved = localStorage.getItem("agendavida_draft")
    return saved ? JSON.parse(saved) : {
      exame: "",
      categoria: "",
      convenio: "SUS",
      observacoes: "",
      local: "",
      endereco: "",
      data: "",
      hora: "",
      preparo: "",
      id_horario: null
    }
  })

  const [toast, setToast] = useState(null)

  // ─── Toast ──────────────────────────────────────────────────────────────
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 4000)
  }, [])

  // ─── Busca agendamentos do usuário logado na API ─────────────────────────
  const carregarAgendamentos = useCallback(async () => {
    if (!isLoggedIn) return
    setCarregandoAgendamentos(true)
    try {
      const { data } = await api.get("/meus-agendamentos")
      setAgendamentos(data)
    } catch (err) {
      console.error("Erro ao carregar agendamentos:", err)
    } finally {
      setCarregandoAgendamentos(false)
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      carregarAgendamentos()
    } else {
      setAgendamentos([])
    }
  }, [isLoggedIn, carregarAgendamentos])

  // ─── Draft ───────────────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("agendavida_draft", JSON.stringify(draft))
  }, [draft])

  const updateDraft = (newData) => {
    setDraft(prev => ({ ...prev, ...newData }))
  }

  const clearDraft = () => {
    const emptyDraft = {
      exame: "",
      categoria: "",
      convenio: "SUS",
      observacoes: "",
      local: "",
      endereco: "",
      data: "",
      hora: "",
      preparo: "",
      id_horario: null
    }
    setDraft(emptyDraft)
    localStorage.removeItem("agendavida_draft")
  }

  // ─── Criar agendamento via API ───────────────────────────────────────────
  const addAgendamento = async (agendamentoData) => {
    try {
      const payload = {
        id_usuario: user?.id,
        id_horario: agendamentoData.id_horario || draft.id_horario,
        data_agendamento: agendamentoData.data || draft.data,
        // campos extras para exibição local enquanto API não retorna join completo
        _exame: agendamentoData.exame || draft.exame,
        _local: agendamentoData.local || draft.local,
        _hora: agendamentoData.hora || draft.hora
      }

      // Se não tiver id_horario real (fluxo ainda mock), usa endpoint simplificado
      if (!payload.id_horario) {
        // Fallback: cria registro local e mostra toast
        const novoLocal = {
          id_agendamento: `AGD-${Math.floor(1000 + Math.random() * 9000)}`,
          nome_exame: agendamentoData.exame || draft.exame,
          local: agendamentoData.local || draft.local,
          data_agendamento: agendamentoData.data || draft.data,
          hora: agendamentoData.hora || draft.hora,
          status: true,
          _isMock: true
        }
        setAgendamentos(prev => [novoLocal, ...prev])
        clearDraft()
        showToast(`Exame ${novoLocal.nome_exame} agendado com sucesso!`)
        return novoLocal
      }

      const { data } = await api.post("/agendamentos", {
        id_usuario: payload.id_usuario,
        id_horario: payload.id_horario,
        data_agendamento: payload.data_agendamento
      })

      clearDraft()
      await carregarAgendamentos()
      showToast(`Exame agendado com sucesso! (Código: ${data.id_agendamento})`)
      return data
    } catch (err) {
      const msg = err.response?.data?.erro || "Erro ao criar agendamento."
      showToast(msg, "error")
      throw err
    }
  }

  // ─── Cancelar agendamento via API ────────────────────────────────────────
  const cancelAgendamento = async (id) => {
    try {
      // Suporte a ids reais (numérico) e ids mock (AGD-XXXX)
      if (String(id).startsWith("AGD-")) {
        setAgendamentos(prev =>
          prev.map(item =>
            item.id_agendamento === id ? { ...item, status: false } : item
          )
        )
        showToast("Agendamento cancelado.", "warning")
        return
      }
      await api.patch(`/agendamentos/${id}/cancelar`)
      await carregarAgendamentos()
      showToast("Agendamento cancelado com sucesso.", "warning")
    } catch (err) {
      showToast("Erro ao cancelar agendamento.", "error")
    }
  }

  return (
    <AppContext.Provider
      value={{
        agendamentos,
        carregandoAgendamentos,
        draft,
        toast,
        updateDraft,
        clearDraft,
        addAgendamento,
        cancelAgendamento,
        carregarAgendamentos,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp deve ser usado dentro de um AppProvider")
  }
  return context
}
