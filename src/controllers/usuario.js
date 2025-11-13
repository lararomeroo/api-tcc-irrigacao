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
                tipo_usu, // Variável adicionada
                nome,
                email,
                senha,
                telefone
            } = request.body;

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

    async editarUsuarios(request, response) {
    },

    async apagarUsuarios(request, response) {
    }
};