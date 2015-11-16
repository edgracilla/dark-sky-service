# Forecast.io Service

[![Build Status](https://travis-ci.org/Reekoh/forecast.io-service.svg)](https://travis-ci.org/Reekoh/forecast.io-service)
![Dependencies](https://img.shields.io/david/Reekoh/forecast.io-service.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/forecast.io-service.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)

Forecast.io Service Plugin for the Reekoh IoT Platform. Integrates a Reekoh instance to Forecast.io API to get **current/real-time** weather conditions.

## Input Data

* lat - Latitude
* lng - Longitude

## Output Data

Current weather conditions for the given Latitude & Longitude coordinate pair.

__Sample Output Data__

```javascript
{
	weather_conditions: {
		time: 1447677962,
		summary: 'Clear',
		icon: 'clear-night',
		precipIntensity: 0,
		precipProbability: 0,
		temperature: 26.4,
		apparentTemperature: 26.4,
		dewPoint: 21.21,
		humidity: 0.73,
		windSpeed: 2.82,
		windBearing: 88,
		visibility: 9.99,
		cloudCover: 0.14,
		pressure: 1012.68,
		ozone: 259.85
	}
}
```