const express = require('express')
const { Router } = require('express')
const Contenedor = require('./contenedor')

const app = express()
const productos = Router()
const port = 8080

const containerProds = new Contenedor ([])

app.use('/', express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Devuelve todos los productos
productos.get('/', (req, res) => {
    let prods = 
        containerProds.getAll().length !== 0 
        ? containerProds.getAll()  
        :  { error: 'producto no encontrado' }
    res.send(prods)
})

//Recibe y agrega un producto, y lo devuelve con su id asignado
productos.post('/', (req, res)=>{
    containerProds.save(req.body)
    res.send(containerProds.getAll())
})
app.post('/productos', (req, res)=>{
    containerProds.save(req.body)
    res.redirect('/productos')
})

//Devuelve un producto según su id
productos.get('/:id', (req,res)=>{
    const { id } = req.params;
    let respuesta = containerProds.getById(parseInt(id))
    ? containerProds.getById(parseInt(id))
    : { error: 'producto no encontrado' } 
    res.send( respuesta )
})

//Recibe y actualiza un producto según su id
productos.put('/:id', (req, res) => {
    const { id } = req.params;
    let respuesta = containerProds.update(parseInt(id), req.body)
    ? containerProds.update(parseInt(id), req.body)
    : { error: 'producto no se pudo actualizar' }
    res.json( respuesta )
})

//Elimina un producto según su id
productos.delete('/:id', (req, res) => {
    const { id } = req.params;
    let respuesta = containerProds.deleteById(parseInt(id)) ? { success: 'producto eliminado' } : { error: 'El producto no se pudo eliminar' }
    res.json(respuesta)
})

app.use('/api/productos', productos)

app.listen(port, () =>{
    console.log(`Example app listening at http:/localhost:${port}`)
});
 

//------------------Clase-10--Handlebars------------------
// //-Carga de el móduclo handlebars
// const handlebars = require("express-handlebars")

// //establecemos la conf. de handlebars
// app.engine(
//     "hbs",
//     handlebars.engine({
//         extname: ".hbs",
//         defaultLayout: 'index.hbs',
//         layoutsDir: __dirname + "/views/layouts"
//     })
// );

// //establecemos el motor de plantilla que se utiliza
// app.set("view engine", "hbs" )
// //establecemos directorio donde se encuentran los archivos de plantilla
// app.set("views", "./views")

// app.get("/productos", (req, res) => {
//     res.render("main", { productos: containerProds.getAll(), listExists: true })
// })

//-----------------EJS
//Motor de plantilla que se utiliza
app.set('view engine', 'ejs' )


app.get("/productos", (req, res) => {
    res.render("main", { productos: containerProds.getAll(), listExists: true })
})