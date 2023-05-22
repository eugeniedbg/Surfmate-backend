const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('../routes/user');
const spotRoutes = require('../routes/spot');
const creneauRoutes = require('../routes/creneau');
const publicationRoutes = require('../routes/publication');
const avisSpotRoutes = require('../routes/avisspot');

mongoose.connect('mongodb+srv://eugenie:1234@cluster0.k2kypnq.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); 

app.use('/api/auth', userRoutes);
app.use('/api/spot', spotRoutes);
app.use('/api/creneau', creneauRoutes);
app.use('/api/publication', publicationRoutes);
app.use('/api/avis', avisSpotRoutes);




module.exports = app;