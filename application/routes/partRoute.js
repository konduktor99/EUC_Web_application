const express = require('express');
const router = express.Router();

const partController = require('../controllers/partController');
const authUtil = require('../util/authUtils'); //mp3

router.get('/', partController.showPartList);
router.get('/add',authUtil.permitAuthenticatedUser, partController.showAddPartForm);
router.get('/details/:idPart', partController.showPartDetails);
router.get('/edit/:idPart',authUtil.permitAuthenticatedUser, partController.showEditPartForm);

router.post('/add', partController.addPart);
router.post('/edit', partController.updatePart);
router.get('/delete/:idPart', partController.deletePart);

module.exports = router;
