const { validationResult } = require('express-validator');
const CvModel=require('../models/CvSchema')
const ExpModel = require('../models/ExperianceSchema');


exports.Save = function(req,res,next) {
    
    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    //res.send(req.body);

    //get Cv id
    var CvId = req.user.user.CVUCvId;

    //Save Exp
    var saveExp=new ExpModel()
    saveExp.ExpTitle = req.body.ExpTitleI;
    saveExp.ExpDesc = req.body.ExpDescI;
    saveExp.ExpJob = req.body.ExpJobI;
    saveExp.ExpFrom = req.body.ExpFromI;
    saveExp.ExpTo = req.body.ExpToI;
    saveExp.ExpSkill=req.body.ExpSkillI;
    saveExp.save(function(err,result){


        if(!err){

            //push exp to Cv Exp Arr
            CvModel.findOne({_id:CvId},function(err2,result2){

                if(!err2){
                    result2.CVExp.push(saveExp._id);
                    result2.save();
                    res.send('Exp Saved');
                }
            })

        }

    })
}


