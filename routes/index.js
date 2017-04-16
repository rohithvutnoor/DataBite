var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/sampleApriori';

router.get('/', function(req, res, next) {

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected Successfully to Server");
    var productCollection = db.collection('items');

    function productRendering(callback) {
      productCollection.find({}).toArray(function (err, productList){
        var sortProductList = productList.slice(0);
        sortProductList.sort(function (a, b) {
          return b.rank - a.rank;
        });
        //Don't forget to give the calculated value to the callback function
        callback(sortProductList); //Once you are done do `callback()`
      });
    };

    productRendering(function(result) {
      res.render('index', {
            title: "DataBite",
            products: result
          });
      console.log(result);
    });

    db.close();
  });
});
module.exports = router;
