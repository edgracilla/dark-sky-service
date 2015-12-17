'use strict';

const API_KEY = 'e05fd6b98abd2b6c95f749d76ed58e4b';

var cp     = require('child_process'),
	should = require('should'),
	service;

describe('Service', function () {
	this.slow(8000);

	after('terminate child process', function () {
		service.kill('SIGKILL');
	});

	describe('#spawn', function () {
		it('should spawn a child process', function () {
			should.ok(service = cp.fork(process.cwd()), 'Child process not spawned.');
		});
	});

	describe('#handShake', function () {
		it('should notify the parent process when ready within 8 seconds', function (done) {
			this.timeout(8000);

			service.on('message', function (message) {
				if (message.type === 'ready')
					done();
			});

			service.send({
				type: 'ready',
				data: {
					options: {
						apikey: API_KEY
					}
				}
			}, function (error) {
				should.ifError(error);
			});
		});
	});

	describe('#data', function () {
		it('should process the data and send back a result', function (done) {
			this.timeout(8000);
			var requestId = (new Date()).getTime().toString();

			service.on('message', function (message) {
				if (message.type === 'result') {
					var data = JSON.parse(message.data);
					console.log(data);

					should.ok(data.weather_conditions, 'Invalid return data.');
					should.equal(message.requestId, requestId);
					done();
				}
			});

			service.send({
				type: 'data',
				requestId: requestId,
				data: {
					lat: 14.556978,
					lng: 121.034352
				}
			}, function (error) {
				should.ifError(error);
			});
		});
	});
});