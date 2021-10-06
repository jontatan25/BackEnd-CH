const Contenedor= require('./Contenedor');

const miContenedor = new Contenedor ('productos.json');

const archivoUno = {
    title: 'titulo1',
    price: '6 USD',
}
const archivoDos = {
    title: 'titulo2',
    price: '5 USD',
}
const archivoTres = {
    title: 'titulo3',
    price: '7 USD',
}
const main = async ()=> {

    // const id = await miContenedor.save(archivoUno)
    // let list = await miContenedor.getAll();
    // console.log(list);

    // Borrar archivos 
    // await miContenedor.deleteAll();
    // let list = await miContenedor.getById(1);
    // console.log(list);
    // let list = await miContenedor.deleteById(4);
    // console.log(list);
};
main();

