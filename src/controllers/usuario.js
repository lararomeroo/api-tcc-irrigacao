const db = require('../database/connection');
const bcrypt = require('bcrypt');
const validarEmail = require('./utils/validar_email');
const validarTelefone = require('./utils/validar_telefone');

module.exports = {
    async listarUsuarios(request, response) {
    },
    

    async cadastrarUsuarios(request, response) {
        try {
            const { 
                tipo_usu, 
                nome,
                email,
                senha,
                telefone
            } = request.body;

            // Validação de campos obrigatórios
            if(
                !tipo_usu || !nome || !email || !senha || !telefone
            ) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Todos os campos obrigatórios devem ser preenchidos (tipo_usu, nome, email, senha, telefone).',
                    dados: null
                });
            }

            if (!validarEmail(email)){
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'E-mail inválido.',
                    dados: null
                } );
            }
            
            const [emailExiste] = await db.query('SELECT id_usu FROM usuario WHERE email = ?', [email]);
            
            if (emailExiste.length > 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'E-mail já cadastrado.',
                    dados: null
                } );
            }

            if (!validarTelefone(cel)){
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Telefone inválido.',
                    dados: null
                } );
            }

            // Hashing da Senha
            const hashedSenha = await bcrypt.hash(senha, 10); // 🔒 criptografa
            
            const sql = `
                INSERT INTO usuario (tipo_usu, nome, email, senha, telefone, criado_em)
                VALUES (?, ?, ?, ?, ?, NOW());
            `;
            const values = [tipo_usu, nome, email, hashedSenha, telefone];
            const [result] = await db.query(sql, values);

            const dados = {
                id_usu: result.insertId,
                tipo_usu,
                nome,
                email
            };

            return response.status(201).json({
                sucesso: true,
                mensagem: 'Usuário cadastrado com sucesso!',
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
    async cadastrarClienteEnderecos(request, response) {
        try {
            const { idUsario, logradouro, num, bairro, complemento, idCidade, principal } = request.body;
            const end_excluido = false;
            let end_principal = principal;

            const sqlChecarEndereco = ` SELECT COUNT (*) AS total_enderecos FROM cliente_enderecos WHERE usu_id = ? AND end_excluido = false `;
            const [resultCheck] = await db.query (sqlChecarEndereco, [idUsario]);
            const total_enderecos = resultCheck[0].total_enderecos;

            if (total_enderecos === 0) {
                end_principal = true;
            } else{

                if (end_principal === true) {
                    const sqlUpdateEnd = ` UPDATE cliente_enderecos SET end_principal = 0 WHERE usu_id = ?;`;
                    await db.query(sqlUpdateEnd, [idUsario]);
                }
            }

            const sql = `
                INSERT INTO cliente_enderecos 
                    (usu_id, end_logradouro, end_num, end_bairro, end_complemento, cid_id, end_principal, end_excluido, criado_em)
                VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?);
            `;

            const values = [idUsario, logradouro, num, bairro, complemento, idCidade, end_principal, end_excluido];
            
            const [result] = await db.query(sql, values);

            const end_id = result.insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de endereco do cliente ${idUsuario} realizado com sucesso!',
                dados: { end_id }
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
    },

    async apagarUsuarios(request, response) {
    }
};