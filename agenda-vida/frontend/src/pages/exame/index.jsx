import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import "./exame.css";

export default function SelecaoExame(){

    const navigate = useNavigate();

    function selecionarExame(nomeExame){
        navigate("/exames/cadastro");
    }

    return(
        <>
            <Header/>

            <section className="selecao-container">

                <h1>Selecione um exame</h1>

                <div className="cards-container">

                    <div
                        className="exame-card"
                        onClick={() => selecionarExame("Hemograma")}
                    >
                        <h2>🩸</h2>
                        <h2>Hemograma</h2>
                        <p>Exame de sangue</p>
                    </div>

                    <div
                        className="exame-card"
                        onClick={() => selecionarExame("Raio-X")}
                    >
                        <h2>🦴</h2>
                        <h2>Raio-X</h2>
                        <p>Exame de imagem</p>
                    </div>

                    <div
                        className="exame-card"
                        onClick={() => selecionarExame("Ultrassom")}
                    >
                        <h2>📡</h2>
                        <h2>Ultrassom</h2>
                        <p>Exame por imagem</p>
                    </div>

                    <div
                        className="exame-card"
                        onClick={() => selecionarExame("Ressonância")}
                    >
                        <h2>🧠</h2>
                        <h2>Ressonância</h2>
                        <p>Imagem detalhada</p>
                    </div>

                </div>

            </section>
        </>
    )
}