const express = require('express');
const router = express.Router();

const uniApiController = require('../../api/unicycleAPI');

router.get('/', uniApiController.getUnicycles);
router.get('/:idUnicycle', uniApiController.getUnicycleById);
router.post('/', uniApiController.createUnicycle);
router.put('/:idUnicycle', uniApiController.updateUnicycle);
router.delete('/:idUnicycle', uniApiController.deleteUnicycle);
module.exports = router;
