const express = require("express");
const router = express.Router();

const Productos = require("./api/productClass");

//-----------------RUTAS-----------------
router.get("/productos/vista", (req, res) => {
  const productos = Productos.getAll();
  res.render("lista", { hayProductos: productos });
});

router.get("/productos", (req, res) => {
  const products = Productos.getAll();
  products.length > 0 ? res.send(products) : res.send({ error: "no hay productos cargados" });
});

router.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  let respuesta = Productos.getById(parseInt(id))
  ? Productos.getById(parseInt(id))
  : { error: 'producto no encontrado' } 
  res.send( respuesta )
});

router.post("/productos/guardar", (req, res) => {
  const { body } = req;
  const product = Productos.save(body);
  res.json(product);
});

router.put("/productos/actualizar/:id", (req, res) => {
  const { id } = req.params;
  let respuesta = Productos.update(parseInt(id), req.body)
  ? Productos.update(parseInt(id), req.body)
  : { error: 'producto no se pudo actualizar' }
  res.json( respuesta )
});

router.delete("/productos/borrar/:id", (req, res) => {
  const { id } = req.params;
  let respuesta = Productos.deleteById(parseInt(id)) 
    ? { success: 'producto eliminado' } 
    : { error: 'El producto no se pudo eliminar' }
  res.json(respuesta)
});

module.exports = router;