var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passy = require('passport-local-mongoose');


var UserData = new Schema({
	username: String,
	password: String,
	grade: String
})

var TokenSchema = new Schema({
	username: String,
	Token: String,
	Verify: [Boolean]
	
})



var Dayschem = new Schema({
	username: [String],
	Day: String,
	day: Number
	
	
	
})
var Token = mongoose.model('Token', TokenSchema);
var Days = mongoose.model('Days', Dayschem);
UserData.plugin(passy);
var User = mongoose.model('User',UserData);
module.exports = {
	User:User,
	Token:Token,
	Days:Days
}
