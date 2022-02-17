const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//-------------------------ROUTERS-------------------------
const routerProds = require ('./routes/productosRoute');
app.use('/api/productos', routerProds);

const routerCarrito = require ('./routes/carritoRoute');
app.use('/api/carrito', routerCarrito);

//--vista--index.html--
app.use('/', express.static('public'));

//errores
app.use((err, req, res, next) => { 
    console.log(err.message);
    return res.status(500).send('Error del servidor...')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
    console.log(`Example app listening at http:/localhost:${PORT}`)
});
