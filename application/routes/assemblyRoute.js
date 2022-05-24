const express = require('express');
const router = express.Router();

const assemblyController = require('../controllers/assemblyController');
const authUtil = require('../util/authUtils'); //mp3

router.get('/', assemblyController.showAssemblyList);
router.get('/add', authUtil.permitAuthenticatedUser, assemblyController.showAddAssemblyForm);
router.get('/details/:idAssembly', assemblyController.showAssemblyDetails);
router.get('/edit/:idAssembly', authUtil.permitAuthenticatedUser, assemblyController.showEditAssemblyForm);

router.post('/add', assemblyController.addAssembly);
router.post('/edit', assemblyController.updateAssembly);
router.get('/delete/:idAssembly', assemblyController.deleteAssembly);
module.exports = router;
