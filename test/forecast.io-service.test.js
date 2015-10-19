'use strict';

const API_KEY = 'e05fd6b98abd2b6c95f749d76ed58e4b';

var cp     = require('child_process'),
	assert = require('assert'),
	service;

describe('Service', function () {
	this.slow(5000);

	after('terminate child process', function () {
		service.kill('SIGKILL');
	});

	describe('#spawn', function () {
		it('should spawn a child process', function () {
			assert.ok(service = cp.fork(process.cwd()), 'Child process not spawned.');
		});
	});

	describe('#handShake', function () {
		it('should notify the parent process when ready within 5 seconds', function (done) {
			this.timeout(5000);

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
				assert.ifError(error);
			});
		});
	});

	describe('#data', function () {
		it('should process the data and send back a result', function (done) {
			this.timeout(7000);

			service.on('message', function (message) {
				if (message.type === 'result') {
					var data = JSON.parse(message.data);
					console.log(data);

					assert.ok(data.weather_conditions, 'Invalid return data.');
					done();
				}
			});

			service.send({
				type: 'data',
				data: {
					lat: 14.5569862,
					lng: 121.0321893
				}
			}, function (error) {
				assert.ifError(error);
			});
		});
	});
});