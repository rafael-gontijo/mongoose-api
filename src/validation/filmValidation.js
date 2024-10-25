const Joi = require('joi');

// Esquema de validação para o modelo Film
const filmSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional(),
    image_url: Joi.string().uri().optional(),
    imdb_url: Joi.string().uri().optional(),
    trailer_url: Joi.string().uri().optional(),
    year: Joi.number().integer().min(1888).max(new Date().getFullYear()).required()
});

module.exports = { filmSchema };