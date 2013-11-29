
/*
 * GET home page.
 */

var flight = require("../flight");


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};