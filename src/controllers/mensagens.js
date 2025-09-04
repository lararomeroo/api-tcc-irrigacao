const db = require('../database/connection'); // padronizado

module.exports = {
    async listarMensagens(request, response) {
        try {
            const sql = `
                SELECT id_mens, id_remetente, id_destinatario, data_hora, texto, status
                FROM mensagens;
            `;
            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de mensagens',
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

    async cadastrarMensagens(request, response) {
        try {
            const { id_remetente, id_destinatario, texto } = request.body;
            const status = 1;

            const sql = `
                INSERT INTO mensagens (id_remetente, id_destinatario, data_hora, texto, status)
                VALUES (?, ?, NOW(), ?, ?);
            `;
            const values = [id_remetente, id_destinatario, texto, status];
            const [result] = await db.query(sql, values);

            const dados = {
                id_mens: result.insertId,
                id_remetente,
                id_destinatario,
                texto,
                status
            };

            return response.status(201).json({
                sucesso: true, 
                mensagem: 'Mensagem cadastrada com sucesso!', 
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

    async editarMensagens(request, response) {
        try {
            const { id_remetente, id_destinatario, texto } = request.body;
            const status = 1;
            const { id_mens } = request.params;

            const sql = `
                UPDATE mensagens SET
                id_remetente = ?, id_destinatario = ?, texto = ?, status = ?
                WHERE id_mens = ?;
            `;
            const values = [id_remetente, id_destinatario, texto, status, id_mens];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Mensagem ${id_mens} não encontrada.`,
                    dados: null
                });
            }

            const dados = { id_mens, id_remetente, id_destinatario, texto, status };

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Mensagem ${id_mens} atualizada com sucesso!`, 
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

    async apagarMensagens(request, response) {
        try {
            const { id_mens } = request.params;

            const sql = `DELETE FROM mensagens WHERE id_mens = ?`;
            const [result] = await db.query(sql, [id_mens]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Mensagem ${id_mens} não encontrada.`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Mensagem ${id_mens} excluída com sucesso.`, 
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
};