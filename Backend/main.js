const mongoose = require('./controllers/database'); 
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const Config = require('./config/config');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: `http://localhost:8100`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

  
app.use('/api/auth', authRoutes);



app.listen(Config.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${Config.PORT}`);
});

