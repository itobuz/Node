
/*
 * GET home page.
 */

var FlightSchema = require('../schemas/flight');
var Emitter = require('events').EventEmitter;

var flightEmitter = new Emitter();

flightEmitter.on('arrival', function(flights) {

			var record = new FlightSchema(
				flights.getInformation()
			)

			record.save(function (err){
				if(err) {
					console.log(err);
					//res.status(500).json({status: 'failure'});
				} 
			});
			//res.json({status: 'done'});
})

flightEmitter.on('arrival', function(flights) {
	console.log("Flight Arrived: "+ flights.data.number);
})

module.exports = function (flights){
	
	var flight = require('../flight');

	for(var number in flights){
		flights[number] = flight(flights[number]);
	}

	var functions = {};  // routes handler function

	functions.flight = function(req, res){
		var number = req.param('number');
	  	
		req.session.lastNumber = number;

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
			flightEmitter.emit('arrival', flights[number]);
			res.json({status: 'success'});

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

	functions.arrivals = function (req, res) {
		FlightSchema.find()
		.setOptions({sort: 'actualArrive'})
		.exec( function (err, arrivals) {
			if(err){
				console.log(err);
				res.status(500).json({status: 'failure'})
			} else {
				res.render('arrivals', {
					title: 'Arrivals',
					arrivals: arrivals,
					lastNumber: req.session.lastNumber
				});
			}
		})
	};
	
	functions.login = function(req, res) {
		res.render('login', {title: 'Login in'});
	}
	
	functions.user = function(req, res) {
		if(req.session.passport.user === undefined){
			res.redirect('/login');
		} else {
			res.render('user', {title: 'Welcome!',
				user: req.user
			})
		}
	}

	return functions;
};

