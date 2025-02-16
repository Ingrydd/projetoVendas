const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ticket'); 
    console.log('MongoDB conectado com sucesso!!!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err, '!');
  }
};

module.exports = connectDB;
