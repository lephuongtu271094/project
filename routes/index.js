const express = require('express');
const router = express.Router();
const DatBan = require('../models/datban')
const trangchu = require('../models/trangchu')
const Chitiet = require('../models/chitiet')
const Layout = require('../models/layout')
const List = require('../models/list')
const { db,} = require('../pgp')

/* GET home page. */
//-------------- RENDER TRANG CHỦ-------------------

router.get('/', function (req, res) {
        db.task(t => {
            return t.batch([
                trangchu.home_categories(),
                trangchu.home_location(),
                Layout.City()
            ])
        }).then(data => {
            res.render('trangchu.html', {
                title: 'Home',
                categories: data[0],
                location : data[1],
                citys: data[2]
            })
        })
        .catch(error => {
            console.log(error.message)
        });
});


//-------------- RENDER LIST-------------------

router.get('/city/:city', function (req, res) {
    let city = req.params.city
    db.task(t => {
        return t.batch([
            Layout.City(),
            Layout.Name_city(city),
            Layout.Districts(city),
            List.Location_city(city)
        ])
    }).then(data => {
        res.render('danhsach.html', {
            title: data[1].name,

            citys: data[0],
            name_ci: data[1],
            districts: data[2],
            location : data[3]
        })
    })
    .catch(error => {
        console.log(error.message)
    });
});

router.get('/city/:city/districts/:dis', function (req, res) {
    let city = req.params.city
    let dis = req.params.dis
    db.task(t => {
        return t.batch([
            Layout.City(),
            Layout.Name_city(city),
            Layout.Districts(city),
            Layout.Name_districts(dis),
            List.Location_districts(city,dis)
        ])
    }).then(data => {
        console.log(data[3])
        res.render('danhsach.html', {
            title: data[1].name,

            citys: data[0],
            name_ci: data[1],
            districts: data[2],
            name_dis : data[3][0],
            location : data[4]
        })
    })
        .catch(error => {
            console.log(error.message)
        });
});

// ------------- RENDER CHI TIẾT ĐỊA ĐIỂM----------------

router.get('/chitiet/:cat/:id', function (req, res) {
    let cat = req.params.cat
    let id = req.params.id
    db.task(t => {
        return t.batch([
            Chitiet.detail(id),
            Chitiet.detail_img(id),
            Chitiet.detail_correlate(cat)
        ])
    }).then(data => {
        console.log(data[2])
            res.render('chitiet.html', {
                title: 'Chi Tiết',
                datas : data[0],
                album : data[1],
                correlate : data[2]
            });
        })
        .catch(error => {
            console.log(error.message)
        });
});

router.post('/datban', function (req, res) {

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
