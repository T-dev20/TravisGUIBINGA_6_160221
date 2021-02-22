// Importation du package http de Node,permettant de créer un serveur, puis import de l'API
const http = require('http');
const app = require('./app');

const mongoose = require('mongoose');

/*** La fonction normalizePort renvoie un port valide, qu'il soit fourni 
sous la forme d'un numéro ou d'une chaîne ***/
const normalizePort = val => {
  const port = parseInt(val, 10);  // Analyse de l'argument passé, valeur obtenue assigné à une constante "port"

  if (isNaN(port)) {               // Si la constante "port" n'est pas un Nombre (isNaN), la fonction renvoie l'argument analysé(val).
    return val;
  }
  if (port >= 0) {                 // Si la valeur de la constante "port" est supérieur à zéro et donc valide: la fonction renvoie la consante port.
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);            // On demande à l'app de s'exécuter sur le port définit (la constante 'port').


// La fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Serveur prêt
const server = http.createServer(app);


// Un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Écoute de la requête via un port (par defaut: 3000)
server.listen(port);