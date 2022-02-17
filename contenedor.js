const fs = require('fs')

class Contenedor{
    constructor(prod){
        this.producto = prod
    }
    save(prod){
        const contenido = this.getAll()
        prod.id = contenido.length == 0 ? 1 : contenido[ contenido.length-1 ].id + 1;
        contenido.push(prod)
        try {
          fs.writeFileSync('./productos.txt', JSON.stringify(contenido, null, '\t')+'\n')
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
            const contenido = fs.readFileSync('productos.txt', 'utf-8')
            return JSON.parse(contenido)
        } catch (error) {
            console.log(error);
        }   
    }
    deleteById(id) {
        const contenido = this.getAll()
        const deleteId = contenido.filter(producto => producto.id !== id)
        try{
            fs.writeFileSync('productos.txt', JSON.stringify(deleteId, null, '\t')+'\n')
            console.log("El archivo "+id+" fue eliminado correctamente");
        }catch(error){
            throw new Error('No se pudo eliminar el producto')
        }
    }
    deleteAll(){
        const contenido = []
        try{
        fs.writeFileSync('productos.txt', JSON.stringify(contenido,null,4))    
        }catch(error){
            throw new Error('No se pudo eliminar el producto')
        }
    }
    prodRandom(){
        const data = this.getAll()
        return data[Math.floor(Math.random()*data.length)]
    }
}

module.exports = Contenedor
