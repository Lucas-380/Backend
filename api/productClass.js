const persistenciaProds = require('../memory/persistenciaProds');
const PersistenciaProduct = require('../memory/persistenciaProds');

class Productos{
    async save(prod){
        if(prod.title && prod.price && prod.thumbnail){
            const producto = await PersistenciaProduct.save(prod);
            return producto
        }else return;
    }

    async getById(id) {
        const product = await PersistenciaProduct.getById(id);
        return product;
    }

    async getAll() {
        const product = await PersistenciaProduct.getAll();
        return product;
    }

    async deleteById(id) {
        let productExists = this.getById(id);
        if (productExists){
            const product = await PersistenciaProduct.deleteById(id);
            return product;
        }
    }

    async deleteAll(){
        await PersistenciaProduct.deleteAll();
    }

    async update(id, body) {
        let contenido = await this.getById(id);
        if (contenido) {
            const newProd = Object.assign(contenido[0], body);
            const prod = await persistenciaProds.update(id, newProd);
            return prod
        }
    }
}

module.exports = new Productos();
