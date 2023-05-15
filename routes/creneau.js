const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const creneauCtrl = require('../controllers/creneau');


router.post('/', creneauCtrl.createCreneau);
router.put('/:id', creneauCtrl.modifyCreneau);
router.delete('/:id', creneauCtrl.deleteCreneau);
router.get('/', creneauCtrl.getAllCreneau);
router.get('/:id', creneauCtrl.getOneCreneau);
router.get('/:id', creneauCtrl.getCreneauBySpot);
router.get('/:id', creneauCtrl.getCreneauByDate);
router.get('/:id', creneauCtrl.getCreneauBySpotAndDate);



module.exports = router;