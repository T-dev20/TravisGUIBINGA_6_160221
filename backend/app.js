//importation de Express
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://new-user_01:CRVrLEKDFEoKKfXR@cluster0.lzdtw.mongodb.net/sopekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


/****Notre application sera contenue dans cette constante
 la méthode express() permet de créer une app Express*****/
const app = express();


/*** Exportation de l'app pour pouvoir y accéder depuis les 
autres fichiers du projet, notamment notre serveur Node ***/
module.exports = app;