const express = require('express');
const UserController = require('../../controllers/UserController')
const Validate = require('../../others/validation')

const router = express.Router();


router.post('/Save',Validate.SaveUserValidate,UserController.Save)

module.exports = router;