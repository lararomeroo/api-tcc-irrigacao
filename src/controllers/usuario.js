const db = require('../dataBase/connection'); 

module.exports = {
    async listarUsuarios(request, response) {
        try {

            const sql=`
            SELECT 
            id_usu, tipo_usu, 
            nome, email, senha, criado_em, telefone
             FROM usuario;
            `;

            const[rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de usuários', 
                itens:rows.length,
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
    async cadastrarUsuarios(request, response) {
        try {

            const{tipo_usu, nome, email, senha, criado_em, telefone}= request.body;


            const sql=`
            INSERT INTO usuario
             (tipo_usu, nome, email, senha, criado_em, telefone) 
            VALUES
            (?,?,?,?,?,?)
            `;
            
            const values=[tipo_usu, nome, email, senha, criado_em, telefone]
            const[result]= await db.query(sql, values)

            const dados={
                id_usu: result.insertId,
                tipo_usu,
                nome,
                email           
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de usuários', 
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
    async editarUsuarios(request, response) {
        try {
            const {tipo_usu, nome, email, senha, criado_em, telefone} = request.body;
            const {id_usu} = request.params;
            const sql = `
                UPDATE usuario SET 
                tipo_usu=?, nome=?, email=?, senha=?, criado_em=?, telefone=? 
                WHERE 
                id_usu = ?;
            `;
            const values=[tipo_usu, nome, email, senha, criado_em, telefone, id_usu]
            const[result]= await db.query(sql, values);
            
            if (result.affectedRows===0){
                return response.status(404).json({
                    sucesso:false,
                    mensagem:`Usuário ${id_usu}não encontrado`,
                    dados:null
                });
            }

            const dados={
                id_usu,
                nome,
                email,
                tipo_usu
            }

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Usuário ${id_usu} atualizado com sucesso`, 
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
    async apagarUsuarios(request, response) {
        try {
            const {id_usu} = request.params;
            const sql = `DELETE FROM usuario WHERE id_usu=?`;
            const values =[id_usu];
            const [result]= await db.query(sql, values);

            if(result.affectedRows ===0){
                return response.status(404).json({
                    sucesso:false,
                    mensagem:`Usuario ${id_usu} não encontrado`,
                    dados:null

                })
            }
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Exclusão de usuário ${id_usu}`, 
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