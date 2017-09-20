const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserLogin = require('../models/login_logout')

passport.serializeUser((user,done) => {

    done(null,user)
})

passport.deserializeUser((user,done) => {

    done(null,user)
})

passport.use(new LocalStrategy(
   
    (username, password,done) => {
        UserLogin.UserLogin(username)
            .then(user => {
                bcrypt.compare(password, user.password, (err,result) => {

                    if(err) return done(err)
                    if(!result){
                        return done(null,false,{ message: 'Incorrect username and password' })
                    }
                    return done(null,user)
                })
            }).catch(err => done(null,false,{ message: 'Incorrect username and password' }))
    }
))

router.route('/login')
.get(function (req, res) {
    res.render('login.html', {title: 'Login'});
})
.post(passport.authenticate('local' ,{
        failureRedirect : '/admin/login',
        failureFlash : 'Tên đăng nhập hoặc mật khẩu không đúng'
}),
    (req,res) => {
        console.log(res.user)
        res.redirect('/admin')
    }
)

/* GET users listing. */


module.exports = router;
