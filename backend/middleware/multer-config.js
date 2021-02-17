const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

/*** 1) nous créons une constante storage , à passer à multer comme configuration, qui 
contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants.
-----la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les 
espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier.

//2) Exportation de multer entièrement configuré, avec indication 
de gérance unique des téléchargements de fichiers image.***/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');