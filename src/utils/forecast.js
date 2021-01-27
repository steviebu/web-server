const request = require('request')

const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d852cdd8fcd13b3bab5624f0c7e68c84&query=' + lat + ',' + lon + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        }
        else if (body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            const current = body.current
            const description = current.weather_descriptions[0]
            const currentTemp = current.temperature
            const feelsLikeTemp = current.feelslike
            const windSpeed = current.wind_speed
            const windDir = current.wind_dir
            callback(undefined, 
                description + ". It is currently " + currentTemp + " degrees out. It feels like " + feelsLikeTemp + " degrees out. Winds are " + windSpeed + " mph out of the " + windDir + ".")
        }
    })
}

module.exports = forecast