const { validationResult } = require('express-validator');

const CvModel=require('../models/CvSchema');
const EduModel=require('../models/EducationSchema');



exports.Save = function(req,res,next){

    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }


    //get Cv id
    var CvId = req.user.user.CVUCvId;

    var SaveEdu=new EduModel();
    SaveEdu.CVId =CvId;
    SaveEdu.EduTitle=req.body.EduTitleI;
    SaveEdu.EduDesc=req.body.EduDescI;
    SaveEdu.EduFrom=req.body.EduFromI;
    SaveEdu.EduTo=req.body.EduToI;
    SaveEdu.EduSkill=req.body.EduSkillI;
    SaveEdu.save(function(err,result){

        if(!err){

            //push edu to Cv Exp Arr
            CvModel.findOne({_id:CvId},function(err2,result2){

                if(!err2){
                    result2.CVEdu.push(SaveEdu._id);
                    result2.save();
                    res.send('Edu Saved');
                }
            })

        }

    })

}