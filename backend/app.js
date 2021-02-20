const express = require('express');  // Importation de Express
const bodyParser = require('body-parser');  // Importation de body-parser: analysee les corps de requêtes entrants dans un middleware
//importation des routeurs
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const path = require('path');  // Import de path: fournit un moyen de travailler avec les répertoires et les chemins de fichiers.

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://new-user_01:CRVrLEKDFEoKKfXR@cluster0.lzdtw.mongodb.net/sopekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


/*** Notre application sera contenue dans cette constante. La méthode express() permet de créer une app Express. ***/
const app = express();


/*** 1)On accède à notre API depuis n'importe quelle origine;
     2)On ajoute les headers mentionnés aux requêtes envoyées vers notre API;
     3)On envoie des requêtes avec les méthodes mentionnées. ***/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//pour cette route, on utilise la logique du routeur (userRoutes et sauceRoutes)
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// Exportation de l'app pour pouvoir y accéder depuis les autres fichiers du projet, notamment notre serveur Node.
module.exports = app;