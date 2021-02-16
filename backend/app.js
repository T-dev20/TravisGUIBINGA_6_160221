//importation de Express
const express = require('express');

const app = express();


/*** Exportation de l'app pour pouvoir y accéder depuis les 
autres fichiers du projet, notamment notre serveur Node ***/
module.exports = app;