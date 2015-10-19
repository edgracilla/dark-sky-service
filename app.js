'use strict';

const LANG = {
	'Arabic': 'ar',
	'Bosnian': 'bs',
	'Chinese - Simplified': 'zh',
	'Chinese - Traditional': 'zh-tw',
	'Croatian': 'hr',
	'Dutch': 'nl',
	'English': 'en',
	'French': 'fr',
	'German': 'de',
	'Greek': 'el',
	'Italian': 'it',
	'Polish': 'pl',
	'Portuguese': 'pt',
	'Russian': 'ru',
	'Slovak': 'sk',
	'Spanish': 'es',
	'Swedish': 'sv',
	'Tetum': 'tet',
	'Turkish': 'tr',
	'Ukrainian': 'uk'
};

var url       = require('url'),
	config    = require('./config.json'),
	request   = require('request'),
	platform  = require('./platform'),
	safeParse = require('safe-json-parse/callback'),
	baseUrl, language;

/*
 * Listen for the data event.
 */
platform.on('data', function (data) {
	var req = baseUrl + '/' + data.lat + ',' + data.lng;

	request.get({
		url: req,
		qs: {
			units: 'auto',
			exclude: 'minutely,hourly,daily,alerts,flags',
			lang: language
		}
	}, function (requestError, response, body) {
		if (requestError) {
			console.error(requestError);
			platform.handleException(requestError);
			platform.sendResult(null);
		}
		else if (response.statusCode !== 200) {
			var statErr = new Error(response.statusMessage);

			console.error(statErr);
			platform.handleException(statErr);
			platform.sendResult(null);
		}
		else {
			safeParse(body, function (parseError, data) {
				if (parseError) {
					console.error(parseError);
					platform.handleException(parseError);
					platform.sendResult(null);
				}
				else {
					var weatherData = data.currently;

					platform.sendResult(JSON.stringify({
						weather_conditions: weatherData
					}));
				}
			});
		}
	});
});

/*
 * Listen for the ready event.
 */
platform.once('ready', function (options) {
	baseUrl = 'https://api.forecast.io/forecast/' + options.apikey;
	language = LANG[options.language] || config.language.default;

	platform.log('Forecast.io Service Initialized.');
	platform.notifyReady();
});