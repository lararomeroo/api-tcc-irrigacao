const db = require('../dataBase/connection'); 

module.exports = {
    async listarMensagens(request, response) {
        try {
             
            const sql = `
            SELECT
             id_mens, id_remetente, id_destinatario, data_hora, texto 
             FROM mensagens;
            `;
            const [rows] =  await db.query(sql);

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

            const {id_remetente, id_destinatario, data_hora, texto} = request.body;
            const status = 1;

            const sql = `
           INSERT INTO Mensagens
            (id_remetente, id_destinatario, data_hora, texto, status)
             VALUES
            (?, ?, ?, ?, ?)
            `;

            const values = [id_remetente, id_destinatario, data_hora, texto, status];

            const [result] =  await db.query(sql, values);

            const dados = {
                id_mens: result.insertId,
                id_remetente,
                id_destinatario
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de mensagens', 
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
    async editarMensagens(request, response) {
        try {
            const {id_remetente, id_destinatario, data_hora, texto} = request.body;
        const status = 1;

        const {id_mens} = request.params;

        const sql = `
       UPDATE Mensagens SET
            id_remetente = ?, id_destinatario = ?, data_hora = ?, texto = ?, status= ?
       WHERE
            id_mens = ?;
    
        `;

        const values = [id_remetente, id_destinatario, data_hora, texto, status, id_mens];

        const [result] =  await db.query(sql, values);

        if (result.affectedRows ==0){
            return response.status(404).json({
                sucesso: false,
                mensagem: `Mensagem ${id_mens} não encontrado`,
                dados: null
            });
        }

        const dados = {
            id_mens: result.insertId,
            id_remetente,
            id_destinatario
        };

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
             
            const {id_mens} = request.params;

        const sql = `
        DELETE FROM Mensagens WHERE id_mens = ?
        `;

        const values = [id_mens];

        const [result] =  await db.query(sql, values);

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Exclusão de mensagem ${id_mens}`, 
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