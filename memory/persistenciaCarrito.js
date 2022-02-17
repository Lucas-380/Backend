const fs = require("fs");

class CarritoMemory{
    async lectura(){
        try {
            const leer = await fs.promises.readFile(__dirname + "/carrito.txt", "utf8");
            const productos = JSON.parse(leer);
            return productos;   
        } catch {
            return [];
        }
    }

    async agregar(arrayCarrito){
        try {
            const carrito = await fs.promises.writeFile(__dirname + "/carrito.txt", JSON.stringify(arrayCarrito, null, "\t"));
        } catch {
            throw new Error("Error")
        }
    }
}

module.exports = new CarritoMemory();