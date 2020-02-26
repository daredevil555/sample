var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = new Schema({

  student_name: { type: String, Required:  'student name cannot be left blank.' },

  branch:    { type: String,     Required:  'student branch cannot be left blank.'},

  interest: { type: String ,    Required:  'student intrest cannot be left blank'}

});

module.exports = mongoose.model('student', studentSchema);
