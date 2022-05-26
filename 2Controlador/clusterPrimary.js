const cluster = require('cluster');

const ejemplo = function clusterMode (numCPUs) {
    console.log("numero de cores",numCPUs)
    for (let i = 0; i < numCPUs; i++) {cluster.fork()}
    cluster.on('exit', worker => {
      console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
      cluster.fork()
  })
}

module.exports = ejemplo