'use strict';

var platform   = require('./platform'),
	request    = require('request'),
	apikey, usetime;
/*
 * Listen for the data event.
 */
platform.on('data', function (data) {


	var url = 'https://api.forecast.io/forecast/' + apikey + '/' + data.lat + ',' + data.lon;

	if (usetime)
		url = url + ',' + data.time;


	request(url, function(err, response, body) {

		if (err) {
			console.error(err);
			platform.handleException(err);
		} else if (response.statusCode !== 200) {

			var statErr = new Error(response.statusMessage);

			console.error(statErr);
			platform.handleException(statErr);
		} else {
			platform.sendResult(body);
		}
	});



});

/*
 * Listen for the ready event.
 */
platform.once('ready', function (options) {


	apikey = options.apikey;
	usetime = options.usetime;

	platform.log('Dark Sky Forecast Service Initialized.');
	platform.notifyReady();

});