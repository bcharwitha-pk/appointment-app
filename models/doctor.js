var mongoose = require('mongoose');

var doctorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    dept: {type: String, required: true},
    ailments: {type: Array, required: true},
    picture: {type: String, default: ''},
    timing: {type: Array, required: true},
    createdOn: {type: Date, default: Date.now()}
});

var Doctor = mongoose.model('Doctor', doctorSchema, 'doctor');
module.exports = Doctor
