import Header from "../../components/header/header";
import { Link } from "react-router-dom";
import "./cadastro.css";

export default function Cadastro() {
    return (
        <>
            <Header />

            <section className="cadastro-container">

                <div className="cadastro-card">

                    <h1>Criar Conta</h1>

                    <p>
                        Preencha seus dados para começar a usar o AgendaVida
                    </p>

                    <form className="cadastro-form">

                        <input
                            type="text"
                            placeholder="Nome completo"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                        />

                        <input
                            type="password"
                            placeholder="Senha"
                        />

                        <input
                            type="password"
                            placeholder="Confirmar senha"
                        />

                        <button type="submit">
                            Cadastrar
                        </button>

                    </form>

                    <div className="login-link">
                        <p>
                            Já possui uma conta?
                            <Link to="/login"> Entrar</Link>
                        </p>
                    </div>

                </div>

            </section>
        </>
    );
}