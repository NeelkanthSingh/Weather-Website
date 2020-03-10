const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/2f8ccf4a18081e53cf535b9fd1ff07e8/'+ encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)+ '?units=si'
    request({url, json: true}, (error,{body})=>{
    
        if(error){
            callback('Unable to connect to web services')
        }else if(body.error){
            callback('Something went wrong with the location')
        }else{
            callback(undefined ,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degree celcius out here and ther is '+body.currently.precipProbability * 100+ ' % chance of raining'
                        + ' with Max high = '+ body.daily.data[0].apparentTemperatureHigh
                        + ' and Max low = ' + body.daily.data[0].apparentTemperatureLow)
        }
      
})

}

module.exports = forecast