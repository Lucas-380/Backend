const express = require('express');
const router = express.Router();

//-------------METHODS-------------
const ProductMethods = require('../api/productosClass');
const CartMethods = require('../api/carritoClass');

//-------------ROUTERS-------------
//Crea un carrito y añade un producto por su id
router.post('/:idProd', async (req, res) => {
    const { idProd } = req.params;
    const prod = await CartMethods.save(idProd)
    prod
        ? res.json(prod)
        : res.status(404).json(`No se encontro ningún producto con el id ${idProd}`);
});

//Elimina un carrito por su id
router.delete('/:id?', async (req, res) => {
    const { id } = req.params;
    const cart = await CartMethods.deleteById(id);
    cart
        ? res.json(cart)
        : res.status(404).send(`No se encontro ningún carrito con el id ${id}`);
});

//vista de los carritos guardados
router.get('/', async (req, res) => {
    const cart = await CartMethods.getAll();
    res.json(cart);
});

//vista de un carrito según su id
router.get('/:id?', async (req, res) => {
    const { id } = req.params;
    const cart = await CartMethods.getById(id);
    cart
        ? res.json(cart)
        : res.status(404).json(`No se encontro ningún carrito con el id ${id}`);
})

//agregar un producto a determinado carrito
router.post('/:id/productos/:idProd', async (req, res) => {
    const { id, idProd } = req.params;
    const carritoP = await CartMethods.addProd(id, idProd)
    carritoP
        ? res.json(carritoP)
        : res.status(404).json(`ERROR 404`)
})

//eliminar determinado producto de un carrito asignado
router.delete('/:id/productos/:idProd', async (req, res) => {
    const { id, idProd } = req.params;
    const prodDel = await CartMethods.deleteProd(id, idProd)
    prodDel
        ? res.json(prodDel)
        : res.status(404).json(`ERROR al eliminar`)
})


module.exports = router;