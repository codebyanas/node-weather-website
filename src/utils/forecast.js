require('dotenv').config();

const request = require('request')
const forecastapikey = process.env.FORECAST_API_BASE_URL

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${forecastapikey}&query=` + latitude + ',' + longitude + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find weather service!', undefined)
        } else {
            const weather = `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`

            callback(undefined, weather)
        }
    })
}

module.exports = forecast