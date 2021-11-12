const express = require('express');


const RefController = require('../../controllers/RefController')
const Validate = require('../../others/validation')
const auth = require('../../others/auth');

const router = express.Router();



router.post('/',auth.validateToken,Validate.SaveRefvalidate,RefController.Save)

router.delete('/:refId',auth.validateToken,RefController.Delete);



module.exports = router;