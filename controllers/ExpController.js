const { validationResult } = require('express-validator');
const CvModel=require('../models/CvSchema');
const ExpModel = require('../models/ExperianceSchema');
const facade = require('../others/facades');


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
    console.log(req.user)
    //get Cv id 
    var CvId = req.user.CVUCvId;

    //Save Exp
    var saveExp=new ExpModel()
    saveExp.CVId=CvId;
    saveExp.ExpTitle = req.body.ExpTitleI;
    saveExp.ExpDesc = req.body.ExpDescI;
    saveExp.ExpJob = req.body.ExpJobI;
    saveExp.ExpFrom = req.body.ExpFromI;
    saveExp.ExpTo = req.body.ExpToI;
    saveExp.ExpSkill=req.body.ExpSkillI;
    saveExp.save(function(err,result){
        
        if(!err){

            facade.PushToCvArr(CvId,'CVExp',saveExp._id)
            return res.send('Exp Saved');
        }

    })
}



















exports.Delete=function(req,res,next){

    var ExpId=req.params.expId;
    if(!ObjectId.isValid(ExpId)){
        return res.send('Param Not Valid');
    }
    
    //Check Education & Delete  
    ExpModel.findOneAndDelete({_id:ExpId},function(err,result){

        if(!err && result){
            //Get CV & Remove Edu Id From CVEdu
            facade.PullCvArr(result.CVId,'CVExp',ExpId)
            res.send('Experiance Deleted');
        }
        else{
            return res.send('Unable To Delete Experiance');
        }
    })
}


