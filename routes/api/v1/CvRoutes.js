const express = require('express');

const CvController = require('../../../controllers/api/CvController');
const Validate = require('../../../others/validation');
const auth = require('../../../others/auth');

const router = express.Router();

router.post('/',auth.validateToken,Validate.CvValidate,CvController.Save);


module.exports = router;