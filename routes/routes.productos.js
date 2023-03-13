const express =  require('express')

const ProductsService = require('./../services/service.productos')

const validatorHandler = require('../middlewares/validato.joi.handler')

const { crearProductoSchema, actualizarProductoSchema, optrnerProductosSchema} = require('../schemas/producto.schema')

const router = express.Router()

const servicio = new ProductsService


router.get('/', async(req, res) => {

  // const productos = []

  // for (let i = 0; i < 100; i++) {

  //   productos.push({
  //     name: fakerjs.faker.commerce.product(),
  //     precio: parseInt(fakerjs.faker.commerce.price(),10),
  //     image: fakerjs.faker.image.imageUrl()
  //   })
  // }
  const productos =  await servicio.optener()

  res.json({ productos })
})

router.get('/filter', (req, res) => {
  res.send('yo soy un filtro')
})


router.get('/:id',validatorHandler(optrnerProductosSchema, 'params'), async (req, res, next ) => {

 try {
  const {id} = req.params;

  const product = await servicio.optenereUno(id)

  res.status(200).json(product)

 } catch (error) {
  next(error)
 }

})


router.post('/', validatorHandler(crearProductoSchema, 'body'), async (req, res) => {

  const body = req.body;

  const newProducto = await servicio.crear(body)

  res.status(201).json({ newProducto })
})


router.patch('/:id',
validatorHandler(optrnerProductosSchema, 'params'),
validatorHandler(actualizarProductoSchema, 'body'),
  async (req, res) => {

  try {
    const { id } = req.params

  const body = req.body;

  const product = await servicio.editar(id, body)

  res.json( product )

  } catch (error) {
    res.status(404).json({
      msg: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {

  const { id } = req.params

  const respuesta = await servicio.borrar( id )
  res.json({
   respuesta

  })
})

module.exports = router

