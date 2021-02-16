//importation du package http de Node,permettant de créer un serveur, puis import de l'API

const http = require('http');
const app = require('./app');

/*la fonction normalizePort renvoie un port valide, qu'il soit fourni 
sous la forme d'un numéro ou d'une chaîne*/
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);