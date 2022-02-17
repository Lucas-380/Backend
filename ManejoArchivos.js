const fs = require('fs')

class Contenedor{
    constructor(prod){
        this.producto = prod
    }
    save(prod){
        prod.id = Date.now()
        const contenido = this.getAll()
        contenido.push(prod)
        try {
            fs.writeFileSync('./producto.txt', JSON.stringify(contenido, null, '\t')+'\n')
            return prod.id
        }
        catch(err){
            console.log(err);
        }
    }
    getById(id) {
        const contenido = this.getAll()
        return contenido.find(producto => producto.id === id) || null
    }
    getAll() {
        try {
            const contenido = fs.readFileSync('producto.txt', 'utf-8')
            return JSON.parse(contenido)
        } catch (error) {
            console.log(error);
        }   
    }
    deleteById(id) {
        const contenido = this.getAll()
        const deleteId = contenido.filter(producto => producto.id !== id)
        try{
            fs.writeFileSync('producto.txt', JSON.stringify(deleteId, null, '\t')+'\n')
            console.log("El archivo "+id+" fue eliminado correctamente");
        }catch(error){
            throw new Error('No se pudo eliminar el producto')
        }
    }
    deleteAll(){
        const contenido = []
        try{
        fs.writeFileSync('producto.txt', JSON.stringify(contenido,null,4))    
        }catch(error){
            throw new Error('No se pudo eliminar el producto')
        }
    }
}

const producto = new Contenedor ([])

//----Guardar Archivo----
producto.save({
                            title:"Titulo del producto",
                            precio:1234,
                            img:"www.direccion-de-imagen.com" 
                        })

//----Buscar por id----
console.log(producto.getById(1641944213097));

//----Eliminar por id----
producto.deleteById(1641943838227)

//----Mostrar todo los productos----
console.log(producto.getAll())

//----Eliminar todos los productos----
producto.deleteAll()