var express = require('express'),
    app=express(),
    morgan=require('morgan')
    testMode = true,
    port=3000,
    host='127.0.0.1';
app.use(morgan('dev'));
app.use(express.static(__dirname));
console.log('Starting Server');
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});
app.get('/login', function (req, res) {
  res.sendFile(__dirname+'/login.html');
});
app.listen(port,host);
console.log('Listening at '+host+':'+port);
