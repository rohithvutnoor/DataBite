var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
/* GET home page. */

var url = 'mongodb://localhost:27017/sampleApriori';
//var db = MongoClient.connect("mongodb://localhost:27017/exampleDb");

var mine2 = function() {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server2");
    //insertDocs(db, function() {
    //  db.close();
    //});
    //insertDocuments(db, function() {
    //  db.close();
    //});
    TransactionRecord(db, function() {
      db.close();
    });

    //buildProducts(db, function () {
      //db.close();
    //});

    db.close();
  });
};
/*var db = mongoose.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to Connect to Database Server', err);
  } else {
    console.log('Connection Established to Database Server');
  }
});*/
var item = function(name, rank){
  this.name = name;
  this.rank = rank;
};
var transaction = function(itemList){
  this.itemList = itemList;
};



function TransactionRecord(db, callback) {
  var data1 = ["rice", "custardapple", "cashew", "guava", "mango", "pineapple", "maize", "banana", "wheat", "potato", "onion", "sugarcane"];
  var data2 = ["rice", "sugarcane", "pineapple"];
  var data3 = ["pineapple", "rice", "guava"];
  var data4 = ["sugarcane", "maize", "potato"];
  var data5 = ["rice", "pineapple", "guava"];
  var data6 = ["rice", "pineapple", "potato"];
  var transact1 = new transaction(data1);
  var transact2 = new transaction(data2);
  var transact3 = new transaction(data3);
  var transact4 = new transaction(data4);
  var transact5 = new transaction(data5);
  var transact6 = new transaction(data6);

  var collection3 = db.collection('transactions');
  //console.log(collection3.find({}));



/* Insert Transactions
  collection3.insertMany([
      transact1,transact2,transact3,transact4,transact5,transact6
  ], function(err, result) {
    console.log("Inserted Transactions into the collection transactions");
    callback(result);
  });
*/
  var transactions = "transactions";
  developItemSets(db,transactions, "sugarcane");
  //console.log(currentItemSubSets);

};

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection1 = db.collection('items');
  // Insert some documents
  collection1.insertMany([
    {
      "name":"rice",
      "rank":1
    },
    {
      "name":"custardapple",
      "rank":1
    },
    {
      "name":"cashew",
      "rank":1
    },
    {
      "name":"guava",
      "rank":1
    },
    {
      "name":"mango",
      "rank":1
    },
    {
      "name":"pineapple",
      "rank":1
    },
    {
      "name":"maize",
      "rank":1
    },
    {
      "name":"banana",
      "rank":1
    },
    {
      "name":"wheat",
      "rank":1
    },
    {
      "name":"potato",
      "rank":1
    },
    {
      "name":"onion",
      "rank":1
    },
    {
      "name":"sugarcane",
      "rank":1
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(12, result.result.n);
    assert.equal(12, result.ops.length);
    console.log("Inserted 12 documents into the collection items");
    callback(result);
  });
};

Array.prototype.insert = function (index) {
  this.splice.apply(this, [index, 0].concat(this.slice.call(arguments, 1)));
};

var insertDocs = function(db, callback){
  var collection2 = db.collection('itemsSample');//Transaction   itemsSample
  // Insert some documents
  collection2.insertMany([
    {
      "name":"rice",
      "rank":1
    },
    {
      "name":"custardapple",
      "rank":1
    },
    {
      "name":"cashew",
      "rank":1
    },
    {
      "name":"guava",
      "rank":1
    },
    {
      "name":"mango",
      "rank":1
    },
    {
      "name":"pineapple",
      "rank":1
    },
    {
      "name":"maize",
      "rank":1
    },
    {
      "name":"banana",
      "rank":1
    },
    {
      "name":"wheat",
      "rank":1
    },
    {
      "name":"potato",
      "rank":1
    },
    {
      "name":"onion",
      "rank":1
    },
    {
      "name":"sugarcane",
      "rank":1
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(12, result.result.n);
    assert.equal(12, result.ops.length);
    console.log("Inserted 12 documents into the collection itemsSample");//itemsSample
    callback(result);
  });
};

var developItemSets = function(db, transCol, requiredItem) {
  var col = db.collection(transCol);
  //var transactions = [];
  //var cursor = collection.find({});
  // cursor.each();
  var currentSet = [];

    col.find({}).toArray(function (err, transactions) {
      //console.log(transactions);

      for (var z = 0; z < transactions.length; z++) {
        //console.log(transactions[z].itemList);
        for (var c = 0; c < transactions[z].itemList.length; c++) {
          //console.log(transactions[z].itemList[c]);
          if (transactions[z].itemList[c] == requiredItem) {
            currentSet.push(transactions[z].itemList);
          }
        }
      }
      //console.log(transactions[0].itemList[0]);

      //

  console.log(currentSet);


  var findAvailable = function(item1, item2, seta){
    //console.log(item1+" - "+item2);
    var count =0;
    for(var x=0; x<seta.length;x++) {
      for (var z = 0; z < seta[x].length; z++) {
        //console.log(seta[x][z]);
        if (seta[x][z] == item2)
          count++;
      }
    }
    return count;
  };


  var findConfidentSet = function(set) {
    var dats = ["rice", "custardapple", "cashew", "guava", "mango", "pineapple",
      "maize", "banana", "wheat", "potato", "onion", "sugarcane"];
    var unSortList = [];

    var cn = 0;
    //var max = 0;
    var setf = [];

    console.log("................................");
    //console.log(set);
    console.log("................................");


    for (var az = 0; az < dats.length; az++) {
      if ("sugarcane" != dats[az])
        cn = findAvailable("sugarcane", dats[az], set);
      unSortList.push(
          {
            "name": dats[az],
            "cnt": cn
          }
      );

      //12:11PM April 4 2017
      // 13:28PM April 4 2017


      var sortList = unSortList.slice(0);
      sortList.sort(function (a, b) {
        return b.cnt - a.cnt;
      });
      cn=0;
    };
    //console.log("\nBreak Down2\n\n");
    //console.log(sortList);
    return sortList;
  };

  var finalSet = findConfidentSet(currentSet);
  console.log(finalSet);
  //return currentSet;

    });
};

router.get('/hello', function(req, res, next) {
  mine2();
  res.render('index', {
        title: "DataBite",
        products: result
      }
  );
});

router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server1");

    var productCollection = db.collection('items');

    function calculate(callback)
    {
      productCollection.find({}).toArray(function (err, productList){
        var sortProductList = productList.slice(0);
        sortProductList.sort(function (a, b) {
          return b.rank - a.rank;
        });
        //var a = 1+2;
        //console.log(a);
        //Don't forget to give the calculated value to the callback function
        callback(sortProductList); //Once you are done do `callback()`
      });
    };

    calculate(function(result) {
      res.render('index', {
            title: "DataBite",
            products: result
          }
      );
      console.log(result);
      //return result;
    });
    db.close();
  });

});

module.exports = router;
