const axios = require('axios')

async function get() {
    try {
        const response=  await axios.get('http://localhost:3000/productos')
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
async function del() {
    try {
        const response=  await axios.post('http://localhost:3000/productosdel')
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
async function add() {
    try {
        const response=  await axios.post('http://localhost:3000/productos')
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
async function put() {
    try {
        const response=  await axios.put('http://localhost:3000/productos')
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}

module.exports= {get,del,add,put}

