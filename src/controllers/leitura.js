const db = require('../dataBase/connection'); 

module.exports = {
    async listarLeitura(request, response) {
        try {

            const sql = `
            SELECT 
            id_leitura, id_sensor, valor, status, data_hora
            FROM leitura;
            `;

            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de leitura', 
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

            const {id_sensor, valor, status, data_hora} = request.body;

            const sql = `
                INSERT INTO Leitura 
                (id_sensor, valor, status, data_hora)  
                VALUES
                (?, ?, ?, ?);
                `;

                const values = [id_sensor, valor, status, data_hora];

                const [result] = await db.query (sql, values);

                const dados ={
                    valor,
                    status,
                    data_hora
                };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de leitura', 
                dados: dados
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

            const {id_sensor, valor, status, data_hora} = request.body;

            const {id} = request.params;

            const sql = `
            UPDATE leitura SET
            id_sensor = ? , valor = ?, status = ?, data_hora = ?
            WHERE
            id_leitura = ?;
            `;

            const values = [id_sensor, valor, status, data_hora];

            const [result] = await db.query (sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Leitura ${id} não encontrado!`,
                    dados: null
                });
            }

            const dados ={
                valor,
                status,
                data_hora
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Leitura ${id} atualizado com sucesso!`, 
                dados
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

           
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Leitura ${id} atualizado com sucesso!`, 
                dados
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