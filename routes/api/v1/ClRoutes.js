const express = require('express');

const ClController = require('../../../controllers/api/ClController');
const Validate = require('../../../others/validation');
const auth = require('../../../others/auth');

const router = express.Router();


router.post('/',auth.validateToken,Validate.ClValidate,ClController.Save)






module.exports = router;