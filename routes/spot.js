const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const spotCtrl = require('../controllers/spot');

router.post('/', auth, spotCtrl.createSpot);
router.put('/:id', auth, spotCtrl.modifySpot);
router.delete('/:id', auth, spotCtrl.deleteSpot);
router.get('/:id', spotCtrl.getOneSpot);
router.get('/', spotCtrl.getAllSpot);
router.get('/:ville', spotCtrl.getSpotByVille);
router.get('/:pays', spotCtrl.getSpotByPays);
router.get('/:nom', spotCtrl.getSpotByNom);
router.get('/:note', spotCtrl.getSpotByNote);
router.get('/:id/avis', spotCtrl.getAllAvisSpotBySpotId);

module.exports = router;