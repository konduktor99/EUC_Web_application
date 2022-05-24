const express = require('express');
const router = express.Router();

const unicycleController = require('../controllers/unicycleController');
const authUtil = require('../util/authUtils');

router.get('/', unicycleController.showUnicycleList);
router.get('/add', authUtil.permitAuthenticatedUser, unicycleController.showAddUnicycleForm);
router.get('/details/:idUnicycle',  unicycleController.showUnicycleDetails);
router.get('/edit/:idUnicycle', authUtil.permitAuthenticatedUser, unicycleController.showEditUnicycleForm);

router.post('/add', unicycleController.addUnicycle);
router.post('/edit', unicycleController.updateUnicycle);
router.get('/delete/:idUnicycle', unicycleController.deleteUnicycle);

module.exports = router;
