const { validationResult } = require('express-validator');
const CvModel=require('../models/CvSchema');
const ExpModel = require('../models/ExperianceSchema');


const facade = require('../others/facades');
var ObjectId = require('mongoose').Types.ObjectId;

exports.Save = function(req,res,next) {
    
    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        return res.status(400).json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

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

            
            //get list of Experiances
            var ExpList=ExpModel.find({CVId:CvId},).populate({path:'ExpSkill'}).exec(function(err2,result2){

                if(!err2){

                    return res.status(201).json({
                        status:true,
                        items:{
                            item:result,
                            list:result2
                        }
                    });
                }
            })


    
        }

    })
}




exports.Update=function(req,res,next){

    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        return  res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    var ExpId=req.params.expId;
    if(!ObjectId.isValid(ExpId)){
        return res.send('Param Not Valid');
    }

    var Update={
        ExpTitle:req.body.ExpTitleI,
        ExpDesc:req.body.ExpDescI, 
        ExpJob:req.body.ExpJobI,
        ExpFrom:req.body.ExpFromI,
        ExpTo:req.body.ExpToI,
        
    }
    
    //ExpSkill:[{type: mongoose.Schema.Types.ObjectId, ref: 'BLCVSkill'}]

    ExpModel.findOneAndUpdate({_id:ExpId},Update,function(err,result){

        //update Skill Array
        if(!err && result){
            result.ExpSkill.forEach(item => {
                result.ExpSkill.pull(item);
            });
            var newSkillArr= req.body.ExpSkillI;
            newSkillArr.forEach(item=>{
                result.ExpSkill.push(item);
            })
            
            result.save();
            res.send('Exp Updated');

        }
        else{
            res.send('Unable to Find Experiance')
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


