const CarritoMemory = require("../memory/persistenciaCarrito")
const ProductMethods = require("../api/productosClass");

class Carrito{
  constructor(){
    this.arrayCart = [];
  }
  async getAll() {
    const carrito = await CarritoMemory.lectura();
    this.arrayCart = carrito;
    return carrito.length > 0 ? carrito:{error: "No hay ningún producto cargado en el carrito"}
  }

  async getById(id) {
    this.arrayCart = await CarritoMemory.lectura();
    const carrito = await this.arrayCart.find(cart => {
        return cart.id == id;
    })
    return carrito ?? null;
  }

  async save(idProd) {
    this.arrayCart = await CarritoMemory.lectura();
    let productExists = await ProductMethods.getById(idProd)
    if ( productExists ) {
      const id = this.arrayCart.length +1;
      const time = new Date();
      const timestamp = time.toUTCString();
      let prodCart = { id, timestamp, productos: [{...productExists}] }
      this.arrayCart.push(prodCart);
      //Persistencia
      CarritoMemory.agregar(this.arrayCart);
      return productExists;
    }else return;
  }

  async deleteById(id) {
    let cartExists = await this.getById(id);
    this.arrayCart = await CarritoMemory.lectura();
    if (cartExists) {
      this.arrayCart = this.arrayCart.filter(cart => cart.id != id);
      //Persistencia
      CarritoMemory.agregar(this.arrayCart);
      return {"success":"Carrito eliminado correctamente"}
    }else return;
  }

  async addProd(id, idProd) {
    let cartExists = await this.getById(id)
    this.arrayCart = await CarritoMemory.lectura();
    if (cartExists) {
      const prod = await ProductMethods.getById(idProd)
      let cart = this.arrayCart.findIndex(cart => cart.id == id);
      Object.assign(this.arrayCart[cart].productos.push(prod));
      //Persistencia 
      CarritoMemory.agregar(this.arrayCart);
      return this.arrayCart[cart];
    }else return;
  }

  async deleteProd(id, idProd){
    let cartExists = await this.getById(id)
    this.arrayCart = await CarritoMemory.lectura();
    if (cartExists) {
      const prodId = await ProductMethods.getById(idProd)
      let cart = this.arrayCart.findIndex(cart => cart.id == id);
      const producto = this.arrayCart[cart].productos
      if (producto.length > 1) {
        this.arrayCart[cart].productos = await producto.filter(prod => prod.id != prodId.id);
      }else{
        this.arrayCart[cart].productos = await producto.splice(1, 1)
      }
      //Persistencia 
      CarritoMemory.agregar(this.arrayCart);
      return this.arrayCart[cart];
    }else return;
  }
}

module.exports = new Carrito();