const db = require('../database/connection');
const bcrypt = require('bcrypt');
// const validarEmail = require('./utils/validar_email');
const validarTelefone = require('./utils/validar_telefone');

module.exports = {
    async listarUsuarios(request, response) {
        try {

            const { id_usu = '%' } = request.query;
            const sql = `
                SELECT 
                   id_usu, tipo_usu, nome, email, telefone, criado_em
                FROM
                    usuario
                WHERE 
                    id_usu like ?; 
            `;

            const values = [id_usu];

            const [rows] = await db.query(sql, values);
            const nItens = rows.length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de usuários',
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
            if (
                !tipo_usu || !nome || !email || !senha || !telefone
            ) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Todos os campos obrigatórios devem ser preenchidos (tipo_usu, nome, email, senha, telefone).',
                    dados: null
                });
            }

            // if (!validarEmail(email)){
            //     return response.status(400).json({
            //         sucesso: false,
            //         mensagem: 'E-mail inválido.',
            //         dados: null
            //     } );
            // }

            const [emailExiste] = await db.query('SELECT id_usu FROM usuario WHERE email = ?', [email]);

            if (emailExiste.length > 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'E-mail já cadastrado.',
                    dados: null
                });
            }

            if (!validarTelefone(telefone)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Telefone inválido.',
                    dados: null
                });
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
    async editarUsuarios(request, response) {
        try {
            const { tipo_usu, nome, email, senha, telefone } = request.body;
            const { id_usu } = request.params;

            // const hashedSenha = senha ? await bcrypt.hash(senha, 10) : undefined;

            const sql = `
                UPDATE usuario SET 
                tipo_usu = ?, nome = ?, email = ?, 
                ${senha ? "senha = ?," : ""} telefone = ?
                WHERE id_usu = ?;
            `;

            const values = senha
                ? [tipo_usu, nome, email, senha, telefone, id_usu]
                : [tipo_usu, nome, email, telefone, id_usu];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id_usu} não encontrado`,
                    dados: null
                });
            }

            const dados = { id_usu, nome, email, tipo_usu };

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
            const { id_usu } = request.params;
            const sql = `DELETE FROM usuario WHERE id_usu = ?`;
            const [result] = await db.query(sql, [id_usu]);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Usuário ${id_usu} não encontrado`,
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${id_usu} excluído com sucesso.`,
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

    async login(request, response) {
        try {
            const { email, senha } = request.query;
            const sql = `
                SELECT id_usu, tipo_usu, nome, email, senha, telefone, criado_em 
                FROM usuario 
                WHERE email = ? AND senha = ?;
            `;

            const values = [email, senha];

            const [rows] = await db.query(sql, values);

            if (rows.length === 0) {
                return response.status(403).json({
                    sucesso: false,
                    mensagem: 'Usuário ou senha inválidos.',
                    dados: null,
                });
            }

            const usuario = {
                id_usu: rows[0].id_usu,
                tipo_usu: rows[0].tipo_usu,
                nome: rows[0].nome,
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso.',
                dados: usuario,
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }


};