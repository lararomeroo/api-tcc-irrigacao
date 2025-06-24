const db = require('../dataBase/connection'); 

module.exports = {
    async listarSensor(request, response) {
        try {
            
           const sql = `
            SELECT 
           id_sensor, id_loc_irriga, tipo_sensor 
           FROM sensor;
           `;
          
           const [rows] = await db.query(sql);


            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de sensor', 
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
    async cadastrarSensor(request, response) {
        try {

            const {id_loc_irriga, tipo_sensor} = request.body;
            const sensor_ativo = 1;


            const sql = `
           INSERT INTO Sensor
            (id_loc_irriga, tipo_sensor) 
           VALUES
            (?, ?);
            `

            const values = [id_loc_irriga, tipo_sensor];

            const [result] = await db.query(sql, values);

            const dados = {
                tipo_sensor
            };


            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de sensor realizado', 
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
    async editarSensor(request, response) {
        try {

            const {id_loc_irriga, tipo_sensor} = request.body;

            const { id } = request.params;

            const sql = `
            UPDATE sensor SET 
            id_loc_irriga = ?, 
            tipo_sensor = ?
            WHERE
            id_sensor = ?;
            `
            const values = [id_loc_irriga, tipo_sensor, id];
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Sensor ${id} não encontrado!`,
                    dados: null
                });
            }

            const dados = {
                tipo_sensor
            };


            return response.status(200).json({
                sucesso: true, 
                mensagem: `Sensor ${id} atualizado com sucesso!`,
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
    async apagarSensor(request, response) {
        try {

            const { id } = request.params;

            const sql = `DELETE FROM sensor WHERE id_sensor = ?`;

            const values = [id];

            const [result] = await db.query(sql, values);

            
            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso:false,
                    mensagem: `Sensor ${id} não encontrado!`,
                    dados: null
                });
            } 

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Sensor ${id} excluido com sucesso`,
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