require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const filmRoutes = require('./routes/filmRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/films', filmRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(port, () => {
            console.log(`Executando o Serviço na porta ${port}`);
        });
    })
    .catch(error => {
        console.error('Erro ao conectar ao MongoDB:', error);
    });
