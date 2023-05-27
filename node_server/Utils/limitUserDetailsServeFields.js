module.exports = (user) => {

    const excludeFields = ['__v', 'password', 'passwordResetToken', 'passwordResetTokenExp', 'emailVerificationToken', 'emailVerificationTokenExp']
    const userObj = {...user}
    console.log('userObj')
    console.log(userObj._doc)
    excludeFields.forEach((el) => {
    delete userObj._doc[el]
    })
    return userObj._doc
}