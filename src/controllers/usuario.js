const db = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async listarUsuarios(request, response) {
        try {
            const sql = `
                SELECT id_usu, tipo_usu, nome, email, telefone, criado_em
                FROM usuario;
            `;
            const [rows] = await db.query(sql);

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
            const { tipo_usu, nome, email, senha, telefone } = request.body;
            const hashedSenha = await bcrypt.hash(senha, 10); // 🔒 criptografa
            let dataTemp = '2025-09-04';

            const sql = `
                INSERT INTO usuario (tipo_usu, nome, email, senha, telefone, criado_em)
                VALUES (?, ?, ?, ?, ?, NOW());
            `;
            const values = [tipo_usu, nome, email, senha, telefone, dataTemp];
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

            const hashedSenha = senha ? await bcrypt.hash(senha, 10) : undefined;

            const sql = `
                UPDATE usuario SET 
                tipo_usu = ?, nome = ?, email = ?, 
                ${senha ? "senha = ?," : ""} telefone = ?
                WHERE id_usu = ? AND ativo = 1;
            `;

            const values = senha 
                ? [tipo_usu, nome, email, hashedSenha, telefone, id_usu]
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
            const sql = `UPDATE usuario SET ativo = 0 WHERE id_usu = ?`;
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
                mensagem: `Usuário ${id_usu} excluído com sucesso (soft delete).`,
                dados: null
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