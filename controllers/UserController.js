const { validationResult } = require('express-validator')
const UserModel = require('../models/UserSchema');
const CvModel = require('../models/CvSchema');
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
                },
                {
                    path:'CVSkill'
                },
                {
                    path:'CVEdu'
                },
                // {
                //     path:'CVReff'
                // },
                {
                    path:'CVContact'
                }
            ]
    }

    var user = UserModel.findById(u._id).populate(popObj).exec(function(err,result){
        console.log(err)
        if(!err){
            return res.json(result);
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
        
    //Create New CV
    var SaveCv=new CvModel();
    SaveCv.save(function(err,result){

        if(!err){

            var CvId=result._id;
            //Create New User
            var SaveUser= new UserModel();
    
            SaveUser.CVUserName=username[0];
            SaveUser.CVFullName=req.body.FullNameI;
            SaveUser.CVUserMail=mail;
            SaveUser.CVUserFrom='mail';
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
                    return res.send(token);
                }
            })
        }
    })
}


exports.Login = function(req,res,next){

    UserModel.find({CVUserMail:req.body.MailI},function(err,result){

        if(!err){
            console.log(result[0])
            if(result === 'null'){
                return  res.send('wrong username or password user null');
            }
            console.log(result.CVUserPass)
            if(bcrypt.compare(req.body.PassI, result[0].CVUserPass)){
                var token=auth.generateToken(result[0])
                return res.send(token);
            }
            else{
                return  res.send('wrong username or password bad compare');
            }

        }

    }).lean();

     //res.send(CheckUser.length);

}