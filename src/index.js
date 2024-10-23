const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.use(express.json());


const Film = mongoose.model('Film',{
    title: String,
    description: String,
    image_url: String,
    imdb_ulr: String,
    trailer_url: String,
    year: Number,
})



app.get('/', (req, res) =>{
    res.send('Hello World!')
})

app.post('/', async (req, res) => {
    const film = new Film ({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        imdb_url: req.body.imdb_ulr,
        trailer_url: req.body.trailer_url,
        year: req.body.year,
    })
    await film.save();
    res.send(film);
})


app.listen(port , () => {
    mongoose.connect('mongodb+srv://rafadgontijo:wqKLRyBSGkfCtPZd@mongoose-api.q0vbs.mongodb.net/?retryWrites=true&w=majority&appName=mongoose-api')
    console.log(`Executando o Serviço na porta ${port}`)
})