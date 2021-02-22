const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré ;
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)  // Hashage de mot de passe avec un salt de 10 tours(nbre de fois d'éxécution de l'olgorithme de hashage).
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash                // On assigne le hash obtenu comme valeur de la propriété password de l'objet user
      });
      user.save()                     // Sauvegarde des infos du user dans la base de données
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })  // On recherche le mail de l'utilisateur
    .then(user => {                        // Recherche d'un objet du modèle User, ayant pour propriété "email" =  req.body.email
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)  // Si on retrouve l'email, alors on compare le passord hashé présent dans la BD et le password entré par l'user
        .then(valid => {
          if (!valid) {                                 // Si le password n'est pas validé , il y a erreur
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,                           // Dans la réponse on renvoie le user._id (id généré par mongoDB automatiquement)
            token: jwt.sign(                            // Envoi du token d'authentification
              { userId: user._id },                     // Encodage du UserId pour qu'un User ne puisse pas modifier la sauce d'un autre User.
              'RANDOM_TOKEN_SECRET',                    // Clef secrète d'encodage
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};