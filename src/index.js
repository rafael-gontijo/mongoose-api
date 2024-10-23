const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.use(express.json());

const Film = mongoose.model('Film', {
    title: String,
    description: String,
    image_url: String,
    imdb_ulr: String,
    trailer_url: String,
    year: Number,
})

app.get('/', async (req, res) => {
    const films = await Film.find()
    return res.send(films)
})

app.get('/:id', async (req, res) => {
    const film = await Film.findById(req.params.id)
    return res.send(film)
})

app.post('/', async (req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        imdb_url: req.body.imdb_ulr,
        trailer_url: req.body.trailer_url,
        year: req.body.year,
    })
    await film.save();
    return res.send(film);
})

app.put('/:id', async (req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        imdb_url: req.body.imdb_ulr,
        trailer_url: req.body.trailer_url,
        year: req.body.year,
    }, {
        new: true
    })
    return res.send(film)
})

app.delete('/:id', async (req, res) => {
    const film = await Film.findByIdAndDelete(req.params.id)
    return res.send(film)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://rafadgontijo:wqKLRyBSGkfCtPZd@mongoose-api.q0vbs.mongodb.net/?retryWrites=true&w=majority&appName=mongoose-api')
    console.log(`Executando o Serviço na porta ${port}`)
})