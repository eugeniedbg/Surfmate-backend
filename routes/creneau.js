const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const creneauCtrl = require('../controllers/creneau');


router.post('/', auth,  creneauCtrl.createCreneau);
router.put('/:id', auth, creneauCtrl.modifyCreneau);
router.delete('/:id', auth, creneauCtrl.deleteCreneau);
router.get('/', creneauCtrl.getAllCreneau);
router.get('/:id', creneauCtrl.getOneCreneau);
router.get('/:id', creneauCtrl.getCreneauBySpot);
router.get('/:id', creneauCtrl.getCreneauByDate);
router.get('/:id', creneauCtrl.getCreneauBySpotAndDate);



module.exports = router;