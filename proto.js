var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

function Auth (){}



Auth.prototype.Win = function(ReceiverAddress, TokenLink, callback){
	/* node mailer integration file */
  let transporter = nodemailer.createTransport({ /* acc authentication and transport service */
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'jermainebooker101@gmail.com',
    pass: 'imaboss13'
  },
  tls: {
    rejectUnauthorized: false
  }
});


let HelperOptions = {          
  from: '"BabyBookers.com" <jermainebooker101@gmail.com',
  to: ReceiverAddress,
  subject: 'Registration Confirmation for Us!',
  text:"Thank you for choosing our services and signing up with us!" +
       "There is one last step to being with us! Just click this link"  + TokenLink,
  
};



  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("The message was sent!");
    console.log(info);
	
	  callback(error, info);	
  });

   /* return cb with error test and info of ID */
	
	
}











module.exports = Auth;