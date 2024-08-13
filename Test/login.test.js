//importa modulo supertest para fazer requisições HTTP
import request from 'supertest'
import { expect } from 'chai'
import app from '../app.js'

describe('POST /login', () => {
    it('deve retornar 200 OK e uma mensagem de sucesso para credenciais válidas', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                username: 'testuser',  // Certifique-se de que este é o nome de usuário correto
                password: 'testpass'   // Certifique-se de que esta é a senha correta
            });

        // Usando o Chai para verificar o status e a mensagem
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Login realizado com sucesso!');
    });

    it('deve retornar 401 Unauthorized para senha inválida', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                username: 'testuser',
                password: 'wrongpass'  // Senha incorreta
            });

        // Usando o Chai para verificar o status e a mensagem
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Credenciais invalidas!');
    });
});

describe('Integração entre módulos de autenticação e perfil de usuário', () => {
    it('deve retornar 200 OK e informações de perfil para login bem-sucedido', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                username: 'testuser',
                password: 'testpass'
            });

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Login realizado com sucesso!');
        expect(res.body.profile).to.deep.equal({
            name: 'Test User',
            email: 'testuser@example.com',
            age: 30
        });
    });

    it('não deve retornar informações de perfil para login falho', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                username: 'testuser',
                password: 'wrongpass'
            });

        expect(res.status).to.equal(401);
        expect(res.body.profile).to.be.undefined;
    });
});
