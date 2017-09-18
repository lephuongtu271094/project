const bcrypt = require('bcript')
const LocalStrategy = require('passport-local').Strategy

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        db.user.findById(id)
          .then(user => {
            done(null, user)
        }).catch(err => {
            console.log(err)
        })
    })
}