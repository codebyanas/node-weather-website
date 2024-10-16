require('dotenv').config();

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./src/utils/geocode')
const forecast = require('./src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, 'public')  // Updated path
const viewsPath = path.join(__dirname, 'templates/views')  // Updated path
const partialsPath = path.join(__dirname, 'templates/partials')  // Updated path

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anas Khalid'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anas Khalid'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Center',
        name: 'Anas Khalid'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide location!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Anas Khalid',
        notfoundMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Anas Khalid',
        notfoundMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('App is running on port ' + port)
})
