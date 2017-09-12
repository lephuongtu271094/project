const express = require('express');
const router = express.Router();
const app = express()
const multer = require('multer')
const shortid = require('shortid')
const {db, pagination} = require('../pgp')
const ListBook = require('../models/list_book')
const ListAdmin = require('../models/list_admin')
const ListCat = require('../models/list_cat')
const Posts = require('../models/posts')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //nơi chứa file upload
        cb(null, './public/image_location')
    },
    filename: function (req, file, cb) {
        // cb(null, shortid.generate() + '-' + file.originalname)
        // Tạo tên file mới cho file vừa upload
        cb(null, file.originalname.replace(" ", "-"))
    }

})

function fileFilter(req, file, cb) { // hàm phân loại file upload
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') { // nếu là đuôi png,jpg,jpeg
        // nếu là file image thì upload file.
        cb(null, true)
    } else {
        // nếu không phải thì bỏ qua phần upload
        cb(new Error(file.mimetype + ' is not accepted'))
    }
}
// các thuộc tính của multer gán cho biến upload
app.upload = multer({storage: storage , fileFilter:fileFilter});

let cpUpload = app.upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'album', maxCount: 12 }]);

//-------------------------------------------ADMIN-------------------------------------------


router.get('/', function (req, res, next) {
    ListBook.BookList()
        .then(data => {
            res.render('admin.html', {
                title: 'New book',
                listBook: data

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
                    detailBook: data
                });
            }).catch(err => {
            console.log(err.message)
        })

    })
    .post((req, res) => {
        let id = req.body.id_book;
        let stt = req.body.lienlac;
        ListBook.Update_status(id, stt)
            .then(() => {
                res.redirect('/admin')
            }).catch(err => {
            console.log(err.message)
        })
    });


router.get('/posts_list', function (req, res) {
    ListAdmin.listPost()
        .then(data => {
            res.render('posts_list.html', {
                title: 'Posts List',
                data: data
            });
        }).catch(err => console.log(err.message))

});

router.route('/posts_categories')
    .get(function (req, res) {
        ListCat.Cat()
            .then(data => {
                res.render('categories.html', {
                    title: 'Categories',
                    cat: data
                });
            }).catch(err => console.log(err.message))
    })
    .post(function (req, res) {
        let name = req.body.Name
        let cat = req.body.cas
        req.checkBody('Name', 'Tên category không được để trống').notEmpty();

        let errors = req.validationErrors();

        if (errors) {
            ListCat.Cat()
                .then(data => {
                    res.render('categories.html', {
                        errors: errors[0],
                        title: 'Categories',
                        cat: data
                    });
                }).catch(err => console.log(err.message))
        } else {
            if (cat == 0) {
                ListCat.insert_cat(name)
                    .then(data => {
                        res.redirect('/admin/posts_categories')
                    }).catch(err => console.log(err.message))
            } else {
                ListCat.insert_sub_cat(name, cat)
                    .then(data => {
                        res.redirect('/admin/posts_categories')
                    }).catch(err => console.log(err.message))
            }
        }

    });
router.route('/posts_categories/:id')
    .get((req, res) => {
        let cat = req.params.id
        db.task(t => {
            return t.batch([
                ListCat.Cat(),
                ListCat.categories(cat)
            ])
        }).then(data => {
            res.render('categories.html', {
                title: 'Categories',
                cat: data[0],
                category: data[1]
            })
        }).catch(err => console.log(err.message))
    })
    .post(function (req, res) {
        let cat = req.params.id
        let name = req.body.Name
        let cas = req.body.cas
        req.checkBody('Name', 'Tên category không được để trống').notEmpty();

        let errors = req.validationErrors();

        if (errors) {
            db.task(t => {
                return t.batch([
                    ListCat.Cat(),
                    ListCat.categories(cat)
                ])
            }).then(data => {
                console.log(errors[0])
                res.render('categories.html', {
                    title: 'Categories',
                    errors: errors[0],
                    cat: data[0],
                    category: data[1]
                })
            }).catch(err => console.log(err.message))
        } else {
            ListCat.update_categories(name, cas)
                .then(() => {
                    res.redirect('/admin/posts_categories/' + cat)
                })
        }
    })
    .delete((req, res) => {
        let cat = req.params.id
        ListCat.delete_categories(cat)
            .then(() => {
                res.redirect('/admin/posts_categories/')
            })
    });

router.route('/posts_categories/sub_cat/:id')
    .get((req, res) => {
        let sub_cat = req.params.id;
        db.task(t => {
            return t.batch([
                ListCat.Cat(),
                ListCat.sub_category(sub_cat)
            ])
        }).then(data => {
            res.render('categories.html', {
                title: 'Categories',
                cat: data[0],
                sub_category: data[1]
            })
        }).catch(err => console.log(err.message))
    })
    .post(function (req, res) {
        let sub_cat = req.params.id;
        let name = req.body.Name;
        req.checkBody('Name', 'Tên category không được để trống').notEmpty();

        let errors = req.validationErrors();

        if (errors) {
            db.task(t => {
                return t.batch([
                    ListCat.Cat(),
                    ListCat.sub_category(sub_cat)
                ])
            }).then(data => {
                res.render('categories.html', {
                    title: 'Categories',
                    errors: errors[0],
                    cat: data[0],
                    sub_category: data[1]
                })
            }).catch(err => console.log(err.message))
        } else {
            ListCat.update_sub_category(name, sub_cat)
                .then(() => {
                    res.redirect('/admin/posts_categories/sub_cat/' + sub_cat)
                })
        }
    })
    .delete((req, res) => {
        let sub_cat = req.params.id
        ListCat.delete_sub_category(sub_cat)
            .then(() => {
                res.redirect('/admin/posts_categories/')
            })
    });


router.get('/posts', function (req, res) {
    db.task(t => {
        return t.batch([
            Posts.getCity(),
            Posts.getSubCat()
        ])
    }).then(data => {
        console.log(data[0])
        res.render('posts.html', {
            title: 'Posts',
            city: data[0],
            sub_category: data[1]
        })
    }).catch(err => console.log(err.message))

});
router.route('/posts/:id')
    .get(function (req, res) {
        let city = req.params.id
        db.task(t => {
            return t.batch([
                Posts.getCity(),
                Posts.getSubCat(),
                Posts.getDistricts(city)
            ])
        }).then(data => {
            res.render('posts.html', {
                title: 'Posts',
                city: data[0],
                sub_category: data[1],
                districts : data[2]
            })
        }).catch(err => console.log(err.message))
    })
    .post(cpUpload,function (req,res) {
        let city = req.params.id
        req.checkBody('districts','Hãy Lựa chọn Quận / Huyện').isInt();
        req.checkBody('category', 'Hãy Lựa chon danh mục').isInt();
        req.checkBody('nameLocation', 'Tên không được để trống').notEmpty();
        req.checkBody('addressLocation', 'Địa điểm không được để trống').notEmpty();
        req.checkBody('latitude', 'Hãy Lựa chọn địa điểm trên bản đồ').notEmpty();


        let errors = req.validationErrors()

        if(errors){
            db.task(t => {
                return t.batch([
                    Posts.getCity(),
                    Posts.getSubCat(),
                    Posts.getDistricts(city)
                ])
            }).then(data => {
                res.render('posts.html', {
                    errors:errors,
                    title: 'Posts',
                    city: data[0],
                    sub_category: data[1],
                    districts : data[2]
                })
            })
        }else{
            let id_location = shortid.generate();

            let location = {};

            location['districts'] = req.body.districts;
            location['category'] = req.body.category;
            location['address'] = req.body.addressLocation;
            location['name'] = req.body.nameLocation;
            location['rate'] = req.body.rate;
            location['lat'] = req.body.latitude;
            location['long'] = req.body.longitude;
            location['time_open'] = req.body.open + ' - ' + req.body.close;
            location['id_location'] = id_location;
            location['show_location'] = false;

            let photo = {};

            photo['img'] =  req.files['photo'][0].filename;
            photo['show_img'] = true;
            photo['id_location'] = id_location;

            let album =[];

            req.files['album'].forEach(data => {
                let obj = {};
                obj['img'] = data.filename;
                obj['id_location'] = id_location;
                obj['show_img'] = false;
                album.push(obj)
            });

            Posts.insertLocation(location,photo,album)
                .then(() => {
                    res.redirect('/admin/posts_list')
                })

        }
    });
router.route('/posts/:id/:location')
    .get(function (req, res) {
        let city = req.params.id
        db.task(t => {
            return t.batch([
                Posts.getCity(),
                Posts.getSubCat(),
                Posts.getDistricts(city)
            ])
        }).then(data => {
            res.render('posts.html', {
                title: 'Posts',
                city: data[0],
                sub_category: data[1],
                districts : data[2]
            })
        }).catch(err => console.log(err.message))
    })
    // .post(cpUpload,function (req,res) {
    //     let city = req.params.id
    //     req.checkBody('districts','Hãy Lựa chọn Quận / Huyện').isInt();
    //     req.checkBody('category', 'Hãy Lựa chon danh mục').isInt();
    //     req.checkBody('nameLocation', 'Tên không được để trống').notEmpty();
    //     req.checkBody('addressLocation', 'Địa điểm không được để trống').notEmpty();
    //     req.checkBody('latitude', 'Hãy Lựa chọn địa điểm trên bản đồ').notEmpty();
    //
    //
    //     let errors = req.validationErrors()
    //
    //     if(errors){
    //         db.task(t => {
    //             return t.batch([
    //                 Posts.getCity(),
    //                 Posts.getSubCat(),
    //                 Posts.getDistricts(city)
    //             ])
    //         }).then(data => {
    //             res.render('posts.html', {
    //                 errors:errors,
    //                 title: 'Posts',
    //                 city: data[0],
    //                 sub_category: data[1],
    //                 districts : data[2]
    //             })
    //         })
    //     }else{
    //         let id_location = shortid.generate();
    //
    //         let location = {};
    //
    //         location['districts'] = req.body.districts;
    //         location['category'] = req.body.category;
    //         location['address'] = req.body.addressLocation;
    //         location['name'] = req.body.nameLocation;
    //         location['rate'] = req.body.rate;
    //         location['lat'] = req.body.latitude;
    //         location['long'] = req.body.longitude;
    //         location['time_open'] = req.body.open + ' - ' + req.body.close;
    //         location['id_location'] = id_location;
    //         location['show_location'] = false;
    //
    //         let photo = {};
    //
    //         photo['img'] =  req.files['photo'][0].filename;
    //         photo['show_img'] = true;
    //         photo['id_location'] = id_location;
    //
    //         let album =[];
    //
    //         req.files['album'].forEach(data => {
    //             let obj = {};
    //             obj['img'] = data.filename;
    //             obj['id_location'] = id_location;
    //             obj['show_img'] = false;
    //             album.push(obj)
    //         });
    //
    //         Posts.insertLocation(location,photo,album)
    //             .then(() => {
    //                 res.redirect('/admin/posts_list')
    //             })
    //
    //     }
    // });

router.get('/user', function (req, res, next) {
    res.render('user_list.html', {title: 'List User'});
});

router.get('/user_admin', function (req, res, next) {
    res.render('user_admin.html', {title: 'List User Admin'});
});

router.get('/login', function (req, res, next) {
    res.render('login.html', {title: 'Login'});
});
router.get('/new_user', function (req, res, next) {
    res.render('create_user.html', {title: 'New User Admin'});
});



module.exports = router;