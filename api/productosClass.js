const ProductosMemory = require('../memory/persistenciaProductos');

class Productos{
    constructor(){
        this.arrayProductos = [];
    }

    async getAll() {
        const productos = await ProductosMemory.lectura();
        this.arrayProductos = productos;
        return productos.length > 0 ? productos:{error: "No hay ningún producto cargado"}
    }

    async getById(id) {
        this.arrayProductos = await ProductosMemory.lectura();
        const producto = await this.arrayProductos.find(prod => {
            return prod.id == id;
        })
        return producto ?? null;
    }

    async save(body) {
        this.arrayProductos = await ProductosMemory.lectura();
        let { title, price, thumbnail, description, codigo, stock } = body;
        if (title && price && thumbnail && description && codigo && stock) {
            const id = this.arrayProductos.length + 1
            const time = new Date();
            const timestamp = time.toUTCString();
            const producto = { id, timestamp, title, description, price, thumbnail, codigo, stock };
            this.arrayProductos.push(producto);
            //---Persistencia en .txt
            ProductosMemory.agregar(this.arrayProductos);
            return producto;
        }else return;
    }

    async deleteById(id) {
        let prodExists = await this.getById(id);
        this.arrayProductos = await ProductosMemory.lectura();

        if (prodExists) {
            this.arrayProductos = this.arrayProductos.filter(prod => prod.id != id);
            //Persistencia
            ProductosMemory.agregar(this.arrayProductos);
            return prodExists;
        }else return;
    }

    async update(id, body) {
       let prodExists = await this.getById(id);
       this.arrayProductos = await ProductosMemory.lectura();
       if ( prodExists && body ) {
           const producto = this.arrayProductos.findIndex(prod => prod.id == id);
           Object.assign(this.arrayProductos[producto], body);
           //Persistencia
           ProductosMemory.agregar(this.arrayProductos);
           return this.arrayProductos[producto];
       }else return;
    }
}

module.exports = new Productos();
