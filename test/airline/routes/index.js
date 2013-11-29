
/*
 * GET home page.
 */

module.exports = function (flights){
	
	var flight = require('../flight');

	for(var number in flights){
		flights[number] = flight(flights[number]);
	}
	var functions = {};

	functions.flight = function(req, res){
		var number = req.param('number');
	  
		if(typeof flights[number] === 'undefined'){
			res.status(404).json({status: 'error'});
		} else {
			res.json(flights[number].getInformation());
		}
	};

	functions.arrived = function (req, res){
		var number = req.param('number');
	  
		if(typeof flights[number] === 'undefined'){
			res.status(404).json({status: 'error'});
		} else {
			flights[number].triggerArrive();
			res.json({status: 'done'});
			//res.json(flights[number].getInformation());
		}
	}

	functions.list = function (req, res){
		res.render('list',{
					title: "All Flights",
					flights: flights});
	}

	functions.json = function (req, res){
		var s = [];
		for(var number in flights){
			//flights[number] = flight(flights[number]);
			//res.json(flights[number].getInformation());
			s.push(flights[number].getInformation());
		}
		res.json(s);
	}
	
	return functions;
};


