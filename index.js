var express = require('express'),
    app=express(),
    morgan=require('morgan'),
    passport=require('passport'),
    bodyParser=require('body-parser'),
    mongoose=require('mongoose'),
    session=require('express-session'),
    flash=require('connect-flash');
    testMode = true,
    port=3000,
    host='127.0.0.1';
var configDB = require('./database.js');
require('./passport.js')(passport);
mongoose.connect(configDB.url);
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(__dirname));
console.log('Starting Server');
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});
app.get('/login', function (req, res) {
  res.sendFile(__dirname+'/login.html');
});
app.get('/signup', function (req, res) {
  res.sendFile(__dirname+'/signup.html');
});
app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
app.listen(port,host);
console.log('Listening at '+host+':'+port);
