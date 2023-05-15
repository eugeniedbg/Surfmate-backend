const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const AvisSpotCtrl = require('../controllers/avisspot');


router.post('/', AvisSpotCtrl.createAvisSpot);
router.put('/:id', AvisSpotCtrl.modifyAvisSpot);
router.delete('/:id', AvisSpotCtrl.deleteAvisSpot);
router.get('/', AvisSpotCtrl.getAllAvisSpot);
//router.get('/:id', AvisSpotCtrl.getOneAvisSpot);
//router.get('/', AvisSpotCtrl.getAllAvisSpotBySpotId);

module.exports = router;