var admin = require("firebase-admin");

var serviceAccount = require("./backendbase-fdeb2-firebase-adminsdk-2vw32-6dd03894ad.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

CRUD()
async function CRUD(){
    const db= admin.firestore();
    const query = db.collection('usuarios')

    // CREATE

    // try {
    //     let id = 1
    //     let doc = query.doc(`${id}`)
    //     await doc.create({nombre: 'Jonas', document: '112222'})
    //     id++;
    //     doc = query.doc(`${id}`)
    //     await doc.create({nombre: 'Antonia', document:'983726'})
    //     id++;
    //     doc = query.doc(`${id}`)
    //     await doc.create({nombre: 'Antonio', document:'283746'})
    //     console.log('Datos insertados')
    // } catch (error) {
    //     console.log(error)
    // }

    // // READ ALL

    // try {
    //     const querySnapshot = await query.get()
    //     let docs =querySnapshot.docs;

    //     const response = docs.map((doc) => ({
    //         id: doc.id,
    //         document: doc.data().document,
    //     }))
    //     console.log(response)
    // } catch (error) {
    //     console.log(error)
    // }

    // // READ ID

    // try {
    //     let id = 2
    //     const doc =query.doc(`${id}`)
    //     const item = await doc.get()
    //     const response = item.data()

    //     console.log(response)
    // } catch (error) {
    //     console.log(error)
    // }

    // // UPDATE

    // try {
    //     let id = 2
    //     const doc =query.doc(`${id}`)
    //     const item = await doc.update({dni:'111111'})
    //     console.log('Updated')

    // } catch (error) {
    //     console.log(error)
    // }

    // DELETEALL
    try { 
        const querySnapshot = await query.get()
        let docs =querySnapshot.docs;
        // Since there is no function to delete all the Docs I have to traverse the array and delete them 1 by 1 
        docs.forEach(element => {
            deleteId()
            async function deleteId (){
                try {
                    const doc = query.doc(element.id)
                    await doc.delete()
                    console.log("document deleted")
                } catch (error) {
                    console.log(error)
                }
            }
        });
        
    } catch (error) {
        console.log(error)
    }
    
    // DELETEById

    // try {
    //     let id = 2
    //     const doc =query.doc(`${id}`)
    //     const item = await  doc.delete()
    //     console.log("se ha borrado" + item)
    // } catch (error) {
    //     console.log(error)
    // }

} 