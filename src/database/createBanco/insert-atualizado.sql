-- Inserção de dados simulados para o sistema de controle de sensores

-- Usuários
INSERT INTO Usuario (tipo_usu, nome, email, senha, criado_em, telefone) VALUES
('Administrador', 'Lara Romero', 'lara.romero@email.com', 'senha123', '2025-10-01 08:00:00', '11999999999'),
('Agricultor', 'João Silva', 'joao.silva@email.com', 'senha456', '2025-10-01 09:00:00', '11988888888'),
('Técnico', 'Maria Julia', 'maria.julia@email.com', 'senha789', '2025-10-01 10:00:00', '11977777777'),
('Agrônomo', 'Carlos Mendes', 'carlos.mendes@email.com', 'senha321', '2025-10-01 11:00:00', '11966666666'),
('Supervisor', 'Ana Paula', 'ana.paula@email.com', 'senha654', '2025-10-01 12:00:00', '11955555555');

-- Locais de Irrigação
INSERT INTO Locais_Irrigacao (nome, status, id_usu) VALUES
('Estufa 1', true, 1),
('Campo Aberto', true, 2),
('Estufa 2', false, 1),
('Horta Orgânica', true, 4),
('Viveiro de Mudas', false, 5);

-- Configurações
INSERT INTO Configuracoes (id_loc_irriga, umid_min, umid_max, temp_max, criado_em) VALUES
(1, 40.0, 80.0, 35.0, '2025-10-01 08:30:00'),
(2, 30.0, 70.0, 32.0, '2025-10-01 09:30:00'),
(4, 50.0, 90.0, 30.0, '2025-10-01 11:30:00'),
(5, 45.0, 85.0, 28.0, '2025-10-01 12:30:00');

-- Sensores
INSERT INTO Sensor (id_loc_irriga, tipo_sensor) VALUES
(1, 'Umidade'),
(1, 'Temperatura'),
(2, 'Umidade'),
(2, 'Temperatura'),
(4, 'Umidade'),
(4, 'Temperatura'),
(5, 'Umidade'),
(5, 'Temperatura');

-- Leituras
INSERT INTO Leitura (id_sensor, valor, status, data_hora) VALUES
(1, 55.2, 'Normal', '2025-10-02 07:00:00'),
(2, 28.5, 'Normal', '2025-10-02 07:00:00'),
(3, 45.0, 'Alerta', '2025-10-02 07:05:00'),
(4, 33.1, 'Normal', '2025-10-02 07:05:00'),
(5, 60.0, 'Normal', '2025-10-02 08:00:00'),
(6, 27.0, 'Normal', '2025-10-02 08:00:00'),
(7, 48.5, 'Alerta', '2025-10-02 08:10:00'),
(8, 26.2, 'Normal', '2025-10-02 08:10:00');

-- Mensagens
INSERT INTO Mensagens (id_remetente, id_destinatario, data_hora, texto, status) VALUES
(1, 2, '2025-10-02 08:00:00', 'Sensor de umidade em alerta no Campo Aberto.', true),
(2, 1, '2025-10-02 08:05:00', 'Verificado, iniciando irrigação.', false),
(4, 5, '2025-10-02 09:00:00', 'Temperatura elevada na Horta Orgânica.', true),
(5, 4, '2025-10-02 09:10:00', 'Ajuste realizado na ventilação do viveiro.', false);

-- Inserção de login do projeto
INSERT INTO Usuario (tipo_usu, nome, email, senha, criado_em, telefone) VALUES
('Administrador', 'Admin Projeto', 'admin@projeto.local', 'senhaAdmin123', '2025-10-16 08:00:00', '11900000000');
('Usuario', 'João Silva', 'joao@example.com', 'senhaJoao123', '2025-10-16 09:00:00', '11911111111'),
('Usuario', 'Maria Souza', 'maria@example.com', 'senhaMaria123', '2025-10-16 09:05:00', '11922222222'),
('Tecnico', 'Carlos Lima', 'carlos@example.com', 'senhaCarlos123', '2025-10-16 09:10:00', '11933333333');


