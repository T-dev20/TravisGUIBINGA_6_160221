const multer = require('multer');  // import du package multer pour gérer les images

const MIME_TYPES = {  // Types d'images acceptés
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

/*** 1) nous créons une constante storage , à passer à multer comme configuration, qui 
contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants. ***/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  /*** La fonction 'filename' indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et 
  d'ajouter un timestamp Date.now() comme nom de fichier. ***/
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// 2) Exportation de multer entièrement configuré, avec indication de gérance unique des téléchargements de fichiers image.
module.exports = multer({storage: storage}).single('image');