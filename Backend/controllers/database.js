const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/SAE5', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB:'));
db.once('open', () => {
  console.log('Connecté à MongoDB');
});

module.exports = mongoose;