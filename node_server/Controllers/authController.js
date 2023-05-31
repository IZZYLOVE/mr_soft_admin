const CustomError = require('../Utils/CustomError')
const User = require('./../Models/userModel')
const Stats = require('./../Models/statsModal')
const asyncErrorHandler = require('./../Utils/asyncErrorHandler')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const util = require('util')
const sendEmail = require('./../Utils/email')
const limitUserDetailsServeFields = require('../Utils/limitUserDetailsServeFields')
const paginationCrossCheck = require('../Utils/paginationCrossCheck')
const crypto = require('crypto')
const ApiFeatures = require('../Utils/ApiFeatures')



const signToken = (_id, email, role) => {
    const payload = {
        "_id": _id,
        "email": email,
        "role": role
    }
    const exp = {expiresIn: process.env.LOGIN_EXP}
    const secretkey = process.env.SECRETKEY
    return jwt.sign(payload, secretkey, exp)
}

exports.signup = asyncErrorHandler(async (req, res, next) => {
    const newUser = await User.create(req.body)
    const token = signToken(newUser._id, newUser.email, newUser.role)
    ///
    //2 GENERATE A RANDOM TOKEN FOR THE USER
    const VerificationToken= await newUser.createEmailVerificationToken();
    await newUser.save({validateBeforeSave: false}) // this saves the encrypted token and the expiry date generated in user.createResetPasswordToken() and {validateBeforeSave: false} prevents validation 

    
    //4 SEND THE TOKEN TO THE USER VIA EMAIL 
    const verifyUrl = `${req.protocol}://${req.get('host')}/api/v1/users/verifyemail/${VerificationToken}`
    // const message = `We have recieved a password reset request. Please use the link below to reset your password\n\n ${resetUrl} \n\n
    // this link will be valid for 10 munutes.`


    const message = `<html><body>
    <p>
    Hi ${newUser.firstName} ${newUser.middleName} ${newUser.lastName},</p> 
    
    We have recieved your new account.
    <p>
    Please use the link below to verify your email:
    </p>
    
    <table align='center' ><tr><td  align='center' style='	color:#FFF; cursor:pointer; padding: 10px 18px; border-radius:10px; background-color:#23BE30;'><b>${VerificationToken}</b>
        </td></tr></table>
    
    <p>
    
    You can also click on 'verify email' below to verify your email.
    </p>
    
    <table align='center' ><tr><td  align='center' style='	color:#FFF; cursor:pointer; padding: 10px 18px; border-radius:10px; background-color:#23BE30;'><a href='${verifyUrl}'><b>VERIFY EMAIL</b></a>
        </td></tr></table>
    
    <p>
    For information on MRsoft International visit <a href='${req.protocol}://${req.get('host')}'>${req.protocol}://${req.get('host')}</a>
    </p>
    
    WITH MRSOFT, </br>
    YOUR FUTURE AS A TECH ENGINEER IS BRIGHT.
    
    <p>
    Thank you for chosing MRsoft.
    </p>
    
    <p>
    ${req.protocol}://${req.get('host')}
    </p>
    </body></html>"`



    console.log(message+'\n') 
    let emailverificationMessage;
    try{
        await sendEmail({
            email: newUser.email,
            subject: "Password reset request",
            message: message
        })
        emailverificationMessage = `Email verification mail has been sent to  ${newUser.email}, pleae veryfy your email address.`
    }
    catch(err){
        newUser.emailVerificationToken = undefined,
        newUser.emailVerificationTokenExp = undefined,
        await newUser.save({validateBeforeSave: false})
 
        // return next(new CustomError(`There is an error sending password reset email. Please try again later`, 500))
        emailverificationMessage = `Email verification mail failed.`
        
    }
    ///
    limitedUser = limitUserDetailsServeFields(newUser)

    res.status(201).json({ 
        
        status : "success",
        token,
        resource : "user",
        user : "created",
        lenght : newUser.length,
        emailverificationMessage,
        data : limitedUser
       })  
})


exports.login = asyncErrorHandler(async (req, res, next) => {
    // const { username, password } = req.body
    const email = req.body.email
    const password = req.body.password

    if( !email || !password){
        const error = new CustomError('Please provide email and password for login', 400)
        return next(error)
    }

    // const user = await User.findOne({email: req.body.username, phone: req.body.username})// for phone or email login system
    // const user = await User.findOne({email: email})
    let user = await User.findOne({email}).select('+password')


    
    // const isMatch = await user.comparePasswordInDb(password, user.password)
    if(!user || !(await user.comparePasswordInDb(password, user.password))){
        const error = new CustomError('Incorrect login details', 400)
        return next(error)
    }

    const token = signToken(user._id, user.email, user.role)

    limitedUser = limitUserDetailsServeFields(user)

    

    res.status(201).json({ 
        status : "success",
        token,
        resource : "user",
        action: "loggedIn",
        lenght : user.length,
        data : limitedUser
       })  
})


exports.protect = asyncErrorHandler(async (req, res, next) => {
    //1 read the token and check if it exist
    const testToken = req.headers.authorization
    let token
    if(testToken && testToken.startsWith('Bearer')){
       token = testToken.split(' ')[1] // to get th second element of the generated array
    }
    if(!token){
        next(new CustomError('You are not logged in!', 401))
    }
    

    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRETKEY)// returns a promise

    //3 read the token and check if the user still exist
    const user = await User.findById({'_id': decodedToken._id})
    if(!user){
        const error = new CustomError('The user with the given token does not exist')
    }
    //4 If the user has changed the password after token was issued
    const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat)
    if(isPasswordChanged){
        const error = new CustomError('The password has been changed recently. Please login again')
        next(error)
    }

    //allow user to access the route
    req.user = user // reqxxx
    next()
})


// // for single role
// exports.restrict = (role) => {//wrapper function
//     return (req, res, next) => {
//         if(req.user.role !== role){
//             const error = new CustomError('You do not have permision to perform this action', 403)
//             next(error)
//         }
//         next()
//     }
// }

// for multiple roles, we use rest paraameter 
exports.restrict = (...role) => {//wrapper function
    return (req, res, next) => {
        if(!role.includes(req.user.role)){
            const error = new CustomError('You do not have permision to perform this action', 403)
            next(error)
        }
        next()
    }
}

exports.forgotpassword = asyncErrorHandler(async (req, res, next) => {

    //1 CONFIRM IF A USER WITH THAT EMAIL EXIST IN DB
    // const user = await User.findOne({email: req.body.username, phone: req.body.username})// for phone or email login system
    // const user = await User.findOne({email: req.body.email, phone: req.body.email})// for phone or email

    const user = await User.findOne({email: req.body.email})// for phone or email
    if(!user){
        const error = new CustomError(`We could not find a user with the given email (${req.body.email})`, 404)
        next(error)
    }
    //2 GENERATE A RANDOM TOKEN FOR THE USER
    const resetToken = await user.createResetPasswordToken();
    await user.save({validateBeforeSave: false}) // this saves the encrypted token and the expiry date generated in user.createResetPasswordToken() and {validateBeforeSave: false} prevents validation 
    console.log('forgotPassword resetToken')
    console.log(resetToken+'\n') 
    
    //4 SEND THE TOKEN TO THE USER VIA EMAIL 
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`
    // const message = `We have recieved a password reset request. Please use the link below to reset your password\n\n ${resetUrl} \n\n
    // this link will be valid for 10 munutes.`


    const message = `<html><body>
    <p>
    Hi ${user.firstName} ${user.middleName} ${user.lastName},</p> 
    
    We have recieved your password reset request.
    <p>
    If you need to change your password, your RESET code is:
    </p>
    
    <table align='center' ><tr><td  align='center' style='	color:#FFF; cursor:pointer; padding: 10px 18px; border-radius:10px; background-color:#23BE30;'><b>${resetToken}</b>
        </td></tr></table>
    
    <p>
     This code expires after 10 munites from the request time.
    
    You can also click on 'reset password' below to change your password.
    </p>
    
    <table align='center' ><tr><td  align='center' style='	color:#FFF; cursor:pointer; padding: 10px 18px; border-radius:10px; background-color:#23BE30;'><a href='${resetUrl}'><b>RESET PASSWORD</b></a>
        </td></tr></table>
    
    <p>
    For information on MRsoft International visit <a href='${req.protocol}://${req.get('host')}'>${req.protocol}://${req.get('host')}</a>
    </p>
    
    WITH MRSOFT, </br>
    YOUR FUTURE AS A TECH ENGINEER IS BRIGHT.
    
    <p>
    Thank you for chosing MRsoft.
    </p>
    
    <p>
    ${req.protocol}://${req.get('host')}
    </p>
    </body></html>"`



    console.log(message+'\n') 


    try{
        await sendEmail({
            email: user.email,
            subject: "Password reset request",
            message: message
        })
        res.status(200).json({ 
            status : "success",
            subject : "Password change request recievced",
            message: message

           })  
    }
    catch(err){
        user.passwordResetToken = undefined,
        user.passwordResetTokenExp = undefined,
        await user.save({validateBeforeSave: false})
 
        return next(new CustomError(`There is an error sending password reset email. Please try again later`, 500))

    }


})



exports.resetpassword = asyncErrorHandler(async (req, res, next) => {
    const cryptotoken = crypto.createHash('sha256').update(req.params.token).digest('hex')
   const user = await User.findOne({passwordResetToken: cryptotoken, passwordResetTokenExp: {$gt: Date.now()}}) 
   
   if(!user){
        const userx = await User.findOne({passwordResetToken: cryptotoken}) 
        if(userx){
            // there is a pasward reset token, delete it
            userx.password = req.body.password  
            userx.passwordResetToken = undefined
            userx.passwordResetTokenExp = undefined
        }
    

    const error = new CustomError('Token is invalid or has expired', 404)
    next(error)
   }

   user.password = req.body.password
   user.confirmPassword = req.body.confirmPassword
   user.passwordChangedAt = Date.now()
   user.passwordResetToken = undefined
   user.passwordResetTokenExp = undefined

   user.save()// we want to allow validation


   const token = signToken(user._id, user.email, user.role)

    ///
    //4 SEND THE TOKEN TO THE USER VIA EMAIL 
    const verifyUrl = `${req.protocol}://${req.get('host')}/api/v1/users/verifyemail/${VerificationToken}`
    // const message = `We have recieved a password reset request. Please use the link below to reset your password\n\n ${resetUrl} \n\n
    // this link will be valid for 10 munutes.`


    const message = `<html><body>
    <p>
    Hi ${newUser.firstName} ${newUser.middleName} ${newUser.lastName},</p> 
    
    Your password has been reset succesffully.
    <p>
    Please notify us at support@mrsoft.com if you did not perform this password reset:
    </p>
    
    
    <p>
    For information on MRsoft International visit <a href='${req.protocol}://${req.get('host')}'>${req.protocol}://${req.get('host')}</a>
    </p>
    
    WITH MRSOFT, </br>
    YOUR FUTURE AS A TECH ENGINEER IS BRIGHT.
    
    <p>
    Thank you for chosing MRsoft.
    </p>
    
    <p>
    ${req.protocol}://${req.get('host')}
    </p>
    </body></html>"`



    console.log(message+'\n') 
    let emailverificationMessage;
    try{
        await sendEmail({
            email: user.email,
            subject: "Password reset request",
            message: message
        })
        emailverificationMessage = `Password reset mail successfull.`
    }
    catch(err){
        newUser.emailVerificationToken = undefined,
        newUser.emailVerificationTokenExp = undefined,
        await newUser.save({validateBeforeSave: false})
 
        // return next(new CustomError(`There is an error sending password reset email. Please try again later`, 500))
        emailverificationMessage = `Password reset mail failed.`
        
    }
    ///

   res.status(201).json({ 
       status : "success",
       token,
       emailverificationMessage,
       resource : "user",
       action : "password-reset and auto login"
      })  
}) 


exports.getUsers = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(User.find(), req.query).filter().sort().limitfields().paginate()
 
    let user = await features.query

    req.query.page && paginationCrossCheck(user.length)
    

    limitedUser = limitUserDetailsServeFields(user)
    
    res.status(200).json({ 
        status : "success",
        resource : "users",
        lenght : user.length,
        data : user
       })  
})

exports.getAuser = asyncErrorHandler(async (req, res, next) => {
        const user = await User.findById(req.params._id)
        if(!user){
            const error = new CustomError(`User with ID: ${req.params._id} is not found`, 404)
            //return to prevent further execution of the rest of the codes
            return next(error)
        }
        limitedUser = limitUserDetailsServeFields(user)

        res.status(200).json({ 
            status : "success",
            resource : "user",
            lenght : user.length,
            data : limitedUser
        })  
})

exports.patchUser= asyncErrorHandler(async (req, res, next) => {
    // const user = await user.find({_id: req.param._id})
        const user = await User.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
        if(!user){
            const error = new CustomError(`user with ID: ${req.params._id} is not found`, 404)
            return next(error)
        }
        limitedUser = limitUserDetailsServeFields(user)

        res.status(200).json({ 
            status : "success",
            resource : "user",
            action: "patch",
            lenght : user.length,
            data : limitedUser
        })  
})


exports.putUser = asyncErrorHandler(async (req, res, next) => {
    // const user = await user.find({_id: req.param._id})
    const user = await User.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!user){
        const error = new CustomError(`User with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }
    limitedUser = limitUserDetailsServeFields(user)

    res.status(200).json({ 
        status : "success",
        resource : "user",
        action : "put",
        lenght : user.length,
        data : limitedUser
    })  
})

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
        const user = await User.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
        if(!user){
            const error = new CustomError(`User with ID: ${req.params._id} is not available`, 404)
            return next(error)
        }
        res.status(204).json({ 
            status : "success",
            resource : "user",
            message: 'deleted'
        })  
})


exports.verifyEmail = asyncErrorHandler(async (req, res, next) => {
    const cryptotoken = crypto.createHash('sha256').update(req.params.token).digest('hex')
   const user = await User.findOne({emailVerificationToken: cryptotoken}) 
   

   if(!user){
    const error = new CustomError('Verification token is invalid', 404)
    next(error)
   }

   user.emailVerificationTokenExp = undefined

   user.save()// we want to allow validation

   limitedUser = limitUserDetailsServeFields(user)

   const token = signToken(user._id, user.email, user.role)

   res.status(201).json({ 
       status : "success",
       token,
       resource : "user",
       action : "password-reset and auto login",
       lenght : user.length,
       data : limitedUser
      })  
}) 


exports.approveUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params._id)

   if(!user){
    const error = new CustomError(`User with ID: ${req.params._id} is not found`, 404)
    next(error)
   }

   user.approved = true

   await user.save({validateBeforeSave: false})

    // UPDATE OR CREATE STATS STARTS
    let DATE = new Date()
    let YY = DATE.getFullYear()
    let mm = DATE.getMonth()
    if(mm <= 9){
        mm = `0${mm}`
    }
    let thisMonth = `${mm}/${YY}`
    let stats = await Stats.findOne({month: thisMonth})
    if(stats){
        //Ppdate stats
        console.log('Update stats')
        stats.regCount += 1
        stats.enquiryCount += 1
        stats.updated = Date.now()
        stats.save()// we want to allow validation

        console.log('updared stats')
        console.log(stats)
    }
    else{
        //Create stats
        console.log('Create stats')
        let newStats = {
            "month": thisMonth,
            "regCount": 1
        }

        const newstats = await Stats.create(newStats)
        console.log('newstats')
        console.log(newstats)
    }
    // UPDATE OR CREATE STATS ENDS

    
    //4 SEND THE NOTICE TO THE USER VIA EMAIL 


    const message = `<html><body>
    <p>
    Hi ${user.firstName} ${user.middleName} ${user.lastName},</p> 
    
    This is to notify you that your account with MRsoft International has been approved.

    <p>
    For information on MRsoft International visit <a href='${req.protocol}://${req.get('host')}'>${req.protocol}://${req.get('host')}</a>
    </p>
    
    WITH MRSOFT, </br>
    YOUR FUTURE AS A TECH ENGINEER IS BRIGHT.
    
    <p>
    Thank you for chosing MRsoft.
    </p>
    
    <p>
    ${req.protocol}://${req.get('host')}
    </p>
    </body></html>"`



    console.log(message+'\n') 
    let userApprovalMessage;
    try{
        await sendEmail({
            email: user.email,
            subject: "Usere account approval",
            message: message
        })
        userApprovalMessage = `Usere account approval mail successfull.`
    }
    catch(err){
        // return next(new CustomError(`There is an error sending Usere account approval mail. Please try again later`, 500))
        userApprovalMessage = `Usere account approval mail failed.`
        
    }
    ///

   res.status(201).json({ 
       status : "success",
       userApprovalMessage,
       resource : "user",
       action : "account approved"
      })  
}) 



exports.setUserStatus = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params._id)

   if(!user){
    const error = new CustomError(`User with ID: ${req.params._id} is not found`, 404)
    next(error)
   }


   const oldstatus = user.status
   
   user.status = req.body.status 
   user.updated = new Date()



   await user.save({validateBeforeSave: false})

    // UPDATE OR CREATE STATS STARTS
    let DATE = new Date()
    let YY = DATE.getFullYear()
    let mm = DATE.getMonth()
    if(mm <= 9){
        mm = `0${mm}`
    }
    let thisMonth = `${mm}/${YY}`
    let stats = await Stats.findOne({month: thisMonth})
    if(stats){
        //Ppdate stats
        console.log('Update stats')
        stats.regCount += 1
        stats.enquiryCount += 1
        stats.updated = Date.now()
        stats.save()// we want to allow validation

        console.log('updared stats')
        console.log(stats)
    }
    else{
        //Create stats
        console.log('Create stats')
        let newStats = {
            "month": thisMonth,
            "regCount": 1
        }

        const newstats = await Stats.create(newStats)
        console.log('newstats')
        console.log(newstats)
    }
    // UPDATE OR CREATE STATS ENDS

    
    //4 SEND THE NOTICE TO THE USER VIA EMAIL 


    const message = `<html><body>
    <p>
    Hi ${user.firstName} ${user.middleName} ${user.lastName},</p> 
    
    This is to notify you that your account status with MRsoft International has been changed to ${req.body.status}.

    <p>
    For information on MRsoft International visit <a href='${req.protocol}://${req.get('host')}'>${req.protocol}://${req.get('host')}</a>
    </p>
    
    WITH MRSOFT, </br>
    YOUR FUTURE AS A TECH ENGINEER IS BRIGHT.
    
    <p>
    Thank you for chosing MRsoft.
    </p>
    
    <p>
    ${req.protocol}://${req.get('host')}
    </p>
    </body></html>"`



    console.log(message+'\n') 
    let userApprovalMessage;
    try{
        await sendEmail({
            email: user.email,
            subject: "Usere account approval",
            message: message
        })
        userApprovalMessage = `Usere account approval mail successfull.`
    }
    catch(err){
        // return next(new CustomError(`There is an error sending Usere account approval mail. Please try again later`, 500))
        userApprovalMessage = `Usere account approval mail failed.`
        
    }
    ///

   res.status(201).json({ 
       status : "success",
       userApprovalMessage,
       resource : "user",
       action : "account approved"
      })  
}) 