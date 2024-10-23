const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    image_url: { type: String, require: true },
    imdb_ulr: { type: String, require: false },
    trailer_url: { type: String, require: false },
    year: { type: Number, require: true },
})

const Film = mongoose.model('Film', FilmSchema);

module.exports = Film;