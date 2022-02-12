const { validationResult } = require('express-validator')
const UserModel = require('../../models/UserSchema');
const facades = require('../../others/facades');
const auth = require('../../others/auth');
const bcrypt = require('bcryptjs');
const axios = require('axios')




exports.Get= function(req,res){


    //get user 
    var u = req.user;

    var popObj={
        path:'CVUCvId',
            populate:[
                {
                  path:'CVExp',
                  populate:[
                      {
                          path:'ExpSkill'
                      }
                  ]
                },
                {
                    path:'CVSkill'
                },
                {
                    path:'CVEdu',
                    populate:[
                        {
                            path:'EduSkill'
                        }
                    ]
                },
                {
                    path:'CVProj',
                    populate:[{
                        path:'ProjSkill'
                    }]
                },
                {
                    path:'CVReff'
                },
                {
                    path:'CVContact'
                },
                {
                    path:'CVOrg'
                },
                {
                    path:'CVAw'
                }
            ]
    }


    var user = UserModel.findById(u._id).populate(popObj).exec(function(err,result){
        console.log(err)
        if(!err){

            return res.send(result)

            return res.json({
                status:true,
                items:{
                    Exp:result.CVUCvId.CVExp,
                    Edu:result.CVUCvId.CVEdu,
                    Skill:result.CVUCvId.CVSkill,
                    Reff:result.CVUCvId.CVReff,
                    Contacts:result.CVUCvId.CVContact,
                    Proj:result.CVUCvId.CVProj,
                    Org:result.CVUCvId.CVOrg
                }
            });
        }
        console.log(result)
    });

}



exports.Save= function(req,res,next){

    
    //validate Inputs 
    const errors = validationResult(req);

    if(errors.errors.length > 0 ){
       return res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    var mail=req.body.MailI;
    var username=mail.split('@');
        
        //Create New User
        var SaveUser= new UserModel();

        SaveUser.CVUserName=username[0];
        SaveUser.CVFullName=req.body.FullNameI;
        SaveUser.CVUserMail=mail;
        SaveUser.CVUserFrom='mail';
        SaveUser.CVUserStatus=1;
        SaveUser.CVUserPlan=0;
        SaveUser.CVUserPass=SaveUser.encryptPassword('123456');
        SaveUser.save(function(err2,result2){
            if(!err2 && result2 ){
        
                var token = auth.generateToken(result2.toJSON())
                return res.send(token);
            }
        })
}


exports.Login = function(req,res,next){

    UserModel.findOne({CVUserMail:req.body.UserI},function(err,result){

        if(!err){
            console.log(result)
            if(result === 'null'){
                return  res.send('wrong username or password user null');
            }

            if(result){

                console.log(result.CVUserPass)
                if(bcrypt.compare(req.body.PassI, result.CVUserPass)){
                    var data=auth.generateToken(result)

                    return res.status(200).json({
                        success:true,
                        items:data
                    });

                    return res.send(token);
                }
                else{
                    return  res.send('wrong username or password bad compare');
                }

            }
            else{
                return res.send('Wrong username or passwotd');
            }

        }

    }).lean();
    //res.send(CheckUser.length);
}


exports.loginGoogle=function(req,res,next){
    
    var code =req.query.code;
    axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
          client_id: process.env.GOOGLE_CLI_ID,
          client_secret: process.env.GOOGLE_CLI_SECERET,
          redirect_uri: process.env.GOOGLE_CLI_REDIRECT_URL,
          grant_type: 'authorization_code',
          code,
        },
    }).then(function(resp){

        //get user data 
        axios({
            url: 'https://www.googleapis.com/oauth2/v2/userinfo',
            method: 'get',
            headers: {
              Authorization: `Bearer ${resp.data.access_token}`,
            },
        }).then(function(resp2){
            
            //check if use exist 
            UserModel.findOne({CVUserMail:resp2.data.email},function(err3,result){

                //res.send(result) 
                if(!err3 && result ){
                    var token = auth.generateToken(result.toJSON())
                    return res.send(token);
                }
                else{

                    //register new user
                    
                        //generate random password
                        let password = (Math.random() + 1).toString(36).substring(2);
                        var mail=resp2.data.email;
                        var username=mail.split('@');
                          
                        //Create New User
                        var SaveUser= new UserModel();
                  
                        SaveUser.CVUserName=username[0];
                        SaveUser.CVFullName=resp2.data.name;
                        SaveUser.CVUserMail=mail;
                        SaveUser.CVUserFrom='google';
                        SaveUser.CVUserStatus=1;
                        SaveUser.CVUserPlan=0;
                        SaveUser.CVUserPass=SaveUser.encryptPassword(password);
                        SaveUser.save(function(err2,result2){
                            if(!err2 && result2){
                                var token = auth.generateToken(result2.toJSON())
                                return res.send(token);
                            }
                        })
                }

            })
        })
        .catch(err2 => next(err2));

    })
    .catch(err => next(err));
    //console.log(test)
}














