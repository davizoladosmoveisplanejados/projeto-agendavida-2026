CREATE TABLE INSTITUICAO (
    id_instituicao SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL UNIQUE -- Alterado para VARCHAR para evitar erro de limite de dígitos
);
CREATE TABLE USUARIO (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,      -- Alterado para VARCHAR
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL UNIQUE, -- Alterado para VARCHAR
    senha VARCHAR(255) NOT NULL
);
CREATE TABLE EXAME (
    id_exame SERIAL PRIMARY KEY,
    nome_exame VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    id_instituicao INTEGER NOT NULL,
    CONSTRAINT fk_instituicao FOREIGN KEY (id_instituicao) 
        REFERENCES INSTITUICAO(id_instituicao) ON DELETE CASCADE
);
CREATE TABLE HORARIO (
    id_horario SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    hora TIMESTAMP NOT NULL,
    disponibilidade BOOLEAN NOT NULL DEFAULT TRUE,
    id_exame INTEGER NOT NULL,
    CONSTRAINT fk_exame FOREIGN KEY (id_exame) 
        REFERENCES EXAME(id_exame) ON DELETE CASCADE
);
CREATE TABLE AGENDAMENTO (
    id_agendamento SERIAL PRIMARY KEY,
    data_agendamento DATE NOT NULL DEFAULT CURRENT_DATE,
    status BOOLEAN NOT NULL,
    id_usuario INTEGER NOT NULL,
    id_horario INTEGER NOT NULL,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) 
        REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_horario FOREIGN KEY (id_horario) 
        REFERENCES HORARIO(id_horario) ON DELETE CASCADE
);
SELECT * FROM AGENDAVIDA