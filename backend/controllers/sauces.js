const Sauce = require('../models/sauces');
const fs = require('fs');

// Controlleur de création d'une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  //Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ).
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


// Controlleur de modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?  //Création de l'objet sauceObject pour vérifier si req.file existe ou non
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // S'il existe, on traite la nouvelle image, sinon on traite simplement l'objet entrant.
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