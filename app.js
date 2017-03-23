'use strict'

const reekoh = require('reekoh')
const _plugin = new reekoh.plugins.Service()

let forecast = null
let language = null

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
}
_plugin.on('data', (data) => {
  forecast
    .latitude(data.latitude)
    .longitude(data.longitude)
    .units('auto')
    .language(language)
    .exclude('minutely,hourly,daily,alerts,flags')
    .get()
    .then((response) => {
      _plugin.pipe(data, JSON.stringify({ weatherConditions: response.currently }))

      _plugin.log(JSON.stringify({
        title: 'Dark Sky Service Result',
        data: {
          lat: data.latitude,
          lng: data.longitude
        },
        result: response.currently
      }))
    })
    .catch((error) => {
      console.error(error)
      _plugin.logException(error)
    })
})

_plugin.once('ready', () => {
  language = LANG[_plugin.config.lang]
  let DarkSky = require('dark-sky')
  forecast = new DarkSky(_plugin.config.apiKey)

  _plugin.log('Dark Sky Service Initialized.')
  _plugin.emit('init')
})

module.exports = _plugin
