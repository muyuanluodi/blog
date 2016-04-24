var express = require('express');
//路由的实例
var router = express.Router();

/* GET users listing. */
//
router.get('/post', function(req, res, next) {
  res.render('index', { title: '文章' });
});
module.exports = router;
