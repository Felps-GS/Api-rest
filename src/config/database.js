const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://felipegdesouza4_db_user:j5PHTtomzZGYOx9M@bancodb.7pduvyu.mongodb.net/bancoaula?appName=bancodb';

async function connectDatabase() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB conectado com sucesso.');
}

module.exports = connectDatabase;