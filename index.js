var pug = require('pug');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var NodeSession = require('node-session');
//var fileUpload = require('express-fileupload');
var app = express();
var utility = require('./utility.js');
var route = require('./route.js');
var fs = require('fs');
var multer = require('multer');

var nodeSession = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});

function session(req, res, next){
    nodeSession.startSession(req, res, next);
}

app.use(session);

//app.use(fileUpload()); 

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({     
 extended: true
})); 

app.use(express.static("public"));

app.get('/home', homePage);

app.get('/', indexPage);

app.post('/register', register);

app.post('/login', verify);

app.post('/plan', planPage);

app.get('/logout', logout);

app.get('/plans', plans);

app.post('/addplace', addplace);

app.get('/viewplan', viewPlan);

app.post('/addimage', function(req, res){
//  	var sampleFile;
 
//     if (!req.files) {
//         res.send('No files were uploaded.');
//         return;
//     }
 
//     sampleFile = req.files.image;

	   //console.log(req.body.image) // form fields
	   //console.log(req.files) // form files
	   res.status(204).end()
});


app.listen(3000, function(){
	console.log("listening on port 3000");
});

