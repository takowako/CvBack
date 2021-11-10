const express = require('express');


const EduController = require('../../controllers/EduController');
const Validate = require('../../others/validation');
const auth = require('../../others/auth');

const router = express.Router();



router.post('/Save',auth.validateToken,Validate.SaveEduValidate,EduController.Save)



module.exports = router;