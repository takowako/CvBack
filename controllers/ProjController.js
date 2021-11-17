const { validationResult } = require('express-validator');

const ProjModel=require('../models/ProjectSchema');
const CvModel=require('../models/CvSchema');

var ObjectId = require('mongoose').Types.ObjectId;
const facade = require('../others/facades');


exports.Save = function(req,res,next){

    // ProjStatus:{type:Number,default:1},
    // ProjName:{type:String,required:true},
    // projDesc:{type:String,required:true},
    // ProjJob:{type:String}, 
    // ProjUrl:{type:String},
    // ProjImage:{type:String},
    // ProjDate:{type:Date,required:true},
    // ProjSkill:[{type: mongoose.Schema.Types.ObjectId, ref: 'BLCVSkill'}]


    //validate inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        return res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }


    //get Cv id 
    var CvId = req.user.CVUCvId;


    //Save Proj
    var SaveProj = new ProjModel;
    SaveProj.CVId=CvId;
    SaveProj.ProjName=req.body.ProjNameI;
    SaveProj.projDesc=req.body.ProjDescI;
    SaveProj.ProjJob=req.body.ProjJobI;
    SaveProj.ProjUrl=req.body.ProjUrlI;
    SaveProj.ProjImage=req.body.ProjImageI;
    SaveProj.ProjDate=req.body.ProjDateI;
    SaveProj.ProjSkill=req.body.ProjSkillI;
    SaveProj.save(function(err,result){

        if(!err){

            //Push Skills
            facade.PushToCvArr(CvId,'CVProj',SaveProj._id)
            return res.send('Proj Saved');

        }
        else{
            return res.send('Unable To Save Proj');
        }

    })

}


exports.Update = function(req,res,next){

    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        return  res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    var ProjId=req.params.projId;
    if(!ObjectId.isValid(ProjId)){
        return res.send('Param Not Valid');
    }

    // ProjStatus:{type:Number,default:1},
    // ProjName:{type:String,required:true},
    // projDesc:{type:String,required:true},
    // ProjJob:{type:String}, 
    // ProjUrl:{type:String},
    // ProjImage:{type:String},
    // ProjDate:{type:Date,required:true},
    // ProjSkill:[{type: mongoose.Schema.Types.ObjectId, ref: 'BLCVSkill'}]

    var Update = {

        ProjName:req.body.ProjNameI,
        projDesc:req.body.ProjDescI,
        ProjJob:req.body.ProjJobI,
        ProjUrl:req.body.ProjUrlI,
        ProjImage:req.body.ProjImageI,
        ProjDate:req.body.ProjDateI,
    }

    ProjModel.findOneAndUpdate({_id:ProjId},Update,function(err,result){

        //update Skill Array
        if(!err && result){
            result.ProjSkill.forEach(item => {
                result.ProjSkill.pull(item);
            });
            var newSkillArr= req.body.ProjSkillI;
            newSkillArr.forEach(item=>{
                result.ProjSkill.push(item);
            })
            
            result.save();
            res.send('Project  Updated');

        }
        else{
            res.send('Unable to Find Project')
        }

    })



}


exports.Delete = function(req,res,next){

    var ProjId=req.params.projId;
    if(!ObjectId.isValid(ProjId)){
        return res.send('Param Not Valid');
    }


    //Check Project & Delete
    ProjModel.findOneAndDelete({_id:ProjId},function(err,result){

        if(!err && result){
            //Get CV & Remove Proj Id From CVProj
            facade.PullCvArr(result.CVId,'CVProj',ProjId)
            res.send('Project Deleted');
        }
        else{
            return res.send('Unable To Delete Project');
        }

    })



}