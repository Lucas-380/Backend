import { Router } from 'express'
import ApiProductosMock from '../api/productos.js'

const apiProductos = new ApiProductosMock()
const router = Router()

router.get('/', async (req, res, next) => {
    try {
        res.json(await apiProductos.popular())
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try {
        res.json(await apiProductos.listarAll())
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await apiProductos.listar(req.params.id))
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        res.json(await apiProductos.guardar(req.body))
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        res.json(await apiProductos.actualizar({ ...req.body, id: req.params.id }))
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await apiProductos.borrar(req.params.id))
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    const erroresNoEncontrado = [
        'Error al listar: elemento no encontrado',
        'Error al actualizar: elemento no encontrado',
        'Error al borrar: elemento no encontrado'
    ]

    if (erroresNoEncontrado.includes(err.message)) {
        res.status(404)
    } else {
        res.status(500)
    }
    res.json({ message: err.message })
})

export default router