const express = require('express');


const EduController = require('../../controllers/EduController');
const Validate = require('../../others/validation');
const auth = require('../../others/auth');

const router = express.Router();



router.post('/',auth.validateToken,Validate.EduValidate,EduController.Save);

router.delete('/:eduId',auth.validateToken,EduController.Delete);



module.exports = router;