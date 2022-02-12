const { validationResult } = require('express-validator');
const CvModel=require('../../models/CvSchema');
const AwModel=require('../../models/AwSchema');

const facade = require('../../others/facades');
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
    var CvId = req.body.AwCvI;
    facade.CheckCv(CvId,req.user._id,function(x){

        if(!x){
            return res.json({
                success:false,
                payload:null,
                msg:'Invalid cv' 
            });

        }
    })

    var saveAw=new AwModel();
    saveAw.CVId=CvId;
    saveAw.AwTitle=req.body.AwTitleI;
    saveAw.AwDesc=req.body.AwDescI;
    saveAw.AwJob=req.body.AwJobI;
    saveAw.AwDate=req.body.AwDateI;
    
    saveAw.save(function(err,result){
        console.log(err)
        if(!err){
            facade.PushToCvArr(CvId,'CVAw',saveAw._id)

            //get list of Award
            AwModel.find({CVId:CvId}).exec(function(err2,result2){

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

    var AwId=req.params.awId;
    if(!ObjectId.isValid(AwId)){
        return res.send('Param Not Valid');
    }

    var Update={
        AwTitle:req.body.AwTitleI,
        AwDesc:req.body.AwDescI, 
        AwJob:req.body.AwJobI,
        AwDate:req.body.AwDateI,

        
    }

    AwModel.findOneAndUpdate({_id:AwId},Update,function(err,result){

        if(!err && result){            
            result.save();
            res.send('Aw Updated');
        }
        else{
            res.send('Unable to Find Award')
        }

    })

}


exports.Delete = function(req,res,next){

    var AwId=req.params.awId;
    if(!ObjectId.isValid(AwId)){
        return res.send('Param Not Valid');
    }


    //Check Award & Delete
    AwModel.findOneAndDelete({_id:AwId},function(err,result){

        if(!err && result){
            //Get CV & Remove Award Id From CVProj
            facade.PullCvArr(result.CVId,'CVAw',AwId)
            res.send('Award Deleted');
        }
        else{
            return res.send('Unable To Delete Award');
        }

    })



}