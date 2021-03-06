const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');  // Import du middleware auth pour la protection des Routes
const multer = require('../middleware/multer-config');  // Import de multer pour gérer les fichiers images

const saucesCtrl = require('../controllers/sauce');  // Import du controlleur sauces

router.get('/', auth, saucesCtrl.getAllSauce);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.sauceLikeOrDislik);

module.exports = router;