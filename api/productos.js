import ContenedorMemoria from '../contenedores/productoClass.js'
import { generarProducto } from '../utils/generarProductos.js'
import { generarId } from '../utils/generarId.js'

class ApiProductosMock extends ContenedorMemoria {
    constructor() { super() }

    popular(cant = 5) {
        const nuevos = []
        for (let i = 0; i < cant; i++) {
            const nuevoProd = generarProducto(generarId())
            const guardado = this.guardar(nuevoProd)
            nuevos.push(guardado)
        }
        return nuevos
    }
}

export default ApiProductosMock