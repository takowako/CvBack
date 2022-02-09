const { validationResult } = require('express-validator');
const CvModel=require('../models/CvSchema');
const OrgModel=require('../models/OrganizationSchema');

const facade = require('../others/facades');
var ObjectId = require('mongoose').Types.ObjectId;


exports.Save = function(req,res,next){

    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        return res.status(400).json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    //get && Cv id 
    var CvId = req.body.OrgCvI;
    facade.CheckCv(CvId,req.user._id,function(x){

        if(!x){
            return res.json({
                success:false,
                payload:null,
                msg:'Invalid cv' 
            });

        }
    })

    var saveOrg=new OrgModel();
    saveOrg.CVId=CvId;
    saveOrg.OrgTitle=req.body.OrgTitleI;
    saveOrg.OrgDesc=req.body.OrgDescI;
    saveOrg.OrgJob=req.body.OrgJobI;
    saveOrg.OrgFrom=req.body.OrgFromI;
    saveOrg.OrgTo=req.body.OrgToI;
    
    saveOrg.save(function(err,result){
        if(!err){
            facade.PushToCvArr(CvId,'CVOrg',saveOrg._id)

            //get list of organization
            OrgModel.find({CVId:CvId}).exec(function(err2,result2){

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

    var OrgId=req.params.orgId;
    if(!ObjectId.isValid(OrgId)){
        return res.send('Param Not Valid');
    }

    var Update={
        OrgTitle:req.body.OrgTitleI,
        OrgDesc:req.body.OrgDescI, 
        OrgJob:req.body.OrgJobI,
        OrgFrom:req.body.OrgFromI,
        OrgTo:req.body.OrgToI,
        
    }

    OrgModel.findOneAndUpdate({_id:OrgId},Update,function(err,result){

        if(!err && result){            
            result.save();
            res.send('Org Updated');
        }
        else{
            res.send('Unable to Find Organization')
        }

    })

}


exports.Delete = function(req,res,next){

    var OrgId=req.params.orgId;
    if(!ObjectId.isValid(OrgId)){
        return res.send('Param Not Valid');
    }


    //Check Organization & Delete
    OrgModel.findOneAndDelete({_id:OrgId},function(err,result){

        if(!err && result){
            //Get CV & Remove Organization Id From CVProj
            facade.PullCvArr(result.CVId,'CVOrg',OrgId)
            res.send('Organization Deleted');
        }
        else{
            return res.send('Unable To Delete Organization');
        }

    })



}