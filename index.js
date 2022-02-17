const express = require('express')
const app = express()
const port = 8080
const Contenedor = require('./contenedor')

const producto = new Contenedor ([])

app.get('/', (req, res) => {
    res.send('<h1 style="color:red">Desafío entregable: Servidor con express</h1>')
})
app.get('/productos', (req, res) => {
    res.json(
        producto.getAll()
    )
})
app.get('/productoRandom', (req, res) => {
    res.json(
        producto.prodRandom()
    )
})

app.listen(port, () =>{
    console.log(`Example app listening at http:/localhost:${port}`)
})
