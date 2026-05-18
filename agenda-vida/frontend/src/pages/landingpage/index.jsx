import Header from "../../components/header/header";
import "./landingpage.css";
import Imagem from '../../assets/logo1.png'



export default function LandingPage(){
    return(
        <>
        <Header />
        <section className="hero">

    <div className="hero-content">

        <h1>
            Organize sua rotina com o
            <span> AgendaVida</span>
        </h1>

        <p>
            Controle exames, consultas e agendamentos
            em um único lugar de forma simples e rápida.
        </p>

        <div className="hero-buttons">

            <button className="btn-primary">
                Começar
            </button>

            <button className="btn-secondary">
                Saiba Mais
            </button>

        </div>

    </div>

    <div className="hero-image">

        <img className="imagem" src={Imagem} alt="Mockup do sistema" />

    </div>

</section>
        </>
    )
}