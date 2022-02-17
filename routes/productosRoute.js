const express = require("express");
const router = express.Router();

//api de prods
const ProductMethods = require("../api/productosClass");

//Función de administrador
function admin (req, res, next){
    const admin = true //Por defecto esta en true
    if ( admin !== true){
        res.status(401).send({
            error: -1,
            descripción: `ruta ${req.originalUrl}, metodo ${req.method} no autorizada`
        })
    }else{
        next();
    }
}

//-----------------------------------ROUTES-----------------------------------
//Devuelve todos los productos
router.get('/', async (req, res) => {
    const prods = await ProductMethods.getAll();
    res.json(prods)
})
//Devuelve un producto según su id
router.get('/:id?', async (req,res)=>{
    const { id } = req.params;
    let respuesta = await ProductMethods.getById(id);
    respuesta ? res.json(respuesta) : res.status(404).json(`No se encontró ningún producto con el id ${id}`);
})

//Recibe y agrega un producto, y lo devuelve con su id asignado
router.post('/', admin, async (req, res)=>{
    const producto = await ProductMethods.save(req.body)
    producto
        ? res.json(producto)
        : res.status(404).send('Faltan campos en el producto');
})

//Recibe y actualiza un producto según su id
router.put('/:id', admin, async (req, res) => {
    const { id } = req.params;
    let respuesta = await ProductMethods.update(id, req.body)
    respuesta
        ? res.json(respuesta)
        : res.status(404).send(`No se pudo actualizar producto con el id ${id}`)
})

//Elimina un producto según su id
router.delete('/:id', admin, async (req, res) => {
    const { id } = req.params;
    let respuesta = await ProductMethods.deleteById(id)
        ? { success: 'producto eliminado' } 
        : { error: 'El producto no se pudo eliminar' }
    res.json(respuesta)
})


module.exports = router;