var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var path = require('path');
//var request = require('request');
//var cheerio = require('cheerio');
var fs = require('fs');

var url = 'mongodb://rohithvutnoor:rohithvutnoor@ds034677.mlab.com:34677/databitedb';
//'mongodb://localhost:27017/sampleApriori';
// CloudDB : mlab :    'mongodb://rohithvutnoor:rohithvutnoor@ds034677.mlab.com:34677/databitedb'
var data = ["",""];
/*
var url2 = "http://agricoop.nic.in/";

request(url2,function(err,res,body){
  var $ =  cheerio.load(body);
  $('a', 'div.item-list').each(function(){
    var title = $(this);
    var link = $(this).attr('href');
    data.push({
      "title":title.text(),
      "link":"http://agricoop.nic.in"+link
    });
  });
  console.log(data);
});
*/
router.get('/', function(req, res, next) {




    MongoClient.connect(url, function (err, db) {
      assert.equal(null, err);
      console.log("Connected Successfully to Server");
      var productCollection = db.collection('items');

      function productRendering(callback) {
        productCollection.find({}).toArray(function (err, productList) {
          var sortProductList = productList.slice(0);
          sortProductList.sort(function (a, b) {
            return b.rank - a.rank;
          });


          //Don't forget to give the calculated value to the callback function
          callback(sortProductList); //Once you are done do `callback()`
        });
      }
      productRendering(function (result) {
        res.render('index', {
          title: "DataBite",
          products: result,
          remote: data
        });
        console.log(result);
      });

      db.close();
    });
});
module.exports = router;
