import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "../components/ProtectedRoute"

import LandingPage from "../pages/landingpage"
import Login from "../pages/login"
import Cadastro from "../pages/cadastro"
import CadastroInstituicao from "../pages/cadastroInstituicao"
import Dashboard from "../pages/dashboard"
import Exames from "../pages/exame"
import CadastroExames from "../pages/cadastroExames"
import SelecaoLocal from "../pages/selecaoLocal"
import SelecaoDataHora from "../pages/selecaoDataHora"
import ConfirmacaoExame from "../pages/confirmacaoExame"
import Agendamentos from "../pages/agendamentos"
import PainelInstituicao from "../pages/painelInstituicao"
import NotFound from "../pages/notfound"

export default function Rotas() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/cadastro/instituicao" element={<CadastroInstituicao />} />

      {/* Exames: listagem é pública, fluxo de agendamento exige login de cliente */}
      <Route path="/exames" element={<Exames />} />
      <Route
        path="/exames/cadastro"
        element={
          <ProtectedRoute tiposPermitidos={["cliente"]}>
            <CadastroExames />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exames/local"
        element={
          <ProtectedRoute tiposPermitidos={["cliente"]}>
            <SelecaoLocal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exames/datahora"
        element={
          <ProtectedRoute tiposPermitidos={["cliente"]}>
            <SelecaoDataHora />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exames/confirmacao"
        element={
          <ProtectedRoute tiposPermitidos={["cliente"]}>
            <ConfirmacaoExame />
          </ProtectedRoute>
        }
      />

      {/* Área do cliente */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute tiposPermitidos={["cliente"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agendamentos"
        element={
          <ProtectedRoute tiposPermitidos={["cliente"]}>
            <Agendamentos />
          </ProtectedRoute>
        }
      />

      {/* Área da instituição */}
      <Route
        path="/instituicao/painel"
        element={
          <ProtectedRoute tiposPermitidos={["instituicao"]}>
            <PainelInstituicao />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
