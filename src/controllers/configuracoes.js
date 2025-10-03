const db = require('../database/connection'); // nome padronizado, sem .JS

module.exports = {
    async listarConfiguracoes(request, response) {
        try {
            const sql = `
                SELECT
                id_config, id_loc_irriga, umid_min, umid_max, temp_max, criado_em 
                FROM configuracoes;
            `;   

            const [rows] = await db.query(sql);            

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de configurações',
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

    async cadastrarConfiguracoes(request, response) {
        try {
            const { id_loc_irriga, umid_min, umid_max, temp_max } = request.body;

            const sql = `
                INSERT INTO configuracoes
                (id_loc_irriga, umid_min, umid_max, temp_max, criado_em) 
                VALUES (?, ?, ?, ?, NOW());
            `;
            
            const values = [id_loc_irriga, umid_min, umid_max, temp_max];
            await db.query(sql, values);

            return response.status(201).json({
                sucesso: true, 
                mensagem: 'Configuração cadastrada com sucesso', 
                dados: { id_loc_irriga, umid_min, umid_max, temp_max }
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 

    async editarConfiguracoes(request, response) {
        try {
            const { id_loc_irriga, umid_min, umid_max, temp_max } = request.body;
            const { id } = request.params;

            const sql = `
                UPDATE configuracoes SET
                id_loc_irriga = ?, umid_min = ?, umid_max = ?, temp_max = ?
                WHERE id_config = ?;
            `;    

            const values = [id_loc_irriga, umid_min, umid_max, temp_max, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) { 
                return response.status(404).json({ 
                    sucesso: false, 
                    mensagem: `Configuração ${id} não encontrada!`, 
                    dados: null 
                }); 
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Configuração ${id} atualizada com sucesso!`, 
                dados: { id_loc_irriga, umid_min, umid_max, temp_max }
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 

    async apagarConfiguracoes(request, response) {
        try {
            const { id } = request.params;
            const sql = `DELETE FROM configuracoes WHERE id_config = ?`;
            const [result] = await db.query(sql, [id]);

            if (result.affectedRows == 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Configuração ${id} não encontrada!`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Configuração ${id} excluída com sucesso`, 
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