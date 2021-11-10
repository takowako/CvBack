const { validationResult } = require('express-validator')
const UserModel = require('../models/UserSchema');
const CvModel = require('../models/CvSchema');
const facades = require('../others/facades');
const auth = require('../others/auth');

exports.Save= function(req,res,next){

    
    //validate Inputs 
    const errors = validationResult(req);

    if(errors.errors.length > 0 ){
        res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    //Create New CV
    var SaveCv=new CvModel();
    SaveCv.save(function(err,result){

        if(!err){

            var CvId=result._id;
            //Create New User
            var SaveUser= new UserModel();
            SaveUser.CVUserName='blaxk';
            SaveUser.CVUserMail=req.body.MailI;
            SaveUser.CVUserStatus=1;
            SaveUser.CVUserPlan=0;
            SaveUser.CVUCvId=CvId;
            SaveUser.CVUserPass=SaveUser.encryptPassword('123456');
            SaveUser.save(function(err2,result2){
                if(!err2){
                    //Save Cv Contacts
                    var arr=[
                        {key:'mail',value:req.body.MailI},
                        {key:'Phone',value:req.body.PhoneI}
                    ];
                    facades.saveContact(arr,CvId)

                    //Save Cv Skills
                    var skills =req.body.SkillI;
                    if(skills){
                        var SkillArr=skills.split(',')
                        facades.SaveSkill(SkillArr,CvId)
                    }


                    var token = auth.generateToken({user:result2})
                    res.send(token);
                }
            })
        }
    })

    //Create New user 


}