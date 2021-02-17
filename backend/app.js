//importation de Express
const express = require('express');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://new-user_01:CRVrLEKDFEoKKfXR@cluster0.lzdtw.mongodb.net/sopekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


/*** Exportation de l'app pour pouvoir y accéder depuis les 
autres fichiers du projet, notamment notre serveur Node ***/
module.exports = app;