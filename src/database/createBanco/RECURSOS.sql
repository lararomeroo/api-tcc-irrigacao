SELECT id_usu, tipo_usu, nome, email, senha, criado_em, telefone FROM usuario;
SELECT id_mens, id_remetente, id_destinatario, data_hora, texto FROM mensagens;
SELECT id_loc_irriga, nome, status, id_usu FROM locais_irrigacao;
SELECT id_config, id_loc_irriga, umid_min, umid_max, temp_max, criado_em FROM configuracoes;
SELECT id_sensor, id_loc_irriga, tipo_sensor FROM sensor;
SELECT id_leitura, id_sensor, valor, data_hora FROM leitura;

DROP TABLE  Leitura;
DROP TABLE  Sensor;
DROP TABLE  Configuracoes;
DROP TABLE  Locais_Irrigacao;
DROP TABLE  Mensagens;
DROP TABLE  Usuario;

DESCRIBE Usuario;
DESCRIBE Mensagens;
DESCRIBE Locais_Irrigacao;
DESCRIBE Configuracoes;
DESCRIBE Sensor;
DESCRIBE Leitura;