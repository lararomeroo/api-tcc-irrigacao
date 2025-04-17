-- Inserindo usuários 0,1
INSERT INTO Usuario (tipo_usu, nome, email, senha, criado_em, telefone) VALUES
('tecni', 'João Silva', 'joao@email.com', 'hash123', NOW(), '+5511987654321'),
('clien', 'Maria Oliveira', 'maria@email.com', 'hash456', NOW(), '+5511998765432'),
('clien', 'Carlos Mendes', 'carlos@email.com', 'hash789', NOW(), '+5511976543210'),
('tecni', 'Ana Souza', 'ana@email.com', 'hash321', NOW(), '+5511965432109');

-- Inserindo locais de irrigação
INSERT INTO Locais_Irrigacao (nome, status, id_usu) VALUES
('Horta Principal', TRUE, 1),
('Estufa 1', FALSE, 2),
('Jardim Frontal', TRUE, 3),
('Plantação de Tomates', TRUE, 4);

-- Inserindo sensores
INSERT INTO Sensor (id_loc_irriga, tipo_sensor) VALUES
(1, 'Umidade'),
(1, 'Temperatura'),
(2, 'Umidade'),
(3, 'Temperatura'),
(4, 'Umidade'),
(4, 'Temperatura');

-- Inserindo configurações
INSERT INTO Configuracoes (id_loc_irriga, umid_min, umid_max, temp_max, criado_em) VALUES
(1, 30.0, 70.0, 35.0, NOW()),
(2, 25.0, 65.0, 30.0, NOW()),
(3, 40.0, 80.0, 32.0, NOW()),
(4, 35.0, 75.0, 33.0, NOW());

-- Inserindo leituras
INSERT INTO Leitura (id_sensor, valor, status, data_hora) VALUES
(1, 45.5, 'Normal', NOW()),
(2, 32.0, 'Alerta', NOW()),
(3, 60.2, 'Ótimo', NOW()),
(4, 28.7, 'Baixo', NOW()),
(5, 50.0, 'Ótimo', NOW()),
(6, 37.5, 'Alerta', NOW());

-- Inserindo mensagens
INSERT INTO Mensagens (id_remetente, id_destinatario, data_hora, texto, status) VALUES
(1, 2, NOW(), 'Olá, como está a irrigação?', TRUE),
(2, 1, NOW(), 'Tudo sob controle!', TRUE),
(3, 4, NOW(), 'Precisamos ajustar as configurações.', FALSE),
(4, 3, NOW(), 'O sistema detectou umidade baixa.', TRUE),
(1, 3, NOW(), 'Verifique o sensor de temperatura.', FALSE);

SELECT * FROM usuario;
SELECT * FROM sensor;
SELECT * FROM mensagens;
SELECT * FROM leitura;
SELECT * FROM configuracoes;
SELECT * FROM locais_irrigacao;