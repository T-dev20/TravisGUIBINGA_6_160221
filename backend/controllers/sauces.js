const Sauce = require('../models/sauces');
const fs = require('fs');

// Pour ajouter un fichier à la requête, le front-end doit envoyer les 
// données de la requête sous la forme form-data, et non sous forme de JSON. 

// Nous devons également résoudre l'URL complète de notre image, car 
// req.file.filename ne contient que le segment filename . Nous utilisons 
// req.protocol pour obtenir le premier segment (dans notre cas 'http' ).
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

/*exports.likedSauce = (req, res, next) => {
  const sauceLikesObj = JSON.parse(req.body.likes);
  const sauce = new Sauce({
    userId: req.body._id,
    j'aime: req.body.
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce aimée !'}))
    .catch(error => res.status(400).json({ error }));
};*/

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

/*** Dans cette fonction, on crée un objet sauceObject 
qui regarde si req.file existe ou non. S'il existe, on traite la nouvelle
image ; s'il n'existe pas, on traite simplement l'objet entrant. 
On crée ensuite une instance Sauce à partir de sauceObject , puis on effectue la modification.***/
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


/*** nous utilisons le fait de savoir que notre URL d'image contient un 
segment /images/ pour séparer le nom de fichier ;

 nous utilisons ensuite la fonction unlink du package fs pour supprimer 
 ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé ;

dans le callback, nous implémentons la logique d'origine, en supprimant 
la sauce de la base de données. ***/
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};