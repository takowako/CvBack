const express = require('express');


const SkController = require('../../controllers/SkController')
const Validate = require('../../others/validation')
const auth = require('../../others/auth');

const router = express.Router();



router.post('/',auth.validateToken,Validate.SkillValidate,SkController.Save)

router.put('/:skId',auth.validateToken,Validate.SkillValidate,SkController.Update)

router.delete('/:skId',auth.validateToken,SkController.Delete);

module.exports = router;