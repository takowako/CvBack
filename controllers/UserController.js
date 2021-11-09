const { validationResult } = require('express-validator')
const UserModel = require('../models/UserSchema');
const CvModel = require('../models/CvSchema');
const facades = require('../others/facades');

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

        //Save New User 
        var SaveUser= new UserModel();
        SaveUser.CVUserName='blaxk';
        SaveUser.CVUserMail=req.body.MailI;
        SaveUser.CVUserStatus=1;
        SaveUser.CVUserPlan=0;
        SaveUser.CVUserPass=SaveUser.encryptPassword('123456');
        SaveUser.save(function(err,result){
            if(!err){

                //Create New CV
                var UserId=result._id;
                var SaveCv=new CvModel();
                SaveCv.CVUserId=UserId;
                SaveCv.save(function(err2,result2){
                    if(!err2){
                        //Save User Contacts 
                        var arr=[
                            {key:'mail',value:req.body.MailI},
                            {key:'Phone',value:req.body.PhoneI}
                        ];
                        facades.saveContact(arr,result2._id)
                    }
                })
                res.send('User Saved With Contacts & CV');
            }
        })


}