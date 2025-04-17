CREATE TABLE Usuario (
    id_usu INT AUTO_INCREMENT PRIMARY KEY,
    tipo_usu VARCHAR(20),
    nome VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(20),
    criado_em DATETIME,
    telefone VARCHAR(15),
);

CREATE TABLE Mensagens (
    id_mens INT AUTO_INCREMENT PRIMARY KEY,
    id_remetente INT,
    id_destinatario INT,
    data_hora DATETIME,
    texto TEXT,
    status BOOLEAN,
    FOREIGN KEY (id_remetente) REFERENCES Usuario(id_usu),
    FOREIGN KEY (id_destinatario) REFERENCES Usuario(id_usu)
);

CREATE TABLE Locais_Irrigacao (
    id_loc_irriga INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    status BOOLEAN,
    id_usu INT,
    FOREIGN KEY (id_usu) REFERENCES Usuario(id_usu)
);

CREATE TABLE Configuracoes (
    id_config INT AUTO_INCREMENT PRIMARY KEY,
    id_loc_irriga INT,
    umid_min FLOAT,
    umid_max FLOAT,
    temp_max FLOAT,
    criado_em DATETIME,
    FOREIGN KEY (id_loc_irriga) REFERENCES Locais_Irrigacao(id_loc_irriga)
);

CREATE TABLE Sensor (
    id_sensor INT AUTO_INCREMENT PRIMARY KEY,
    id_loc_irriga INT,
    tipo_sensor VARCHAR(50),
    FOREIGN KEY (id_loc_irriga) REFERENCES Locais_Irrigacao(id_loc_irriga)
);

CREATE TABLE Leitura (
    id_leitura INT AUTO_INCREMENT PRIMARY KEY,
    id_sensor INT,
    valor FLOAT,
    status VARCHAR(20),
    data_hora DATETIME,
    FOREIGN KEY (id_sensor) REFERENCES Sensor(id_sensor)
);

