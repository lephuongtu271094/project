var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('trangchu.html', { title: 'Home' });
});
router.get('/chitiet', function(req, res, next) {
  res.render('chitiet.html', { title: 'Chi Tiết' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin.html', { title: 'New book' });
});


router.get('/admin/posts_list', function(req, res, next) {
  res.render('posts_list.html', { title: 'Posts List' });
});

router.get('/admin/user', function(req, res, next) {
  res.render('user_list.html', { title: 'List User' });
});

router.get('/admin/user_admin', function(req, res, next) {
  res.render('user_admin.html', { title: 'List User Admin' });
});
router.get('/admin/posts_categories', function(req, res, next) {
  res.render('categories.html', { title: 'Categories' });
});
module.exports = router;
