const express = require("express");
const router = express.Router();

const Productos = require("./api/productClass");

//-----------------RUTAS-----------------
router.get("/productos/vista", async (req, res) => {
  const productos = await Productos.getAll();
  res.render("lista", { hayProductos: productos });
});

router.get("/productos", async (req, res) => {
  const products = await Productos.getAll();
  products.length > 0 ? res.send(products) : res.send({ error: "no hay productos cargados" });
});

router.get("/productos/:id", async (req, res) => {
  const { id } = req.params;
  let respuesta = await Productos.getById(parseInt(id))
  ? await Productos.getById(parseInt(id))
  : { error: 'producto no encontrado' } 
  res.send( respuesta )
});

router.post("/productos/guardar", async (req, res) => {
  const { body } = req;
  const product = await Productos.save(body);
  res.json(product);
});

router.put("/productos/actualizar/:id", async (req, res) => {
  const { id } = req.params;
  let respuesta = await Productos.update(parseInt(id), req.body)
  ? Productos.update(parseInt(id), req.body)
  : { error: 'producto no se pudo actualizar' }
  res.json( respuesta )
});

router.delete("/productos/borrar/:id", async (req, res) => {
  const { id } = req.params;
  const prod = await Productos.deleteById(id)
  prod ? res.json(prod)
           : res.send({ error: 'El producto no se pudo eliminar' })
});

module.exports = router;