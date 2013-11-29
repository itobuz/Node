var app = require('./helpers/app');

var should = require('should'),
	supertest = require('supertest');

describe('flights', function(){

	it('should pass',function (done){
		done();
	});

	it('should not pass', function (done){
		//throw "dont' pass";
		done();
	});

	it('should return valid flight data for flight 18',
	function (done) {
			supertest(app)
			.get('/flight/18')
			.expect(200)
			.end(function (err,res) {
				res.status.should.equal(200);
				done();
			});
	});

	it('should return an error for flight not found',
	function (done){

		supertest(app)
		.get('/flight/9999')
		.expect(404)
		.end(function (err, res) {
			res.status.should.equal(404);
			done();
		})
	})

	it('should set an arrived time and test it out',
	function (done){

		supertest(app)
		.put('/flight/33/arrived')
		.expect(200)
		.end(function (err, res) {
			
			res.status.should.equal(200);
			res.body.status.should.equal('done');
			
			supertest(app)
			.get('/flight/33')
			.expect(200)
			.end(function (err, res) {
				res.status.should.equal(200);
				res.body.actualArrive.should.be.a.number;
				res.body.actualArrive.should.not.equal('undefined');
				done();
			})

		})
	})
});