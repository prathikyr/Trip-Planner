var MongoClient = require('mongodb').MongoClient;
var NodeSession = require('node-session');
var index = require('./index.js');

var url = 'mongodb://localhost:27017/travel';

var database;

function findUsers(db){
	var col = db.collection('users').find();
   	col.each(function(err, doc) {
    	if (doc != null) {
        	users = doc;
      	}
   	});
}

MongoClient.connect(url, function(err, db) {
  //findUsers(db);
  console.log("Connected to db");
  database = db;
});

authenticate = function(req, callback){
	condition = {"email":req.body.email, "password":req.body.password};
	database.collection('users').find(condition).toArray().then(function(docs){
		if(docs.length > 0){
			req.session.set('loggedIn', true);
			req.session.set('user', req.body.email);
			callback(true);
		}
		else{
			req.session.set('loggedIn', false);
			callback(false);
		}
	});
}

register = function(req, res){
	condition = {"email":req.body.email};
	database.collection('users').find(condition).toArray().then(function(docs){
		if(docs.length > 0){
			req.session.set('loggedIn', false);
			res.render('index.pug');
		}
		else{
			database.collection('users').insertOne({
				"name":req.body.name,
				"email":req.body.email,
				"password":req.body.password,
				"plans": 0
			}, function(err, result){
				req.session.set('loggedIn', true);
				req.session.set('user', req.body.email);
				res.render('home.pug')
			});
		}
	});
}

updatePlans = function(req, res, details){
	var usr = req.session.get('user');
	database.collection('users').update({"email":req.session.get('user')}, 
	{$set:{"plans":1, "journey":[], "activity":[]}}, function(err, result){
		database.collection('users').update({"email":req.session.get('user')}, 
		{$push:{"places": {"placename": details.startPlace, "arrival":details.startTime, 
		"departure":details.startTime}}}, function(err, result){
			req.session.set('lastplace', details.startPlace);
			database.collection('users').find({"email":usr}).toArray().then(function(docs){
				res.render('plan.pug', {"places":docs[0].places});
			});
		});
	});
}

getAllPlans = function(req, res, callback){
	var condition = {"email":req.session.get('user')};
	database.collection('users').find(condition).toArray().then(function(docs){
		callback(docs[0].plans);
	});
}

addJourney = function(req, res, callback){
	database.collection('users').update({"email":req.session.get('user')},
	{
		$push:{"journey": {"from": req.session.get('lastplace'), "to":req.body.place, "distance": req.body.distance}}
	}, function(err, result){
		req.session.set('lastplace', req.body.place);
		callback();
	});
}

addPlace = function(req, res, callback){
	database.collection('users').update({"email":req.session.get('user')},
	{
		$push:{"places": {"placename": req.body.place, "arrival":req.body.arrival, "departure": req.body.departure}}
	}, function(err, result){
			callback();
	});
}

userHome = function(req, res){
	var usr = req.session.get('user');
	database.collection('users').find({"email":usr}).toArray().then(function(docs){
		if(docs[0].plans == "0")
			res.render("home.pug");
		else{
			database.collection('users').find({"email":usr}).toArray().then(function(docs){
				res.render('plan.pug', {"places":docs[0].places});
			});
		}
	});
}


viewPlan = function(req, res){
	var usr = req.session.get('user');
	database.collection('users').find({"email":usr}).toArray().then(function(docs){
		info = {};
		info.name = docs[0].name;
		info.journey = docs[0].journey;
		info.places = docs[0].places;
		info.activity = docs[0].activity;
		res.render('viewplan.pug', info);
	});
}

module.exports.authenticate = authenticate;
module.exports.register = register;
module.exports.database = database;
module.exports.updatePlans = updatePlans;
module.exports.getAllPlans = getAllPlans;
module.exports.addPlace = addPlace;
module.exports.addJourney = addJourney;
module.exports.userHome = userHome;
module.exports.viewPlan = viewPlan;