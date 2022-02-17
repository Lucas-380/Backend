const fs = require ('fs');

class ProductosMemory{
    async lectura(){
        try {
            const leer = await fs.promises.readFile(__dirname + "/productos.txt", "utf-8");
            const productos = JSON.parse(leer);
            return productos;
        } catch {
            return [];
        }
    }

    async agregar(arrayProductos){
        try {
            const productos = await fs.promises.writeFile(
                __dirname + "/productos.txt", JSON.stringify(arrayProductos, null, "\t"))
        } catch {
            throw new Error("Error");
        }
    }
}

module.exports = new ProductosMemory();