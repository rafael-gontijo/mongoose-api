const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index');
const { filmSchema } = require('../src/validation/filmValidation');
const Film = require('../src/models/Film');

// Antes de tudo, configurar o MongoDB de teste
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

// Depois de tudo, fechar a conexão
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Testes das Rotas de Filmes', () => {
    it('GET /films - Deve retornar uma lista de filmes', async () => {
        const res = await request(app).get('/films');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /films - Deve criar um novo filme', async () => {
        const newFilm = {
            title: 'Novo Filme de Teste',
            description: 'Descrição do filme',
            image_url: 'https://exemplo.com/imagem.jpg',
            imdb_url: 'https://imdb.com/exemplo',
            trailer_url: 'https://youtube.com/exemplo',
            year: 2000
        };

        const res = await request(app).post('/films').send(newFilm);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toBe(newFilm.title);
    });

    it('GET /films/:id - Deve retornar um filme específico', async () => {
        // Primeiro, crie um filme
        const film = new Film({
            title: 'Filme para Teste GET',
            year: 1999
        });
        await film.save();

        // Depois, faça uma requisição para buscar esse filme
        const res = await request(app).get(`/films/${film._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', film._id.toString());
    });

    it('PUT /films/:id - Deve atualizar um filme', async () => {
        // Primeiro, crie um filme
        const film = new Film({
            title: 'Filme para Teste PUT',
            year: 1998
        });
        await film.save();

        // Faça uma atualização no título
        const updatedFilm = { title: 'Filme Atualizado', year: 2001 };
        const res = await request(app).put(`/films/${film._id}`).send(updatedFilm);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(updatedFilm.title);
    });

    it('DELETE /films/:id - Deve excluir um filme', async () => {
        // Primeiro, crie um filme
        const film = new Film({
            title: 'Filme para Teste DELETE',
            year: 2001
        });
        await film.save();

        // Em seguida, faça a requisição DELETE
        const res = await request(app).delete(`/films/${film._id}`);
        expect(res.statusCode).toBe(200);
        
        // Verifique se o filme foi excluído
        const deletedFilm = await Film.findById(film._id);
        expect(deletedFilm).toBeNull();
    });
});
