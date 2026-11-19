import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const INITIAL_AGENDAMENTOS = [
  {
    id: "AGD-1092",
    exame: "Hemograma Completo",
    categoria: "Sangue",
    convenio: "Unimed",
    local: "Laboratório Vida",
    endereco: "Avenida Brasil, 450 - Centro",
    data: "2026-09-28",
    hora: "08:30",
    status: "Confirmado",
    observacoes: "Levar documento oficial com foto e carteira do convênio.",
    preparo: "Jejum obrigatório de 8 horas. Evitar consumo de bebidas alcoólicas nas 24h anteriores.",
    criadoEm: "2026-09-20T10:00:00"
  },
  {
    id: "AGD-1085",
    exame: "Ressonância Magnética de Crânio",
    categoria: "Imagem",
    convenio: "Bradesco Saúde",
    local: "Hospital Central",
    endereco: "Rua Principal, 120 - Bairro da Saúde",
    data: "2026-10-05",
    hora: "14:00",
    status: "Confirmado",
    observacoes: "Chegar com 20 minutos de antecedência.",
    preparo: "Retirar todos os objetos metálicos (brincos, colares, piercings). Jejum de 4h se houver contraste.",
    criadoEm: "2026-09-18T14:30:00"
  },
  {
    id: "AGD-1040",
    exame: "Ultrassom Abdominal Total",
    categoria: "Imagem",
    convenio: "SUS",
    local: "Clínica Saúde+",
    endereco: "Rua das Flores, 89 - Jardim Paulista",
    data: "2026-08-15",
    hora: "10:15",
    status: "Concluído",
    observacoes: "Resultado já disponível no portal.",
    preparo: "Tomar 4 copos de água 1h antes do exame e não urinar.",
    criadoEm: "2026-08-01T09:12:00"
  },
  {
    id: "AGD-1012",
    exame: "Raio-X de Tórax",
    categoria: "Imagem",
    convenio: "Particular",
    local: "Centro Médico São Lucas",
    endereco: "Alameda dos Anjos, 300 - Vila Nova",
    data: "2026-07-10",
    hora: "11:00",
    status: "Concluído",
    observacoes: "Exame de rotina anual.",
    preparo: "Não necessita preparo prévio especial.",
    criadoEm: "2026-07-01T16:00:00"
  }
];

const DEFAULT_USER = {
  nome: "Maria Silva",
  email: "maria.silva@email.com",
  cpf: "123.456.789-00",
  telefone: "(11) 98765-4321",
  isLoggedIn: true
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("agendavida_user");
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [agendamentos, setAgendamentos] = useState(() => {
    const saved = localStorage.getItem("agendavida_agendamentos");
    return saved ? JSON.parse(saved) : INITIAL_AGENDAMENTOS;
  });

  const [draft, setDraft] = useState(() => {
    const saved = localStorage.getItem("agendavida_draft");
    return saved ? JSON.parse(saved) : {
      exame: "",
      categoria: "",
      convenio: "SUS",
      observacoes: "",
      local: "",
      endereco: "",
      data: "",
      hora: "",
      preparo: ""
    };
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("agendavida_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("agendavida_agendamentos", JSON.stringify(agendamentos));
  }, [agendamentos]);

  useEffect(() => {
    localStorage.setItem("agendavida_draft", JSON.stringify(draft));
  }, [draft]);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const login = (email, senha) => {
    const loggedUser = {
      nome: email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase()) || "Usuário",
      email: email,
      cpf: "123.456.789-00",
      telefone: "(11) 99999-8888",
      isLoggedIn: true
    };
    setUser(loggedUser);
    showToast(`Bem-vindo(a) de volta, ${loggedUser.nome}!`);
    return true;
  };

  const register = (userData) => {
    const newUser = {
      nome: userData.nome || "Novo Usuário",
      email: userData.email,
      cpf: userData.cpf || "000.000.000-00",
      telefone: userData.telefone || "(11) 90000-0000",
      isLoggedIn: true
    };
    setUser(newUser);
    showToast("Conta criada com sucesso! Seja bem-vindo(a).");
    return true;
  };

  const logout = () => {
    setUser({ nome: "", email: "", isLoggedIn: false });
    showToast("Você saiu da sua conta.", "info");
  };

  const updateDraft = (newData) => {
    setDraft(prev => ({ ...prev, ...newData }));
  };

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
      preparo: ""
    };
    setDraft(emptyDraft);
    localStorage.removeItem("agendavida_draft");
  };

  const addAgendamento = (agendamentoData) => {
    const newId = `AGD-${Math.floor(1000 + Math.random() * 9000)}`;
    const novo = {
      id: newId,
      exame: agendamentoData.exame || draft.exame || "Exame Geral",
      categoria: agendamentoData.categoria || draft.categoria || "Geral",
      convenio: agendamentoData.convenio || draft.convenio || "SUS",
      local: agendamentoData.local || draft.local || "Hospital Central",
      endereco: agendamentoData.endereco || draft.endereco || "Rua Principal, 120",
      data: agendamentoData.data || draft.data || "2026-10-01",
      hora: agendamentoData.hora || draft.hora || "09:00",
      status: "Confirmado",
      observacoes: agendamentoData.observacoes || draft.observacoes || "Nenhuma observação especial.",
      preparo: agendamentoData.preparo || draft.preparo || "Chegar com 15 minutos de antecedência apresentando documento com foto.",
      criadoEm: new Date().toISOString()
    };

    setAgendamentos(prev => [novo, ...prev]);
    clearDraft();
    showToast(`Exame ${novo.exame} agendado com sucesso! (Código: ${novo.id})`);
    return novo;
  };

  const cancelAgendamento = (id) => {
    setAgendamentos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: "Cancelado" } : item
      )
    );
    showToast("Agendamento cancelado com sucesso.", "warning");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        agendamentos,
        draft,
        toast,
        login,
        register,
        logout,
        updateDraft,
        clearDraft,
        addAgendamento,
        cancelAgendamento,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro de um AppProvider");
  }
  return context;
}
