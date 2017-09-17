const express = require('express');
const router = express.Router();
const DatBan = require('../models/datban');
const trangchu = require('../models/trangchu');
const Chitiet = require('../models/chitiet');
const Layout = require('../models/layout');
const List = require('../models/list');
const Search = require('../models/search');
const { db,pagination } = require('../pgp');

/* GET home page. */
//-------------- RENDER TRANG CHỦ-------------------

router.get('/', function (req, res) {
        db.task(t => {
            return t.batch([
                Layout.Categories(),
                trangchu.home_location(),
                Layout.City(),
                Layout.Sub_category()
            ])
        }).then(data => {
            res.render('trangchu.html', {
                title: 'Home',
                categories: data[0],
                location : data[1],
                citys: data[2],
                sub_category : data[3]
            })
        })
        .catch(error => {
            console.log(error.message)
        });
});

router.get('/search', function (req, res) {
    let index = req.query.search;
    let page = req.query.page || 1;
    let limit = pagination.pagination;
    let offset = (page - 1) * limit;
    console.log(page)
    db.task(t => {
        return t.batch([
            Search.Search_location(index,limit,offset),
            Search.Search_districts(index,limit,offset),
            Search.Search_city(index,limit,offset),
            Search.Search_sub_category(index,limit,offset),
            Search.Search_categories(index,limit,offset),
            
            Search.Count_search_location(index),
            Search.Count_search_districts(index),
            Search.Count_search_city(index),
            Search.Count_search_sub_category(index),
            Search.Count_search_categories(index),

            Layout.City(),
            Layout.Categories(),
            Layout.Sub_category()
        ])
    }).then(data => {
        let arr = []
        let count = 0
        for(let i = 0 ; i <= 4; i++){
            data[i].map(index => {
                arr.push(index)
            })
        }
        for(let i = 0 ; i < data.length; i++){
            data[i].map(index => {
                if(index.count > 0){
                    count = index.count
                }
            })
        }
        let totalPage = Math.ceil(count / limit);
        res.render('danhsach.html', {
            title: 'Search',       
            location : arr,
            totalPage : totalPage,
            currentPage: page,
            count :count,
            search : index,
            citys: data[10],
            categories: data[11],
            sub_category : data[12]
        })
    })
        .catch(error => {
            console.log(error.message)
        });
});

//--------------LIST CITY AND DISTRICTS------------------
// RENDER CITY
router.get('/city/:city', function (req, res) {
    let city = req.params.city;
    let page = req.query.page || 1;
    let limit = pagination.pagination;
    let offset = (page - 1) * limit;
    db.task(t => {
        return t.batch([
            Layout.City(),
            Layout.Name_city(city),
            Layout.Districts(city),
            List.Location_city(city,limit,offset),
            Layout.Categories(),
            Layout.Sub_category(),
            List.Count_location_city(city)
        ])
    }).then(data => {
        let totalPage = Math.ceil(data[6][0].count / limit);
        res.render('danhsach.html', {
            title: data[1].name,
            citys: data[0],
            name_ci: data[1],
            districts: data[2],
            location : data[3],
            categories : data[4],
            sub_category: data[5],
            totalPage : totalPage,
            currentPage: page
        })
    })
    .catch(error => {
        console.log(error.message)
    });
});
// RENDER DISTRICTS
router.get('/city/:city/districts/:dis', function (req, res) {
    let city = req.params.city;
    let dis = req.params.dis;
    let page = req.query.page || 1;
    let limit = pagination.pagination;
    let offset = (page - 1) * limit;
    db.task(t => {
        return t.batch([
            Layout.City(),
            Layout.Districts(city),
            Layout.Name_districts(dis),
            List.Location_districts(city,dis,limit,offset),
            Layout.Categories(),
            Layout.Sub_category(),
            List.Count_location_districts(city,dis)
        ])
    }).then(data => {
        let totalPage = Math.ceil(data[6][0].count / limit);
        res.render('danhsach.html', {
            title: data[2][0].name + ' - ' + data[2][0].name_districts,
            citys: data[0],
            districts: data[1],
            name_dis : data[2][0],
            location : data[3],
            categories : data[4],
            sub_category: data[5],
            totalPage : totalPage,
            currentPage: page
        })
    })
        .catch(error => {
            console.log(error.message)
        });
});

//--------------LIST CATEGORIES AND SUB_CATEGORY ------------------

// RENDER CATEGORIES
router.get('/cats/:id', function (req, res) {

    let cats = req.params.id
    let page = req.query.page || 1;
    let limit = pagination.pagination;
    let offset = (page - 1) * limit;
    db.task(t => {
        return t.batch([
            Layout.City(),
            Layout.Categories(),
            Layout.Sub_category(),
            List.Location_categories(cats,limit,offset),
            List.Name_categories(cats),
            List.Count_location_categories(cats)
        ])
    }).then(data => {
        let totalPage = Math.ceil(data[5][0].count / limit);
        res.render('danhsach.html', {
            title: data[4][0].name_categories,
            citys: data[0],
            categories: data[1],
            sub_category : data[2],
            location : data[3],
            name_cats : data[4][0],
            totalPage : totalPage,
            currentPage: page
        })
    })
        .catch(error => {
            console.log(error.message)
        });
});

// RENDER CATEGORY
router.get('/sub_cat/:id', function (req, res) {
    let sub_cat = req.params.id;
    let page = req.query.page || 1;
    let limit = pagination.pagination;
    let offset = (page - 1) * limit;
    db.task(t => {
        return t.batch([
            Layout.City(),
            Layout.Categories(),
            Layout.Sub_category(),
            List.Location_sub_category(sub_cat,limit,offset),
            List.Name_sub_category(sub_cat),
            List.Count_location_sub_category(sub_cat)
        ])
    }).then(data => {
        let totalPage = Math.ceil(data[5][0].count / limit);
        res.render('danhsach.html', {
            title: data[4][0].name_castegory,
            citys: data[0],
            categories: data[1],
            sub_category : data[2],
            location : data[3],
            name_sub : data[4][0],
            totalPage : totalPage,
            currentPage: page
        })
    })
        .catch(error => {
            console.log(error.message)
        });
});
// RENDER SUB_CATEGORY THUỘC CITY
router.get('/city/:city/sub_cat/:sub', function (req, res) {
    let city = req.params.city;
    let sub_cat = req.params.sub;
    let page = req.query.page || 1;
    let limit = pagination.pagination;
    let offset = (page - 1) * limit;
    db.task(t => {
        return t.batch([
            Layout.City(),
            Layout.Name_city(city),
            Layout.Categories(),
            Layout.Sub_category(),
            Layout.Districts(city),
            List.Location_city_sub_category(city,sub_cat,limit,offset),
            List.Name_sub_category(sub_cat),
            List.Count_location_city_sub_category(city,sub_cat)
        ])
    }).then(data => {
        let totalPage = Math.ceil(data[7][0].count / limit);
        res.render('danhsach.html', {
            title :data[1].name + ' - ' + data[6][0].name_castegory,
            citys: data[0],
            name_ci: data[1],
            categories: data[2],
            sub_category : data[3],
            districts: data[4],
            location : data[5],
            name_sub : data[6][0],
            totalPage : totalPage,
            currentPage: page
        })
    })
        .catch(error => {
            console.log(error.message)
        });
});
// RENDER SUB_CATEGORY THUỘC DISTRICTS
router.get('/city/:city/districts/:dis/sub_cat/:sub', function (req, res) {
    let city = req.params.city
    let dis = req.params.dis
    let sub_cat = req.params.sub
    let page = req.query.page || 1;
    let limit = pagination.pagination;
    let offset = (page - 1) * limit;
    db.task(t => {
        return t.batch([
            Layout.City(),
            Layout.Categories(),
            Layout.Sub_category(),
            Layout.Districts(city),
            Layout.Name_districts(dis),
            List.Location_city_districts_category(city,dis,sub_cat,limit,offset),
            List.Name_sub_category(sub_cat),
            List.Count_location_city_districts_category(city,dis,sub_cat)
        ])
    }).then(data => {
        let totalPage = Math.ceil(data[7][0].count / limit);
        res.render('danhsach.html', {
            title :data[4][0].name_districts + ' - ' + data[6][0].name_castegory,
            citys: data[0],
            categories: data[1],
            sub_category : data[2],
            districts: data[3],
            name_dis : data[4][0],
            location : data[5],
            name_sub : data[6][0],
            totalPage : totalPage,
            currentPage: page
        })
    })
        .catch(error => {
            console.log(error.message)
        });
});

// ------------- RENDER CHI TIẾT ĐỊA ĐIỂM----------------

router.get('/sub_cat/:cat/detail/:id', function (req, res) {
    let cat = req.params.cat;
    let id = req.params.id;
    db.task(t => {
        return t.batch([
            Chitiet.detail(id),
            Chitiet.detail_img(id),
            Chitiet.detail_correlate(cat),
            Layout.Categories(),
            Layout.Sub_category(),
            Layout.City()
        ])
    }).then(data => {
            res.render('chitiet.html', {
                title: data[0][0].name_location,
                datas : data[0],
                album : data[1],
                correlate : data[2],
                categories: data[3],
                sub_category : data[4],
                citys : data[5]
            });
        })
        .catch(error => {
            console.log(error.message)
        });
});

router.get('/city/:city/sub_cat/:cat/detail/:id', function (req, res) {
    let city = req.params.city
    let cat = req.params.cat;
    let id = req.params.id;
    db.task(t => {
        return t.batch([
            Chitiet.detail(id),
            Chitiet.detail_img(id),
            Chitiet.detail_correlate(cat),
            Layout.Categories(),
            Layout.Sub_category(),
            Layout.City(),
            Layout.Name_city(city),
            Layout.Districts(city)
        ])
    }).then(data => {
        res.render('chitiet.html', {
            title: data[0][0].name_location,
            datas : data[0],
            album : data[1],
            correlate : data[2],
            categories: data[3],
            sub_category : data[4],
            citys : data[5],
            name_ci: data[6],
            districts: data[7]
        });
    })
        .catch(error => {
            console.log(error.message)
        });
});


router.get('/city/:city/districts/:dis/sub_cat/:cat/detail/:id', function (req, res) {
    let city = req.params.city;
    let dis = req.params.dis;
    let cat = req.params.cat;
    let id = req.params.id;
    db.task(t => {
        return t.batch([
            Chitiet.detail(id),
            Chitiet.detail_img(id),
            Chitiet.detail_correlate(cat),
            Layout.Categories(),
            Layout.Sub_category(),
            Layout.City(),
            Layout.Name_districts(dis),
            Layout.Districts(city)
        ])
    }).then(data => {
        res.render('chitiet.html', {
            title: data[0][0].name_location,
            datas : data[0],
            album : data[1],
            correlate : data[2],
            categories: data[3],
            sub_category : data[4],
            citys : data[5],
            name_dis : data[6][0],
            districts: data[7]
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



module.exports = router;
