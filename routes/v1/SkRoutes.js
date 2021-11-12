const express = require('express');


const SkController = require('../../controllers/SkController')
const Validate = require('../../others/validation')
const auth = require('../../others/auth');

const router = express.Router();



router.post('/',auth.validateToken,Validate.SkillValidate,SkController.Save)

router.delete('/:skId',auth.validateToken,SkController.Delete);

module.exports = router;