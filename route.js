var utility = require('./utility.js');


indexPage = function(req, res){
	if(req.session.get('loggedIn') == true)
		res.redirect('/home');
	else
		req.session.set('loggedIn', false);
	res.render('index.pug');
}

homePage = function(req, res){
	if(req.session.get('loggedIn') == true){
		utility.userHome(req, res);
	}
	else
		res.redirect('/');
}

planPage = function(req, res){
	var details = {};
	details.startTime = req.body.startTime;
	details.startPlace = req.body.startPlace;

	updatePlans(req, res, details);
}



verify = function(req, res){
	utility.authenticate(req, function(value){
		if(!value){
			res.render('index.pug', {"invalid": true});
		}
		else{
			res.redirect('/home');
		}
	});
}

logout = function(req, res){
	req.session.set('loggedIn', false);
	res.redirect('/');
}

plans = function(req, res){
	if(req.session.get('loggedIn') == true){
		utility.getAllPlans(req, res, function(planlist){
			res.render('plans.pug', {"planlist": planlist});
		});
	}
	else
		res.redirect('/');
}

addplace = function(req, res){
	utility.addPlace(req, res, function(){
		utility.addJourney(req, res, function(){
			res.render('plan.pug');
		});
	});
}

viewPlan = function(req, res){
	if(req.session.get('loggedIn') == true)
		utility.viewPlan(req, res);
	else
		res.redirect('/');
}


module.exports.indexPage =indexPage;
module.exports.homePage = homePage;
module.exports.planPage = planPage;
module.exports.verify = verify;
module.exports.logout = logout;
module.exports.plans = plans;
module.exports.addPlace = addplace;
module.exports.viewPlan = viewPlan;
