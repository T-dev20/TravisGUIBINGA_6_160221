const Sauce = require('../models/sauces');
const fs = require('fs');

// Controlleur de création d'une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);  //On extrait l'objet JSON du modèle sauce
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // Génération de l'url de l'img.Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ).
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};


// Controlleur d'affichage d'une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => { res.status(200).json(sauce);})
    .catch((error) => {res.status(404).json({error});
  });
};

exports.sauceLikeOrDislik = (req, res, next) => {
  switch (req.body.like) {
     case 0:                                                   //cas: req.body.like = 0
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.find( user => user === req.body.userId)) {  // on cherche si l'utilisateur est déjà dans le tableau usersLiked
            
          } 
      break;

     case 1:                                                // cas: req.body.like = 1
      Sauce.updateOne({ _id: req.params.id }, {             // on recherche la sauce avec le _id présent dans la requête
        $inc: { likes: 1 },                                 // incrémentaton de la valeur de likes.
        $push: { usersLiked: req.body.userId }              // on ajoute l'utilisateur dans le array usersLiked.
      })
        .then(() => { res.status(201).json({ message: "Sauce likée !" }); }) //code 201: created
        .catch((error) => { res.status(400).json({ error }); });          //code 400: bad request
      break;
     
     case -1 :
      Sauce.updateOne({ _id: req.params.id }, {               // on recherche la sauce avec le _id présent dans la requête
        $inc: { dislikes: 1 },                                // décrémentaton de la valeur de dislikes.
        $push: { usersDisliked: req.body.userId }             // on rajoute l'utilisateur à l'array usersDiliked.
      })
        .then(() => { res.status(201).json({ message: "Sauce dislikée !" }); }) // code 201: created
        .catch((error) => { res.status(400).json({ error }); }); // code 400: bad request
      break;
    default:
      console.error("bad request");
  }
};


// Controlleur de modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?  // Création de l'objet sauceObject pour vérifier si l'User remplace l'img ou non
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // Si oui, on traite la nouvelle image, sinon on traite simplement l'objet entrant('...req.body').
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })  //On crée ensuite une instance Sauce à partir de sauceObject , puis on effectue la modification.
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


// Controlleur de suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];  //nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier
      fs.unlink(`images/${filename}`, () => {  //Suppression du fichier et callback à exécuter une fois ce fichier supprimé
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


// Controlleur d'affichage de toutes les sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
  .then((sauces) => {res.status(200).json(sauces);})
  .catch((error) => {res.status(400).json({error});
  });
};