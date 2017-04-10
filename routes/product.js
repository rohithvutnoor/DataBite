var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
/* GET home page. */

/* GET users listing. */
router.get('/', function(req, res, next) {

    res.render('product',{
        title:"products",
        name:"nothing"
    });
});

function insertTransaction(cb){
    var transaction = function(itemList){
        this.itemList = itemList;
    };
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var productCollection = db.collection('items');
        console.log("Connected successfully to server3");
        var collection3 = db.collection('transactions');
        var transact1 = new transaction(cb);
        var ranks = [];
        var names = [];
        for(var v=0;v<cb.length;v++){
            ranks.push(parseInt(cb[v].split("@").pop(-1)));
            names.push(cb[v].substr(0,cb[v].indexOf('@')));
            // names.push(cb[v].split("@").pop(0));
            console.log(names[v]+" "+ranks[v]);
        }

        for(var p=0;p<cb.length;p++){
            if(ranks[p]>0){
        db.collection('items').update(
            {name: names[p]},
            {
                $set: {rank:ranks[p]+1 }
            }, function (err, results) {
                if(err){
                    console.log("Error changing ");
                }else{
                    console.log("changed ");
                    //callback();
                }
            });
            }
        }

        collection3.insertMany([
            transact1
        ], function(err, result) {
            console.log("Inserted Transaction into the collection transactions");
            //callback(result);
        });

        function calculate(callback) {
            productCollection.find({}).toArray(function (err, productList){
                var rnk = productList[11].rank;
                console.log(rnk);

                callback(productList); //Once you are done do `callback()
                // `
            });
        };


        calculate(function(result) {

            //setTimeout(function () {

            //}, 700);

        });
        db.close();

    });

};

router.post('/order',function(req,res, next) {
    var cb = req.body.cart;
    console.log(cb);
    insertTransaction(cb);

        res.render('order', {
            title: 'Home',
            name:"nothing"
        });

});

var url = 'mongodb://localhost:27017/sampleApriori';
//var db = MongoClient.connect("mongodb://localhost:27017/exampleDb");
var sd= [];
var itd=[];
var mine2 = function(required) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server2");
        //insertDocs(db, function() {
        //  db.close();
        //});
        //insertDocuments(db, function() {
        //  db.close();
        //});
        TransactionRecord(db, required, function() {
            db.close();
        });

        //buildProducts(db, function () {
        //db.close();
        //});

        db.close();
    });
    return sd;
};
var currentItem = [];
function mine3(req) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server1");

        var productCollection = db.collection('items');

        function calculate(callback)
        {
            var c = productCollection.find({"name":req});//, function (err, pro){
            c.each(function(err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    itd.push(doc);
                    //console.log(doc.price);
                } else {
                    callback();
                }
            });
            //    if(err)
            //        console.log(err);
            //    else{
            //    console.log(pro.price);
            //    callback(pro);
            //    } //Once you are done do `callback()`
            //});

        };

        calculate(function(result) {

            //console.log(result.price);
            //return result;
        });
        db.close();
    });
    setTimeout(function () {
        console.log(itd[0].price);
    }, 500);
    return itd[0];
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



function TransactionRecord(db, required, callback) {
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
    developItemSets(db,transactions, required);
    //console.log(currentItemSubSets);

};



var developItemSets = function(db, transCol, requiredItem) {
    var col = db.collection(transCol);
    //var transactions = [];
    //var cursor = collection.find({});
    // cursor.each();
    var currentSet = [];
    var mineset = [];
    function doit(callback) {
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


            var findAvailable = function (item1, item2, seta) {
                //console.log(item1+" - "+item2);
                var count = 0;
                for (var x = 0; x < seta.length; x++) {
                    for (var z = 0; z < seta[x].length; z++) {
                        //console.log(seta[x][z]);
                        if (seta[x][z] == item2)
                            count++;
                    }
                }
                return count;
            };


            var findConfidentSet = function (set, required) {
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
                    if (required != dats[az])
                        cn = findAvailable(required, dats[az], set);
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
                    cn = 0;
                }
                ;
                //console.log("\nBreak Down2\n\n");
                //console.log(sortList);
                return sortList;
            };

            var finalSet = findConfidentSet(currentSet, requiredItem);
            //console.log(finalSet);
            for(var i=0;i<finalSet.length;i++){
                mineset.push(finalSet[i]);
            }
            callback(finalSet);
        });
    };
    var sc = doit(function(result){

        console.log(result);
        setTimeout(function () {
            for(var i=0;i<result.length;i++){
                sd.push(result[i]);
            }
            //console.log(sc);//return result;
        }, 500);

    });
    setTimeout(function () {
        console.log(sd);//return result;
    }, 1000);
};





//1
router.get('/sugarcane', function(req, res, next) {

    var rcmnd = mine2("sugarcane");
    mine3("sugarcane");

    setTimeout(function () {
        res.render('product', {
            title:"sugarcane",
            name:"sugarcane",
            data:rcmnd,
            currentItem:itd[0]
        });
    }, 2500);

});

//2
router.get('/rice', function(req, res, next) {
    var rcmnd = mine2("rice");
    setTimeout(function () {
    res.render('product', {
        title:"rice",
        name:"rice",
        data:rcmnd
    });
    }, 1600);
});

//3
router.get('/potato', function(req, res, next) {
    var rcmnd = mine2("potato");
    setTimeout(function () {
    res.render('product', {
        title:"potato",
        name:"potato",
        data:rcmnd
    });
    }, 1500);
});

//4
router.get('/wheat', function(req, res, next) {
    var rcmnd = mine2("wheat");
    setTimeout(function () {
    res.render('product', {
        title:"wheat",
        name:"wheat",
        data:rcmnd
    });
    }, 1500);
});

//5
router.get('/onion', function(req, res, next) {
    var rcmnd = mine2("onion");
    setTimeout(function () {
    res.render('product', {
        title:"onion",
        name:"onion",
        data:rcmnd
    });
    }, 1500);
});

//6
router.get('/maize', function(req, res, next) {
    var rcmnd = mine2("maize");
    setTimeout(function () {
    res.render('product', {
        title:"maize",
        name:"maize",
        data:rcmnd
    });
    }, 1500);
});

//7
router.get('/banana', function(req, res, next) {
    var rcmnd = mine2("banana");
    setTimeout(function () {
    res.render('product', {
        title:"banana",
        name:"banana",
        data:rcmnd
    });
    }, 1500);
});

//8
router.get('/cashew', function(req, res, next) {
    var rcmnd = mine2("cashew");
    setTimeout(function () {
    res.render('product', {
        title:"cashew",
        name:"cashew",
        data:rcmnd
    });
    }, 1500);
});

//9
router.get('/guava', function(req, res, next) {
    var rcmnd = mine2("guava");
    setTimeout(function () {
    res.render('product', {
        title:"guava",
        name:"guava",
        data:rcmnd
    });
    }, 1500);
});

//10
router.get('/sugarcane', function(req, res, next) {
    var rcmnd = mine2("sugarcane");
    setTimeout(function () {
    res.render('product', {
        title:"products",
        name:"banana1",
        data:rcmnd
    });
    }, 1500);
});

//10
router.get('/pineapple', function(req, res, next) {
    var rcmnd = mine2("pineapple");
    setTimeout(function () {
    res.render('product', {
        title:"pineapple",
        name:"pineapple",
        data:rcmnd
    });
    }, 1500);
});

//10
router.get('/custardapple', function(req, res, next) {
    var rcmnd = mine2("custardapple");
    setTimeout(function () {
    res.render('product', {
        title:"custardapple",
        name:"custardapple",
        data:rcmnd
    });
    }, 1500);
});



module.exports = router;
