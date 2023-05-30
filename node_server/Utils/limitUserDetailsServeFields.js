module.exports = (user) => {
    const excludeFields = ['__v', 'password', 'passwordResetToken', 'passwordResetTokenExp', 'emailVerificationToken', 'emailVerificationTokenExp']
    excludeFields.forEach((el) => {
    delete user[el]
    })
    return user
}