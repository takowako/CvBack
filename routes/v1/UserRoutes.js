const express = require('express');


const UserController = require('../../controllers/UserController')
const Validate = require('../../others/validation');
const auth = require('../../others/auth');

const router = express.Router();

router.get('/',auth.validateToken,UserController.Get)

router.post('/',Validate.SaveUserValidate,UserController.Save)

router.post('/login',Validate.LoginUserValidate,UserController.Login)

module.exports = router;