import { Routes, Route } from "react-router-dom";

import LandingPage from '../pages/landingpage';
// import Login from '../pages/login';
// import Cadastro from '../pages/cadastro';
// import Dashboard from '../pages/dashboard';
// import Exames from '../pages/exames';
// import CadastroExame from '../pages/cadastroExame';
// import SelecaoLocal from '../pages/selecaoLocal';
// import SelecaoDataHora from '../pages/selecaoDataHora';
// import ConfirmacaoExame from '../pages/confirmacaoExame';
// import Agendamentos from '../pages/agendamentos';
// // import NotFound from  '../pages/notfound';

export default function Rotas(){
    return(
        <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exames" element={<Exames />} />
            <Route path="/exames/cadastro" element={<CadastroExame />} />
            <Route path="/exames/local" element={<SelecaoLocal />} />
            <Route path="/exames/datahora" element={<SelecaoDataHora />} />
            <Route path="/exames/confirmacao" element={<ConfirmacaoExame />} />
            <Route path="/agendamentos" element={<Agendamentos />} /> */}
            {/* <Route path="*" element={<NotFound />} />   */}
        </Routes>
    )
}