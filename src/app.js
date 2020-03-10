const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000
// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and vies location
app.set('views', viewspath )
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Neelkanth Singh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About Me',
        name: 'Neelkanth Singh'
    })
})

app.get('/help',(req , res)=>{
    res.render('help',{
        help_message: 'Help for better understanding',
        title:'Help',
        name:'Neelkanth Singh'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        help_message:'Help article not found',
        title:'404',
        name:'Neelkanth Singh'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'ERROR: No address'
        })
    }

    geocode(req.query.address, (error, {location,latitude,longitude}={})=>{
        if(error)
            return res.send({error})
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error)
                return res.send({error})
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('*',(req, res)=>{
    res.render('404',{
        help_message:'Page not found',
        title:'404',
        name:'Neelkanth Singh'
    })
})


app.listen(port , ()=>{
    
    console.log('Server is up and running at port number '+ port)
})