import Header from "../../components/header/header";
import "./cadastroExames.css";

export default function CadastroExame() {
    return (
        <>
            <Header />

            <section className="exame-container">

                <div className="exame-card">

                    <h1>Cadastrar Exame</h1>

                    <p>
                        Preencha os dados do exame
                    </p>

                    <form className="exame-form">

                        <input
                            type="text"
                            placeholder="Nome do exame"
                        />

                        <input
                            type="text"
                            placeholder="Local do exame"
                        />

                        <input
                            type="date"
                        />

                        <input
                            type="time"
                        />

                        <textarea
                            placeholder="Observações"
                        ></textarea>

                        <button type="submit">
                            Salvar Exame
                        </button>

                    </form>

                </div>

            </section>
        </>
    )
}