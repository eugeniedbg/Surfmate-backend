const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.deleteUser);
router.put('/:id', userCtrl.modifyUser);
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.get('/signup/pseudoLibre/:pseudo', userCtrl.pseudoLibre); 
router.get('/signup/emailLibre/:email', userCtrl.emailLibre); 



module.exports = router;