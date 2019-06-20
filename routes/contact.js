var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});
//post route
router.post('/send', function (req, res, next){
    var transport = nodemailer.createTransport({
        //servicr and credentials
        service: 'Gmail',
        auth: {
            user: 'yourusername@gmail.com', //specify email id of sender
            pass: '************'            //specify password of sender's email id
        }
    });
    var mailOp = {
        from: 'app-websiite - <yourusername@gmail.com>',
        to: 'username@outlook.com',     //specify receivers username
        subject: 'Contact Form',
        text: 'you have new mwssaage fro yourselg'+req.body.name+'@gmail.com\n'+'Email: '+req.body.email+'Message'+req.body.message,
        html: '<h3>You have new mwssagw !</h3><br/><ul><li>From: '+req.body.name+'@gmail.com</li><li>'+'Email : '+req.body.email+'</li><li><p>'+req.body.message+'</p></li></ul>'
    };
    transport.sendMail(mailOp, function(error, info){
        if(error){
            console.log('Email could not be send'+error);
            res.redirect('/');
        }
        else{
            console.log('message sent successfully\n'+info.response);
            res.redirect('/');
        }
    });
});
module.exports = router;
