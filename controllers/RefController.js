const { validationResult } = require('express-validator');

const RefModel=require('../models/ReffernceSchema');
const CvModel=require('../models/CvSchema');




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
            CvModel.findOne({_id:CvId},function(err2,result2){

                if(!err2){
                    result2.CVReff.push(SaveRef._id);
                    result2.save();
                    res.send('Reff Saved');
                }
            })
        }

    })



}