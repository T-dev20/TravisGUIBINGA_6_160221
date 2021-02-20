const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  // Le token contiendra également le mot-clé Bearer. Nous utilisons donc la fonction split pour récupérer tout après l'espace dans le header.
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  // Nous utilisons ensuite la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée.
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {  // Si la demande contient un ID utilisateur, nous le comparons à celui extrait du token. S'ils sont différents, nous générons une erreur ;dans le cas contraire, tout fonctionne et notre utilisateur est authentifié.
      throw 'Invalid user ID';
    } else {
      next();                                             // Nous passons l'exécution à l'aide de la fonction next()
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};