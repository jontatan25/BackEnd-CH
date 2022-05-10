const express = require('express')
const app = express()

const compression = require('compression')
const port = process.env.PORT || 8082
const logger =require('./logger.js')

const os = require('os');
const cluster = require('cluster');

  app.use(compression())
  

  app.get('/', (req, res) => {
    res.send('Hola desde Heroku!')
  })
  
    
  app.get('/info', (req, res) => {
    
      res.send(`servidor Express En Heroku <span style="color:blueviolet;">(NginX)</span> en $ ${port} - <b>process id: N/A</b> -${new Date().toLocaleString()}`)
    })
  
  app.get('*', (req, res) => {
  
    res.send(`Ruta no implementada`)
  })
  
  const server = app.listen(port, err => {
    if (!err) console.log(` app listening on port ${port}`)
  })
  
  server.on('error',error => console.log(error) )


