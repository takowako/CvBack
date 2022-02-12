const { validationResult } = require('express-validator')
const CvModel = require('../../models/CvSchema');
const UserModel = require('../../models/UserSchema');


exports.Save =function(req,res,next){

    //validate inputs 
    const errors = validationResult(req);

    if(errors.errors.length > 0 ){
       return res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    //Create New CV
    var SaveCv=new CvModel();
    SaveCv.CVName=req.body.CvNameI;
    SaveCv.CVUId=req.user._id;
    SaveCv.save(function(err,result){

        if( result && !err){

            //push cv id to user
            UserModel.findOne({_id:req.user._id},function(err2,result2){

                if(result2 && !err2){
                    result2['CVUCvId'].push(result._id)
                    result2.save();
                    
                   res.send('Cv Saved');
                }

            })

            //res.send(result)
        }
    })


}