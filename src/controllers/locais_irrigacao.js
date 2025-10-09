const db = require('../database/connection'); // padronizado

module.exports = {
    async listarLocaisIrrigacao(request, response) {
        try {

            const { id_usu = '%' } = request.query;
            const sql = `
                SELECT
                    id_loc_irriga, nome, status, id_usu
                FROM 
                    locais_irrigacao 
                WHERE 
                    id_loc_irriga like ?; 
            `;

            const values = [id_usu];

            const [rows] = await db.query(sql, values);
            const nItens = rows.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de locais de irrigação',
                nItens,
                dados: rows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na listagem de locais de irrigação.',
                dados: error.message
            });
        }
    },

    async cadastrarLocalIrrigacao(request, response) {
        try {
            const { nome, status, id_usu } = request.body;

            const sql = `
                INSERT INTO locais_irrigacao (nome, status, id_usu)
                VALUES (?, ?, ?);
            `;
            const values = [nome, status, id_usu];
            const [result] = await db.query(sql, values);

            const dados = {
                id_loc_irriga: result.insertId,
                nome,
                status,
                id_usu
            };

            return response.status(201).json({
                sucesso: true,
                mensagem: 'Local de irrigação cadastrado com sucesso!',
                dados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar local de irrigação.',
                dados: error.message
            });
        }
    },

    async editarLocalIrrigacao(request, response) {
        try {
            const { nome, status } = request.body;
            const { id } = request.params;

            const sql = `
                UPDATE locais_irrigacao
                SET nome = ?, status = ?
                WHERE id_loc_irriga = ?;
            `;
            const values = [nome, status, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Local de irrigação ${id} não encontrado.`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Local de irrigação ${id} atualizado com sucesso!`,
                dados: { id, nome, status }
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar local de irrigação.',
                dados: error.message
            });
        }
    },

    async apagarLocalIrrigacao(request, response) {
        try {
            const { id } = request.params;
            const sql = `DELETE FROM locais_irrigacao WHERE id_loc_irriga = ?;`;
            const [result] = await db.query(sql, [id]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Local de irrigação ${id} não encontrado.`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Local de irrigação ${id} excluído com sucesso.`,
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao excluir local de irrigação.',
                dados: error.message
            });
        }
    }
};