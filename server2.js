const express = require('express')
const app = express()

const compression = require('compression')
const port = parseInt(process.argv[2]) || 8082
const logger =require('./logger.js')

const os = require('os');
const cluster = require('cluster');

const modoCluster = process.argv[3] === "CLUSTER"

if (modoCluster && cluster.isPrimary) {
  const numCPUs = os.cpus().length
  console.log("numero de cores",numCPUs)
  for (let i = 0; i < numCPUs; i++) {cluster.fork()}
  cluster.on('exit', worker => {
    console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
    cluster.fork()
})

}
else{

  app.use(compression())
  
  app.get('/info', (req, res) => {
  
    logger.info(`port: ${port} -> FyH: ${Date.now()}`)
    res.send(`servidor Express <span style="color:blueviolet;">(NginX)</span> en $ ${port} - <b>process id: ${process.pid}</b> -${new Date().toLocaleString()}`)
  })
  
  app.get('/infoComprimida',compression(), (req, res) => {
    
    logger.info(`port: ${port} -> FyH: ${Date.now()}`)
    res.send(`servidor Express <span style="color:blueviolet;">(NginX)</span> en $ ${port} - <b>process id: ${process.pid}</b> -${new Date().toLocaleString()}`)
  })
  
  app.get('*', (req, res) => {
    const {url,method} = req
    logger.info(`Ruta ${method} ${url} no implementada`)
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no implementada`)
  })
  
  const server = app.listen(port, err => {
    if (!err) console.log(` app listening on port ${port} PID Worker: ${process.pid}`)
  })
  
  server.on('error',error => logger.error(`Error en el servidor: ${error}`))
}
