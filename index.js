var express = require('express');

var app = express();
var cors = require('cors');

var User = require('./userfunc');
var aut = require('./proto');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passy = require('passport-local-mongoose-email');
var body = require('body-parser');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var MailerOps = require('./proto');
var Mail = new MailerOps;
app.use(body.urlencoded({extended: true}));
app.use(require('express-session')({
	secret:'fuck',
	resave:false,
	saveUnitialized: false
}));
app.use(cors())

passport.use(User.User.createStrategy());
passport.serializeUser(User.User.serializeUser());
passport.deserializeUser(User.User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/ConnectFa');


const hashAlg = 'iwewqjiqjE1ij2jij21FCsaoa';
/* Days of Week Arrays */
var DaysOfWeek = { /* set variable to 0 if time slot is chosen by a user */
Monday: {a:1, b:2, c:3, d:4},
Tuesday: {a:1, b:2, c:3, d:4},
Wednesday:{a:1, b:2, c:3, d:4},
}
// use static serialize and deserialize of model for passport session support

/* Test and generate json web token */
app.get('/', function(req, res){
	res.sendFile(__dirname + '/loginTest.html');

	
});

app.get('/json', function(req, res){
	var ConfirmLink; /* Token Generator */
	var use;
	var WebToken = jwt.sign({user}, hashAlg);
	var TokenLink = JSON.stringify(WebToken);
    ConfirmLink = 'http://127.0.0.1:3000/' + TokenLink;
	/* Send email link to jermaine101@msn.com */
    Mail.Win('jermainebooker101@gmail.com', ConfirmLink, function (err, messageInfo){
		if (err){
			console.log('Sorry, Your message was not sent, please try again!');
		}
		console.log(messageInfo.messageId);
		
		
	});
 /* open database for username and send json webtoken to it */
	
	
	
	
});






app.get('/j', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.json({
		red:['first', 'second', 'third']
		
		
	})
 /* open database for username and send json webtoken to it */
});
	/*           submit data into   */                          
	
		

app.get('/i', function(req, res){  /* use linear sear*/
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ValuesHeld = [];
	User.Days.find({Day:'Monday'}, function (err, mon){
			User.Days.find({Day:'Tuesday'}, function (err, tues){
	          User.Days.find({Day:'Wednesday'}, function (err, wed){


			  
			  var DaysOfWeek = { /* set variable to 0 if time slot is chosen by a user */
                                Monday: {a:1, b:2, c:3, d:4},
                                Tuesday: {a:1, b:2, c:3, d:4},
                                Wednesday:{a:1, b:2, c:3, d:4},
                                }
			for (var check in DaysOfWeek.Monday){
			      if (DaysOfWeek.Monday[check] == mon[0].day){
					  DaysOfWeek.Monday[check] = 0;
					  console.log(mon[0].day);
					  
				  }
				  console.log(DaysOfWeek.Monday[check])

			}	
    			for (var check in DaysOfWeek.Tuesday){
			      if (DaysOfWeek.Tuesday[check] == tues[0].day){
					  DaysOfWeek.Tuesday[check] = 0;
					  
				  }
				  				  console.log(DaysOfWeek.Tuesday[check])

			}	
			
			for (var check in DaysOfWeek.Wednesday){
			      if (DaysOfWeek.Wednesday[check] == wed[0].day){
					  DaysOfWeek.Wednesday[check] = 0;
					  
				  }
				  console.log(DaysOfWeek.Wednesday[check])
			}	
			console.log(mon[1].day, tues[0].day, wed[0].day);
			/* Now return array with json */
			
            res.json({DaysOfWeek:DaysOfWeek})


			
	})			
	})
 

});
})
app.get('/insert', function(req, res){ /* change to a post and use this as the user submission process */
	/*           submit data into   */                          
	var BookingInput = new User.Days({username:'Jamess', Day:'Wednesday', day: 2 /* change input variables to req.user and req.body.day and Day */});
		

	BookingInput.save(function (err, resp){
		if (err){
			console.log(err);
		} else {
			console.log(resp)
	}		
});
 /* open database for username and send json webtoken to it */

});


var Params = ['UserName', 'TokenId'];
app.param('TokenId', function(req, res, next, id){
	
	
	
});

app.get('/Profile/:TokenId', function(req, res){
	res.sendFile(__dirname + '/loginTest.html');
	console.log(999);

	
});
app.get('/LogIn', function(req, res){
	res.sendFile(__dirname + '/loginTest.html');

	
});


app.post('/LogIn',passport.authenticate('local'), function(req, res){

console.log(req.user.username);



});







app.get('/LoggedIn', function(req, res){
	res.sendFile(__dirname + '/loginTest.html');

	
});
app.post('/LoggedIn', function(req,res){ /* Login Tester */
var ConfirmLink; /* Token Generator */
	var user;
	var WebToken = jwt.sign({user}, hashAlg);
	var TokenLink = JSON.stringify(WebToken);
    ConfirmLink = 'http://127.0.0.1:3000/' + TokenLink;
	User.User.register({username:req.body.username}, req.body.password, function(err, user){
		if (err){
			console.log('Test failed');
		} else {
		var NewToken = new User.Token({username:req.body.username, Token:TokenLink, Verify: true})
		NewToken.save(function(err, data){
			if (err){
				console.log('failed');
			}
		console.log('token is in');
		});
		passport.authenticate('local')(req, res, function (){
         console.log('in brah');
		});
		}
		
	
	
});
});

app.get('/LoggedIn', function(req, res){
	res.sendFile(__dirname + '/loginTest.html');

	
});






app.listen(3000, function (req, res){
	
	console.log('listening sir!');
})