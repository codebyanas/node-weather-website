require('dotenv').config();

const request = require('request')

const geocode = (address, callback) => {
    const url = `${process.env.GEOCODE_API_BASE_URL}?key=${process.env.GEOCODE_API_KEY}&q=${encodeURIComponent(address)}&format=json`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find weather service. Try another search!', undefined)
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

