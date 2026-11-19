import { useState } from "react";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./exame.css";

const EXAMES_CATALOGO = [
  {
    nome: "Hemograma Completo",
    categoria: "Sangue",
    icon: "🩸",
    descricao: "Avaliação quantitativa e qualitativa dos elementos figurados do sangue.",
    preparo: "Jejum de 8 a 12 horas. Bebidas alcoólicas devem ser evitadas 24h antes."
  },
  {
    nome: "Raio-X de Tórax",
    categoria: "Imagem",
    icon: "🦴",
    descricao: "Exame radiológico para análise de pulmões, coração e estrutura óssea.",
    preparo: "Remover correntes, colares, sutiãs com aro e objetos metálicos do tórax."
  },
  {
    nome: "Ultrassom Abdominal Total",
    categoria: "Imagem",
    icon: "📡",
    descricao: "Avaliação detalhada dos órgãos abdominais internos como fígado, rins e vesícula.",
    preparo: "Jejum alimentar de 6h e tomar 4 copos de água 1h antes sem urinar."
  },
  {
    nome: "Ressonância Magnética",
    categoria: "Imagem",
    icon: "🧠",
    descricao: "Imagens de altíssima definição para diagnóstico neurológico, muscular e articular.",
    preparo: "Retirar piercings, brincos e objetos metálicos. Jejum de 4h se houver uso de contraste."
  },
  {
    nome: "Ecocardiograma com Doppler",
    categoria: "Cardiologia",
    icon: "🫀",
    descricao: "Ultrassonografia do coração que analisa fluxo sanguíneo e válvulas cardíacas.",
    preparo: "Não necessita jejum. Trazer exames anteriores do coração se houver."
  },
  {
    nome: "Mamografia Digital",
    categoria: "Especializados",
    icon: "🌸",
    descricao: "Exame de imagem essencial para prevenção e rastreamento mamário.",
    preparo: "Não utilizar desodorante, talco ou cremes na região das axilas e mamas no dia."
  },
  {
    nome: "Glicemia em Jejum",
    categoria: "Sangue",
    icon: "🧪",
    descricao: "Mede a concentração de açúcar no sangue para rastreamento de diabetes.",
    preparo: "Jejum absoluto de 8 horas. Água mineral é permitida."
  },
  {
    nome: "Tomografia Computadorizada",
    categoria: "Imagem",
    icon: "⚡",
    descricao: "Cortes tomográficos tridimensionais detalhados de estruturas corporais.",
    preparo: "Jejum de 4 a 6 horas. Informar histórico de alergias a medicamentos/contraste."
  }
];

export default function SelecaoExame() {
  const navigate = useNavigate();
  const { updateDraft } = useApp();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [customExam, setCustomExam] = useState("");

  function selecionarExame(exameItem) {
    updateDraft({
      exame: exameItem.nome,
      categoria: exameItem.categoria,
      preparo: exameItem.preparo
    });
    navigate("/exames/cadastro");
  }

  function handleCustomSubmit(e) {
    e.preventDefault();
    if (!customExam.trim()) return;

    updateDraft({
      exame: customExam.trim(),
      categoria: "Personalizado",
      preparo: "Apresentar pedido médico original no dia do exame."
    });
    navigate("/exames/cadastro");
  }

  const examesFiltrados = EXAMES_CATALOGO.filter((item) => {
    if (activeCategory !== "Todos" && item.categoria !== activeCategory) return false;
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      return (
        item.nome.toLowerCase().includes(term) ||
        item.descricao.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <>
      <Header />

      <main className="wizard-page page-container">
        {/* Wizard Step Progress */}
        <div className="wizard-progress">
          <div className="progress-step active">
            <span className="step-num">1</span>
            <span className="step-label">Exame</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="step-num">2</span>
            <span className="step-label">Dados</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="step-num">3</span>
            <span className="step-label">Local</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="step-num">4</span>
            <span className="step-label">Data e Hora</span>
          </div>
        </div>

        <header className="page-header text-center">
          <h1>Selecione o Exame Desejado</h1>
          <p>Escolha um dos exames mais comuns ou busque por um exame específico</p>
        </header>

        {/* Filter & Search Bar */}
        <div className="exam-filter-bar">
          <div className="exam-search-input">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Digite o nome do exame que procura..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-pills">
            {["Todos", "Sangue", "Imagem", "Cardiologia", "Especializados"].map((cat) => (
              <button
                key={cat}
                className={`pill-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Exams Grid */}
        <div className="cards-container">
          {examesFiltrados.map((item, idx) => (
            <div
              key={idx}
              className="exame-card"
              onClick={() => selecionarExame(item)}
            >
              <div className="exame-card-icon">{item.icon}</div>
              <span className="exame-cat-tag">{item.categoria}</span>
              <h2>{item.nome}</h2>
              <p>{item.descricao}</p>
              <button className="btn-select-exame">Selecionar Exame →</button>
            </div>
          ))}
        </div>

        {/* Custom Exam Fallback */}
        <div className="custom-exam-box">
          <div className="custom-exam-text">
            <h3>Não encontrou seu exame na lista?</h3>
            <p>Digite o nome do exame indicado pela sua prescrição médica:</p>
          </div>
          <form className="custom-exam-form" onSubmit={handleCustomSubmit}>
            <input
              type="text"
              placeholder="Ex: Cintilografia Óssea, Holter 24h..."
              value={customExam}
              onChange={(e) => setCustomExam(e.target.value)}
              required
            />
            <button type="submit" className="btn-brand-primary">
              Prosseguir com esse Exame
            </button>
          </form>
        </div>
      </main>
    </>
  );
}