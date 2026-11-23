import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

/**
 * Protege rotas que exigem autenticação.
 * - tiposPermitidos: array de tipos que podem acessar ('cliente', 'instituicao').
 *   Se omitido, qualquer usuário autenticado pode acessar.
 * - redirectTo: para onde redirecionar se não autenticado (padrão: /login)
 */
export default function ProtectedRoute({ children, tiposPermitidos, redirectTo = "/login" }) {
  const { isLoggedIn, user } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (tiposPermitidos && !tiposPermitidos.includes(user?.tipo)) {
    // Usuário está logado mas não tem permissão: redireciona para o dashboard certo
    const destino = user?.tipo === "instituicao" ? "/instituicao/painel" : "/dashboard"
    return <Navigate to={destino} replace />
  }

  return children
}
