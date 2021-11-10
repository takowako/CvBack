const express = require('express');


const ExpController = require('../../controllers/ExpController')
const Validate = require('../../others/validation')
const auth = require('../../others/auth');

const router = express.Router();



router.post('/Save',auth.validateToken,Validate.SaveExpValidate,ExpController.Save)



module.exports = router;