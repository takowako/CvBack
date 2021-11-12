const { validationResult } = require('express-validator')
const SkillModel = require('../models/SkillSchema')
const CVModel = require("../models/CvSchema");

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
            CVModel.findOne({_id:CvId},function(err2,result2){
                if(!err2){
                    result2.CVSkill.push(saveSkill._id)
                    result2.save(function(err3,result3){
                        if(!err3){
                            return res.send('Skill Saved')
                        }
                    })
                }              
            })    		 	
        }
    })	
}