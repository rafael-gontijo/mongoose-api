require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const filmRoutes = require('./routes/filmRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/films', filmRoutes);

const connectDBAndStartServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado ao MongoDB');
        app.listen(port, () => {
            console.log(`Executando o Serviço na porta ${port}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
};

// Verifica se o arquivo está sendo executado diretamente
if (require.main === module) {
    connectDBAndStartServer();
}

module.exports = app; // Exporta o app para testes