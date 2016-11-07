const pug = require('pug');
const http = require('http');
var express = require('express');

var app = express();

app.all('/', function(req, res){
	res.render('demo.pug');
});

app.listen(3000, function(){
	console.log("listening on port 3000");
});