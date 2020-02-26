var express = require('express');
var csv = require('csv-express');
var mongoose = require('mongoose');
var router = express.Router();

var student = require('../models/student');

// connecting to database #mongodb
// let url = process.env.DATABASEURL || "mongodb://localhost/csv";
//  mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true },function(err,database){
//     db=database;
//  });

// connecting to mlab

const uri = "mongodb+srv://Eshwar:ani4anirudh1999%23@cluster-info-rm5w6.mongodb.net/csv?retryWrites=true&w=majority";

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => console.log(`Connected to mlab..!!`))
.catch(err => console.log(`Database connection error: ${err.message}`));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET to obtain the form page
router.get('/form',function(req,res,next){
  res.render('form');
});

// POST to save the details of the user
router.post('/saveform',function(req,res,next){
  var data = {
    student_name:req.body.name,
    branch:req.body.branch,
    interest:req.body.interest
  }

 student.create(data,function(err,result){
  if(err) console.log(err);
  console.log("Inserted sucessfully");
});
  res.render('form');
});

// GET to show all the students details
router.get('/tocsv',function(req,res,next){
  // sending the obtained array
  student.find({}, function(err, products) {
    // console.log(products);
    if (err)
    console.log(err);

    res.render('mainpage', {list: products });

});
});

router.get('/exportcsv', function(req, res, next) {

  var filename   = "products.csv";

  var dataArray;

  student.find().lean().exec({}, function(err, products) {

      if (err) res.send(err);
      
      res.statusCode = 200;

      res.setHeader('Content-Type', 'text/csv');

      res.setHeader("Content-Disposition", 'attachment; filename='+filename);

      res.csv(products, true);

  });

});

module.exports = router;
