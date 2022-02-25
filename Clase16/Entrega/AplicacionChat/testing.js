
const Contenedor= require('../ContenedorDB');
const contenedor= new Contenedor('./options/knexConfig','cars');


(async function(){
    const res = await contenedor.getAll();
    console.log('KNEX', res);
  })() 
