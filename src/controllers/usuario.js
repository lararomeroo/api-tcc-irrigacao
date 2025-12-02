const db = require('../database/connection');
const bcrypt = require('bcrypt');
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
                    mensagem: 'Todos os campos obrigatórios devem ser preenchidos.',
                    dados: null
                });
            }

            // Validação de email duplicado
            const [emailExiste] = await db.query('SELECT id_usu FROM usuario WHERE email = ?', [email]);
            if (emailExiste.length > 0) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'E-mail já cadastrado.',
                    dados: null
                });
            }

            // Validação de telefone
            if (!validarTelefone(telefone)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Telefone inválido.',
                    dados: null
                });
            }

            // Hashing da Senha
            const hashedSenha = await bcrypt.hash(senha, 10); 

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

            // Se a senha for enviada para edição, ela deve ser hasheada
            const hashedSenha = senha ? await bcrypt.hash(senha, 10) : undefined;

            const sql = `
                UPDATE usuario SET 
                tipo_usu = ?, nome = ?, email = ?, 
                ${senha ? "senha = ?," : ""} telefone = ?
                WHERE id_usu = ?;
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

    // 🚀 FUNÇÃO DE LOGIN CORRIGIDA PARA USAR BCRYPT.COMPARE
    async login(request, response) {
        try {
            const { email, senha } = request.query;

            // 1. Busca o usuário APENAS pelo email para obter o hash salvo
            const sql = `
                SELECT id_usu, tipo_usu, nome, email, senha 
                FROM usuario 
                WHERE email = ?;
            `;

            const [rows] = await db.query(sql, [email]);
            
            // 2. Verifica se o usuário foi encontrado
            if (rows.length === 0) {
                return response.status(403).json({
                    sucesso: false,
                    mensagem: 'E-mail ou senha inválidos.', 
                    dados: null,
                });
            }

            const usuario = rows[0];
            
            // 3. Compara a senha digitada (texto puro) com o hash salvo (usuario.senha)
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha); 

            if (!senhaCorreta) {
                return response.status(403).json({
                    sucesso: false,
                    mensagem: 'E-mail ou senha inválidos.',
                    dados: null,
                });
            }

            // 4. Se a senha estiver correta, retorna o sucesso
            const dadosUsuario = {
                id_usu: usuario.id_usu,
                tipo_usu: usuario.tipo_usu,
                nome: usuario.nome,
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso.',
                dados: dadosUsuario,
            });

        } catch (error) {
            console.error("Erro no login:", error);
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }
}