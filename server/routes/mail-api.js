const express = require('express');
const router = express.Router();

var nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const { readBufferWithDetectedEncoding } = require('tslint/lib/utils');



/**
 * Documentation on how to encript the password
 * https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
 */
  



  router.post('/send', function(req, res, next) {

    console.log(req.body)
    
  //   const from = req.body.from,
  //   const recepient=  req.body.recepient,
  //   const subject= req.body.subject,
  //   const information = req.body.information
  

  // console.log('body', from, recepient, subject, information)
    
    // Mail.create(m, function(err, Mail) {
    //   console.log('Mail',Mail)
    //   if (err) {
    //     console.log(err);
    //     return next(err);
    //   } else {
    //     console.log(Mail);
    //     res.json(Mail);
  
    //   }
    // });

    const oauth2Client = new OAuth2(
      clientId= '66009198423-5ouuuj9t7ilpfih7jc2gbb890u5vg91a.apps.googleusercontent.com',
      clientSecret='J2iIh14sxNDmOS5ojo8pP4Th',
      "https://developers.google.com/oauthplayground" // Redirect URL
    );
    
    oauth2Client.setCredentials({
      refresh_token: "1//043XbDLIJHDlGCgYIARAAGAQSNwF-L9IrvgreDHRevqHeowJZZHD0z3PtMgeUFZPy0SbgWSJIl4EisQh0VEWXpSRNWmzyxCMYG3E"
    });
    const accessToken = oauth2Client.getAccessToken()
    
 console.log('accesstoken', accessToken)

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          type: 'OAuth2',
          user: 'gabo797@gmail.com',
          clientId: '66009198423-5ouuuj9t7ilpfih7jc2gbb890u5vg91a.apps.googleusercontent.com',
          clientSecret: 'J2iIh14sxNDmOS5ojo8pP4Th',
          refreshToken: "1//043XbDLIJHDlGCgYIARAAGAQSNwF-L9IrvgreDHRevqHeowJZZHD0z3PtMgeUFZPy0SbgWSJIl4EisQh0VEWXpSRNWmzyxCMYG3E",
          accessToken: accessToken
          
      },
      
      tls: {
        rejectUnauthorized: false
      }
  });
  transporter.set('oauth2_provision_cb', (user, renew, callback) => {
    let accessToken = userTokens[user];
    if(!accessToken){
        return callback(new Error('Unknown user'));
    }else{
        return callback(null, accessToken);
    }
});

    var mailOptions = {
      from: req.body.from,
      to: req.body.recipient,
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.html
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
  });
  

  
  module.exports = router;