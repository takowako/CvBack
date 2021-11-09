const ConatctModel = require('../models/ContactSchema');
const CVMetaModel = require('../models/CvMetaSchema');



exports.saveCvMeta = function(arr,CvId){

    arr.forEach(item=>{
        var SaveCvMeta = new CVMetaModel();
        SaveCvMeta.CVId=CvId;
        SaveCvMeta.MetaKey=item.key;
        SaveCvMeta.MetaValue=item.value;
        SaveCvMeta.save();
    })
}

exports.saveContact=function(arr,CvId){

    arr.forEach(item => {
        var SaveContact = new ConatctModel();
        SaveContact.CVId=CvId;
        SaveContact.CKey=item.key;
        SaveContact.CValue=item.value;
        SaveContact.save();
    });
}