#! /usr/bin/env node

var http = require('http'),
	flights = require("./data"),
	db = require('./db'),
	repl = require('repl'),
	argv = require('optimist').argv,
	app = require('./app')(flights, db);
	
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var prompt = repl.start({prompt: 'flights> '});

prompt.context.data = flights;
var flight = require('./flight');
prompt.context.flight = flight;
// prompt.context.data[argv.number] = new flight({
// 		number: argv.number,
// 		origin: argv.origin,
// 		destination: null,
// 		departs: null,
// 		arrives: null,
// 		actualDepart: null,
// 		actualArrive: null
// 	});
console.log(argv);
console.log(process.argv);