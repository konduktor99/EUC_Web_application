const express = require('express');
const router = express.Router();

const uniApiController = require('../../api/assemblyAPI');

router.get('/', uniApiController.getAssemblies);
router.get('/:idAssembly', uniApiController.getAssemblyById);
router.post('/', uniApiController.createAssembly);
router.put('/:idAssembly', uniApiController.updateAssembly);
router.delete('/:idAssembly', uniApiController.deleteAssembly);
router.delete('/:assembliesIds', uniApiController.deleteManyAssemblies);
module.exports = router;
