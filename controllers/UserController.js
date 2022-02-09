const { validationResult } = require('express-validator')
const UserModel = require('../models/UserSchema');
const facades = require('../others/facades');
const auth = require('../others/auth');
const bcrypt = require('bcryptjs');




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
            if(!err2){
        
                var token = auth.generateToken({user:result2})
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