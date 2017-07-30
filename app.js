var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var error = require('./routes/error');
var product = require('./routes/product');
var order = require('./routes/order');

var MongoClient  = require('mongodb').MongoClient;
var url = 'mongodb://rohithvutnoor:rohithvutnoor@ds034677.mlab.com:34677/databitedb';
//"mongodb://localhost/sampleApriori";//databitedb
var str = "";
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/product', product);
app.use('/error', error);
app.use('/product/order', order);

app.route('/items').get(function(req,res){
  MongoClient.connect(url, function (err,db){
    var cursor =db.collection('items').find();
    cursor.each(function(err,item){
      if(item!=null)
        str = str+"Name " + item.name+"</br>";
    });
    res.send(str);
  });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
