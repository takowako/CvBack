const express = require('express')

const OrgController =require('../../controllers/OrgController')
const Validate = require('../../others/validation')
const auth = require('../../others/auth');

var router = express.Router();



router.post('/',auth.validateToken,Validate.OrgValidate,OrgController.Save)

module.exports = router;