const express = require('express');
const router = express.Router();
const DatBan = require('../models/datban')


/* GET home page. */
//-------------- RENDER TRANG CHỦ-------------------

router.get('/', function (req, res) {
    res.render('trangchu.html', {title: 'Home'});
});

// ------------- RENDER CHI TIẾT SẢN PHẨM----------------

router.get('/chitiet', function (req, res, next) {
    res.render('chitiet.html', {title: 'Chi Tiết'});
});
router.post('/datban', function (req, res, next) {

    req.checkBody('SoLuong', 'Lựa chọn số lượng người').isInt();
    req.checkBody('Name_DatBan', 'Họ và Tên không được để trống').notEmpty();
    req.checkBody('Number_DatBan', 'Số điện thoại không phải là số').isInt();
    req.checkBody('Number_DatBan', 'Số điện thoại không được để trống').notEmpty();
    req.checkBody('Email_DatBan', 'Email không được để trống').notEmpty();
    req.checkBody('Email_DatBan', 'Không phải Email').isEmail();

    let errors = req.validationErrors();

    if (errors) {
        res.json({errors: errors})
    } else {
        DatBan.insertDatban(req.body)
            .then(data => {
                res.json({data: data})
            })
    }

});

//----------------RENDER DANH SÁCH SẢN PHẨM----------------

router.get('/danhsach', function (req, res, next) {
    res.render('danhsach.html', {title: 'Danh sách'});
});


//-------------------------------------------ADMIN-------------------------------------------

router.get('/admin', function (req, res, next) {
    res.render('admin.html', {title: 'New book'});
});
router.get('/admin/posts_list', function (req, res, next) {
    res.render('posts_list.html', {title: 'Posts List'});
});

router.get('/admin/user', function (req, res, next) {
    res.render('user_list.html', {title: 'List User'});
});

router.get('/admin/user_admin', function (req, res, next) {
    res.render('user_admin.html', {title: 'List User Admin'});
});
router.get('/admin/posts_categories', function (req, res, next) {
    res.render('categories.html', {title: 'Categories'});
});
router.get('/admin/login', function (req, res, next) {
    res.render('login.html', {title: 'Login'});
});
router.get('/admin/new_user', function (req, res, next) {
    res.render('create_user.html', {title: 'New User Admin'});
});

router.get('/admin/posts', function (req, res, next) {
    res.render('posts.html', {title: 'Thêm Mới'});
});


module.exports = router;
