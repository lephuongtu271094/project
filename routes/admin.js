const express = require('express');
const router = express.Router();
const { db,pagination } = require('../pgp')
const ListBook = require('../models/list_book')


//-------------------------------------------ADMIN-------------------------------------------

router.get('/', function (req, res, next) {
    ListBook.BookList()
    .then(data => {
        res.render('admin.html', {
            title: 'New book',
            listBook : data

        });
    }).catch(err => {
        console.log(err.message)
    })
   
});

router.route('/book/:id_book')
    .get(function (req, res) {
        let book = req.params.id_book
    
        ListBook.BookList_detail(book)
        .then(data => {
            res.render('detail_admin.html', {
                title: 'New book',
                detailBook : data
            });
        }).catch(err => {
            console.log(err.message)
        })
    
    })
    .post((req,res) => {
        let id = req.body.id_book
        let stt = req.body.lienlac
        ListBook.Update_status(id,stt)
        .then(() => {
            res.redirect('/admin')
        }).catch(err => {
            console.log(err.message)
        })
    });



router.get('/posts_list', function (req, res, next) {
    res.render('posts_list.html', {title: 'Posts List'});
});

router.get('/user', function (req, res, next) {
    res.render('user_list.html', {title: 'List User'});
});

router.get('/user_admin', function (req, res, next) {
    res.render('user_admin.html', {title: 'List User Admin'});
});
router.get('/posts_categories', function (req, res, next) {
    res.render('categories.html', {title: 'Categories'});
});
router.get('/login', function (req, res, next) {
    res.render('login.html', {title: 'Login'});
});
router.get('/new_user', function (req, res, next) {
    res.render('create_user.html', {title: 'New User Admin'});
});

router.get('/posts', function (req, res, next) {
    res.render('posts.html', {title: 'Thêm Mới'});
});

module.exports = router;