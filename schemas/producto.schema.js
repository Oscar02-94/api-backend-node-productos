
const joi = require('joi')

const id = joi.string().uuid()

const name = joi.string().min(3).max(15)

const precio = joi.number().integer().min(10)

const image = joi.string().uri()

const crearProductoSchema = joi.object({
  name: name.required(),
  precio: precio.required(),
  image: image.required()
})

const actualizarProductoSchema = joi.object({
  name: name,
  precio: precio,
  image: image
})

const optrnerProductosSchema = joi.object({
  id: id.required()
})


module.exports = {
  crearProductoSchema,
  actualizarProductoSchema,
  optrnerProductosSchema
}
