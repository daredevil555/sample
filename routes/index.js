var express = require('express');
var csv = require('csv-express');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var router = express.Router();

var student = require('../models/student');

// connecting to database #mongodb
// let url = process.env.DATABASEURL || "mongodb://localhost/csv";
//  mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true },function(err,database){
//  });

// code for nodemailer
var smtpTransport = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'mrcetclub@gmail.com',
    pass: '#thedarkangel'
  }
});

// connecting to mlab
const uri = "mongodb+srv://Eshwar:ani4anirudh1999%23@cluster-info-rm5w6.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => console.log(`Connected to mlab..!!`))
.catch(err => console.log(`Database connection error: ${err.message}`));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET for responded
router.get('/responded',function(req,res){
  res.render('responded');
});

// POST to save the details of the user
router.post('/saveform',function(req,res,next){
  var data = {
    email:req.body.email,
    question1:req.body.optq1,
    question2:req.body.optq2,
    question3:req.body.optq3,
    question4:req.body.optq4,
    question5:req.body.optq5,
    question6:req.body.optq6,
    question7:req.body.optq7,
    question8:req.body.optq8,
    question9:req.body.optq9,
    question10:req.body.optq10,
  }

  student.findOne({email:data.email},function(err,result){
    if(err)
    console.log(err);
    if(result){
    res.redirect('/responded');
    }
    else{
       student.create(data,function(err,result){
          if(err) console.log(err);
          console.log("Inserted sucessfully");
          // Mail options to send mail
          var mailOptions = {
            to: data.email,
            from: 'mrcetclub@mail.com',
            subject: 'Find Your Twin',
            text: 'Hey, Folk \n' +
            'This is a confirmation that your response is recorded associated with this email. \nThank You \nteam findyourtwin' 
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            console.log('mail sent');
          });
        res.redirect('/thankyou');
        });
      }
  });

});

// GET for result
router.get('/thankyou',function(req,res){
  res.render('result');
});

// GET to show all the students details
router.get('/tocsv',function(req,res,next){
  // sending the obtained array
  student.find({}, function(err, products) {
    // console.log(products);
    if (err)
    console.log(err);

    res.render('data', {list: products });

});
});

// GET to export csv file
router.get('/exportcsv', function(req, res, next) {
  var filename   = "data.csv";
  student.find().lean().exec({}, function(err, data) {
      if (err) res.send(err);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader("Content-Disposition", 'attachment; filename='+filename);
      res.csv(data, true);
  });

});

module.exports = router;
