const express = require('express')
const app = express()
const port = parseInt(process.argv[2]) || 8081

app.get('/info', (req, res) => {
  console.log(`port: ${port} -> FyH: ${Date.now()}`)
  res.send(`servidor Express <span style="color:blueviolet;">(NginX)</span> en $ ${port} - <b>process id: ${process.pid}</b> -${new Date().toLocaleString()}`)
})

app.listen(port, err => {
  if (!err) console.log(` app listening on port ${port} PID Worker: ${process.pid}`)
})