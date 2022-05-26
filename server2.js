const express = require('express')
const app = express()

const port = parseInt(process.argv[2]) || 8082
const logger =require('./logger.js')

const os = require('os');
const cluster = require('cluster');
const controladorCluster = require('./2Controlador/clusterPrimary')
const capaRouter = require ('./1Routing/capaRouter')

const modoCluster = process.argv[3] === "CLUSTER"

if (modoCluster && cluster.isPrimary) {
  const numCPUs = os.cpus().length
  controladorCluster(numCPUs)

}
else{
  app.use('/',capaRouter)
  
  const server = app.listen(port, err => {
    if (!err) console.log(` app listening on port ${port} PID Worker: ${process.pid}`)
  })
  
  server.on('error',error => logger.error(`Error en el servidor: ${error}`))
}
