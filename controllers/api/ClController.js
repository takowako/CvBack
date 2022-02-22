const { validationResult } = require('express-validator')
var ObjectId = require('mongoose').Types.ObjectId;



const ClModel = require('../../models/ClSchema');
const UserModel =require('../../models/UserSchema');



exports.Save=function(req,res){

    //validate inputs 
    const errors = validationResult(req);

    if(errors.errors.length > 0 ){
       return res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    var SaveCl= new ClModel();
    SaveCl.CLName=req.body.ClNameI;
    SaveCl.CLUId=req.user._id;
    SaveCl.save(function(err,result){

        if( result && !err){

            //push cv id to user
            UserModel.findOne({_id:req.user._id},function(err2,result2){

                if(result2 && !err2){
                    result2['CVUClId'].push(result._id)
                    result2.save();
                    
                   res.send('Cover Letter Saved');
                }

            })
            //res.send(result)
        }
    })

}


exports.Update=function(req,res){

    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    var ClId=req.params.clId;
    if(!ObjectId.isValid(ClId)){
        return res.send('Param Not Valid');
    }

    var Update={
        ClName:req.body.ClNameI,
        CLFullName:req.body.CLFullNameI,
        CLJob:req.body.CLJobI,
        CLAddress:req.body.CLAddressI,
        CLMail:req.body.CLMailI,
        CLPhone:req.body.CLPhoneI,
        CLCmpName:req.body.CLCmpNameI,
        CLCmpHrName:req.body.CLCmpHrNameI,
        CLBody:req.body.CLBodyI
    }

    ClModel.findOneAndUpdate({_id:ClId},Update,function(err,result){

        if(!err && result){
            console.log('updated')
            res.send('Cl Updated')
        }
        else{
            res.send('unable to find cv')
        }

    })
    
}

exports.Delete=function(req,res){

    res.send('Delete Working')

}