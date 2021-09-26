const http = require('http');

const server = http.createServer((solicitud,respuesta)=>{
    respuesta.end('Hola Cacerola')
})

const connectedServer = server.listen(8080,()=>{
    console.log(`Server Escuchando en ${connectedServer.address().port}`)
});