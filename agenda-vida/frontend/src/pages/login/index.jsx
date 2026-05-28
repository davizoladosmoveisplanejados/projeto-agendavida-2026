import Header from "../../components/header/header";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {

    const navigate = useNavigate();

    function entrar(e){
        e.preventDefault();

        // depois você coloca validação/API aqui

        navigate("/dashboard");
    }

    return (
        <>
            <Header />

            <section className="login-container">

                <div className="login-card">

                    <h1>Entrar</h1>

                    <p>
                        Entre para acessar sua conta
                    </p>

                    <form className="login-form" onSubmit={entrar}>

                        <input
                            type="email"
                            placeholder="Email"
                        />

                        <input
                            type="password"
                            placeholder="Senha"
                        />

                        <button type="submit">
                            Entrar
                        </button>

                    </form>

                    <div className="cadastro-link">
                        <p>
                            Ainda não possui conta?
                            <Link to="/cadastro"> Cadastrar</Link>
                        </p>
                    </div>

                </div>

            </section>
        </>
    )
}