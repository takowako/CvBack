const { validationResult } = require('express-validator');

const RefModel=require('../models/ReffernceSchema');
const CvModel=require('../models/CvSchema');
var ObjectId = require('mongoose').Types.ObjectId;
const facade = require('../others/facades');



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

    var CvId = req.user.CVUCvId;
    //console.log(req.user)

    var SaveRef = new RefModel();
    SaveRef.CVId=CvId;
    SaveRef.RefName=req.body.RefNameI;
    SaveRef.RefJob=req.body.RefJobI;
    SaveRef.RefMail=req.body.RefMailI;
    SaveRef.RefPhone=req.body.RefPhoneI;
    SaveRef.save(function(err,result){

        if(!err){
            //push ref to Cv Exp Arr
            facade.PushToCvArr(CvId,'CVReff',SaveRef._id)
            return res.send('Reff Saved');
        }

    })
}







exports.Update=function(req,res,next){

    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
       return res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    var RefId=req.params.refId;
    if(!ObjectId.isValid(RefId)){
        return res.send('Param Not Valid');
    }

    var Update = {
        RefName:req.body.RefNameI,
        RefJob:req.body.RefJobI, 
        RefMail:req.body.RefMailI,
        RefPhone:req.body.RefPhoneI
    };

    RefModel.findOneAndUpdate({_id:RefId},Update,function(err,result){

        if(!err && result){
            return res.send('Reff Updated ')
        }


    })





}







exports.Delete=function(req,res,next){

    var RefId=req.params.refId;
    if(!ObjectId.isValid(RefId)){
        return res.send('Param Not Valid');
    }
    
    //Check Education & Delete  
    RefModel.findOneAndDelete({_id:RefId},function(err,result){

        if(!err && result){
            //Get CV & Remove Edu Id From CVEdu
            facade.PullCvArr(result.CVId,'CVReff',RefId)
            res.send('Reffrence Deleted');
        }
        else{
            return res.send('Unable To Delete Reffrence');
        }
    })

}