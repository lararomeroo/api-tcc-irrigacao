const db = require('../database/connection'); // padronizado

module.exports = {
    async listarLeitura(request, response) {
        try {
            const sql = `
                SELECT id_leitura, id_sensor, valor, status, data_hora
                FROM leitura;
                
            `;
            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de leituras', 
                itens: rows.length,
                dados: rows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 

    async cadastrarLeitura(request, response) {
        try {
            const { id_sensor, valor, status } = request.body;

            const sql = `
                INSERT INTO leitura (id_sensor, valor, status, data_hora)
                VALUES (?, ?, ?, NOW());
            `;
            const values = [id_sensor, valor, status];
            await db.query(sql, values);

            return response.status(201).json({
                sucesso: true, 
                mensagem: 'Leitura cadastrada com sucesso', 
                dados: { id_sensor, valor, status }
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 

    async editarLeitura(request, response) {
        try {
            const { valor, status } = request.body;
            const { id } = request.params;

            const sql = `
                UPDATE leitura SET valor = ?, status = ?
                WHERE id_leitura = ?;
            `;
            const values = [valor, status, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Leitura ${id} não encontrada!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Leitura ${id} atualizada com sucesso!`, 
                dados: { valor, status }
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 

    async apagarLeitura(request, response) {
        try {
            const { id } = request.params;
            const sql = 'DELETE FROM leitura WHERE id_leitura = ?';
            const [result] = await db.query(sql, [id]);

            if (result.affectedRows === 0){
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: `Leitura ${id} não encontrada!`, 
                    dados: null
                });
            }
            
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Leitura ${id} excluída com sucesso!`, 
                dados: null
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 

    async buscarLeituraPorUsuarioETipo(request, response) {
        try {
            const { id_usu, tipo_sensor } = request.query;
            const sql = `
                SELECT l.id_leitura, l.id_sensor, l.valor, l.status, l.data_hora
                FROM leitura l
                JOIN sensor s ON l.id_sensor = s.id_sensor
                JOIN locais_irrigacao li ON s.id_loc_irriga = li.id_loc_irriga
                WHERE li.id_usu = ? AND s.tipo_sensor = ?
                ORDER BY l.data_hora DESC
                LIMIT 1;
            `;
            const values = [id_usu, tipo_sensor];
            const [rows] = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Última leitura de ${tipo_sensor} do usuário ${id_usu}`,
                itens: rows.length,
                dados: rows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
};