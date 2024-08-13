// importa o módulo express para criar um aplicativo web
import express from 'express'

// inicia o aplicativo express
const app = express();

// middleware para processar o corpo das requisições JSON
app.use(express.json());

// Dados fictícios de perfis de usuários
const userProfile = {
    'testuser': {
        name: 'Test User',
        email: 'testuser@example.com',
        age: 30
    }
};

// Rota para obter perfil do usuário (após login bem-sucedido)
app.get('/profile', (req, res) => {
    const { username } = req.query;

    // Verifica se o perfil do usuário existe
    if (userProfile[username]) {
        return res.status(200).json(userProfile[username]);
    } else {
        return res.status(404).json({ message: 'Perfil não encontrado' });
    }
});

// criação de um usuário e senha válidos para autenticação
const validUser = {
    username:'testuser', // usuário válido
    password:'testpass' // senha válida
};
// rota para o login, verifica as credenciais fornecidas
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === validUser.username && password === validUser.password) {
        // Se o login for bem-sucedido, retorna o perfil do usuário
        const profile = userProfile[username];
        return res.status(200).json({ 
            message: 'Login realizado com sucesso!', 
            profile 
        });
    } else {
        return res.status(401).json({ message: 'Credenciais invalidas!' });
    }
});

// exporta o aplicativo para que possa ser usado em outros arquivos
export default app;