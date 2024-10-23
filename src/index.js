const express = require('express');
const mongoose = require('mongoose');
const filmRoutes = require('./routes/filmRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/films', filmRoutes);

app.listen(port, () => {
    mongoose.connect('mongodb+srv://rafadgontijo:wqKLRyBSGkfCtPZd@mongoose-api.q0vbs.mongodb.net/?retryWrites=true&w=majority&appName=mongoose-api')
    console.log(`Executando o Serviço na porta ${port}`)
})