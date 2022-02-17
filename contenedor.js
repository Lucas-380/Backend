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
        return contenido.find(producto => producto.id === id)
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
        const deleted = contenido.filter(producto => producto.id !== id)
        if (this.getById(id)) {
            try {
                fs.writeFileSync('productos.txt', JSON.stringify(deleted, null, 4))
                return true
            } catch (error) {
                throw new Error('No se pudo eliminar el producto')
            }
        } else {
            return false
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
        const contenido = this.getAll()
        return contenido[Math.floor(Math.random()*contenido.length)]
    }
    update(id, body) {
        const contenido = this.getAll()
        const producto = contenido.find(producto => producto.id === id)
        if (producto) {
            contenido.forEach(element => {
                if (element.id === id) {
                    element.price = body.price
                    element.thumbnail = body.thumbnail
                    element.title = body.title
                }
            })
            try {
                fs.writeFileSync('productos.txt', JSON.stringify(contenido, null, 4))
                return producto
            } catch (error) {
                throw new Error('No se pudo actualizar el producto')
            }
        } else {
            return false
        }
    }
}

module.exports = Contenedor
