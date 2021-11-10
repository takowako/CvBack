const { validationResult, check } = require('express-validator')





//Save User Validation 
exports.SaveUserValidate=[

        check('FirstNameI').notEmpty()
        .withMessage('User First name  is required'),

        check('LastNameI').notEmpty()
        .withMessage('User Last name  is required'),

        check('MailI').notEmpty()
        .withMessage('User Mail   is required'),

        check('MailI').isEmail()
        .withMessage('Mail Is Wrong'),

        check('PassI').notEmpty()
        .withMessage('Password Is Required'),

        // check('PassI').length(6)
        // .withMessage('Pass Minimum length is 6'),

        check('PhoneI').isMobilePhone()
        .withMessage('Wrong Mobile Phone'),
]
//End Save User Validation


//Save Experiance Validation
exports.SaveExpValidate=[
        //Exp Title validate
        check('ExpTitleI').notEmpty()
        .withMessage('Expreiance Title is required'),

        //Exp Description validation
        check('ExpDescI').notEmpty()
        .withMessage('Expreince Description Is Required'),

        //Exp Job Validation
        check('ExpJobI').notEmpty()
        .withMessage('Experiance Job Is Required'),

        //Exp from Validation
        check('ExpFromI').notEmpty()
        .withMessage('Expreiance From Date Is Required'),

        //Exp To Validation
        check('ExpToI').notEmpty()
        .withMessage('Experiance To Date Is Required '),

        //Exp Skill Validation
        check('ExpSkillI').notEmpty()
        .withMessage('Experiance Skill Is Required'),
]
//End Save Experiance Validation


//Save Skill Validation
exports.SaveSkillValidate=[
        //CV ID Title validate
        check('CVId').notEmpty()
        .withMessage('CV ID is required'),

        //Skill Title Validation
        check('SkillTitleI').notEmpty()
        .withMessage('Skill Title is required'),

        //Skill Descreption Validation
        check('SkillDescI').notEmpty()
        .withMessage('Skill Descreption is required'),

        //Skill Value Validation 
        check('SkillValI').notEmpty()
        .withMessage('Skill Value is required'),

        //Skill Color Validation SkillColor
        check('SkillColorI').notEmpty()
        .withMessage('Skill Color is required'),
]
//End Save Skill Validation


//Save Edu validation
exports.SaveEduValidate=[
        //Edu Title validate
        check('EduTitleI').notEmpty()
        .withMessage('Education Title is required'),

        //Exp Description validation
        check('EduDescI').notEmpty()
        .withMessage('Education Description Is Required'),

        //Exp from Validation
        check('EduFromI').notEmpty()
        .withMessage('Education From Date Is Required'),

        //Exp To Validation
        check('EduToI').notEmpty()
        .withMessage('Education To Date Is Required '),

        //Exp Skill Validation
        check('EduSkillI').notEmpty()
        .withMessage('Education Skill Is Required'),

]
//End Save Edu validatiom