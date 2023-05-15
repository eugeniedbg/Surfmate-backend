const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const publicationCtrl = require('../controllers/publication');

router.post('/', auth, publicationCtrl.createPublication);
router.put('/:id',auth, publicationCtrl.modifyPublication);
router.delete('/:id', auth, publicationCtrl.deletePublication);
router.get('/', publicationCtrl.getAllPublication);

module.exports = router;