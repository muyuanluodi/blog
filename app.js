var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//解析cookie req.cookie 存放客户端提交的cookie
//req.cookie(key, value)
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//主页路由
var routes = require('./routes/index');
//用户路由
var users = require('./routes/users');
//文章路由
var articles = require('./routes/articles');

var app = express();
app.set('env', process.env.ENV);
// 设置模板存放目录 *****
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'html');
//指定HTML模板的渲染方法
app.engine('html',require('ejs').__express);

// 在把favicon放置到public目录下之后去掉注释
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

//处理content-type=json的请求体{"name":"zfpx"}
app.use(bodyParser.json());

//处理content-type = urlencoded去请求体
//extended:true使用querystring来将请求体的字符串转成对象
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//指定静态文件的目录 *****
app.use(express.static(path.join(__dirname, 'public')));

//指定路由 *****
app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);

// 捕获404错误并转发到错误处理中间件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 开发时的错误处理
// 将打印出错误的堆栈信息
//SET env = development
if (app.get('env') === 'development') {
  //错误处理中间件有四个参数
  //第一个参数是错误对象
  //如果有中间件出错了，会把请求转角给错误中间件来处理
  //不调用next，所以不往下执行
  app.use(function(err, req, res, next) {
    //设置状态码 
    res.status(err.status || 500);
    //渲染模板
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//生产环境下的错误处理
//不向用户暴露堆栈信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}//隐藏错误对象
  });
});


module.exports = app;
