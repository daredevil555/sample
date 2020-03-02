var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = new Schema({

  email: {type:String,},
  question1: { type: String, },
  question2: { type: String, },
  question3: { type: String, },
  question4: { type: String, },
  question5: { type: String, },
  question6: { type: String, },
  question7: { type: String, },
  question8: { type: String, },
  question9: { type: String, },
  question10: { type: String, },



});

module.exports = mongoose.model('student', studentSchema);