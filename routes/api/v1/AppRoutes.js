const express = require('express');
const queryString =require('query-string')
const router = express.Router();



//authenticate using facebook
router.get('/init',function(req,res){

    //perpare google auth link
    const stringifiedParams = queryString.stringify({
        client_id:process.env.GOOGLE_CLI_ID,
        redirect_uri: process.env.GOOGLE_CLI_REDIRECT_URL,
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '), // space seperated string
        response_type: 'code',
    });

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    res.send(googleLoginUrl)
    

    //prepare facebook login link


    //prepare github link


    //prepare linkedin link






})







module.exports = router;