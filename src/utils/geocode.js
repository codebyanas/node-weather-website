const request = require('request')
const geocodeapikey = process.env.GEOCODE_API_BASE_URL

const geocode = (adderess, callback) => {
    const url = `https://us1.locationiq.com/v1/search?key=${geocodeapikey}&q=` + encodeURIComponent(adderess) + '&format=json'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find weather service!', undefined)
        } else {
            const location = response.body[0].display_name
            const latitude = response.body[0].lat
            const longitude = response.body[0].lon

            callback(undefined, {
                location: location,
                latitude: latitude,
                longitude: longitude
            })
        }
    })
}

module.exports = geocode