import express from 'express'
import productoRouter from './routes/productoRouter.js'


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api/productos-test', productoRouter)

const PORT = 8080;

const server = app.listen(PORT, () =>{
    console.log(`Example app listening at http:/localhost:${PORT}`)
});
server.on('error', error => console.log(`Error en servidor: ${error}`))