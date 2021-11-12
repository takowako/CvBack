const { validationResult } = require('express-validator')
const SkillModel = require('../models/SkillSchema')
const CVModel = require("../models/CvSchema");

const facade=require('../others/facades')

exports.Save = function(req,res,next){
    
    //Validate Inputs 
    const errors = validationResult(req) 
    if (!errors.isEmpty()) { 
    console.log(errors.array())
    return res.status(422).json({ errors: errors.array() })
    }
 
    var CvId=req.user.CVUCvId;

    //generate random color
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    //Save Skill 
    var saveSkill = new SkillModel();
    saveSkill.SkillTitle = req.body.SkillTitleI;
    saveSkill.SkillDesc = req.body.SkillDescI;
    saveSkill.SkillVal = req.body.SkillValI;
    saveSkill.SkillColor =color ;
    saveSkill.save(function(err,result){
        
        if(!err){
            //update CV ref 
            facade.PushToCvArr(CvId,'CVSkill',saveSkill._id);
            res.send('Skill Saved');	 	
        }
    })	
}






















exports.Delete=function(req,res,next){

    var skId=req.params.skId;
    
    //Check Education & Delete  
    SkillModel.findOneAndDelete({_id:skId},function(err,result){
        console.log('err',err)
        console.log('res',result)
        if(!err && result){
            //Get CV & Remove Edu Id From CVEdu
            facade.PullCvArr(result.CVId,'CVSkill',skId)
            res.send('Skill Deleted');
        }
        else{
            return res.send('Unable To Delete Skill');
        }
    })

}