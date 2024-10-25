const express = require('express');
const Film = require('../models/Film');
const { filmSchema } = require('../validation/filmValidation');

const router = express.Router();

// Função de validação usando Joi
const validateFilm = (data) => {
    const { error } = filmSchema.validate(data);
    return error ? error.details[0].message : null;
};

// GET: Obter todos os filmes
router.get('/', async (req, res) => {
    try {
        const films = await Film.find();
        return res.status(200).json(films);
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        return res.status(500).json({ message: 'Erro ao buscar filmes' });
    }
});

// GET: Obter filme por ID
router.get('/:id', async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);
        if (!film) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }
        return res.status(200).json(film);
    } catch (error) {
        console.error('Erro ao buscar filme:', error);
        return res.status(500).json({ message: 'Erro ao buscar filme' });
    }
});

// POST: Criar um novo filme
router.post('/', async (req, res) => {
    const validationError = validateFilm(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const film = new Film(req.body);
        await film.save();
        return res.status(201).json(film);
    } catch (error) {
        console.error('Erro ao criar filme:', error);
        return res.status(400).json({ message: 'Erro ao criar filme', error });
    }
});

// PUT: Atualizar um filme por ID
router.put('/:id', async (req, res) => {
    const validationError = validateFilm(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const film = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!film) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }
        return res.status(200).json(film);
    } catch (error) {
        console.error('Erro ao atualizar filme:', error);
        return res.status(400).json({ message: 'Erro ao atualizar filme', error });
    }
});

// DELETE: Remover um filme por ID
router.delete('/:id', async (req, res) => {
    try {
        const film = await Film.findByIdAndDelete(req.params.id);
        if (!film) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }
        return res.status(200).json({ message: 'Filme removido com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar filme:', error);
        return res.status(500).json({ message: 'Erro ao deletar filme' });
    }
});

module.exports = router;
