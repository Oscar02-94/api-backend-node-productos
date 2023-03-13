const fakerjs =  require('@faker-js/faker')

const Boom = require('@hapi/boom')


class ProductsService {

  constructor() {

    this.productos = []
    this.generate();
  }

  generate() {

    const limit = 100;

    for (let i = 0; i < limit; i++) {

      this.productos.push({
        id: fakerjs.faker.datatype.uuid(),
        name: fakerjs.faker.commerce.product(),
        precio: parseInt(fakerjs.faker.commerce.price(),10),
        image: fakerjs.faker.image.imageUrl(),
        isBlock: fakerjs.faker.datatype.boolean()
      })
    }
  }

  optener() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.productos)
      },5000)
    })
  }

  async optenereUno(id) {

    const product =  this.productos.find( item => item.id === id)
    if(!product) {
      throw Boom.notFound('product not found')
    }
    if(product.isBlock) {
      throw Boom.conflict('El producto esta bloqueado')
    }
    return product
  }

  async crear( data ) {

    const newProducto = {
      id: fakerjs.faker.datatype.uuid(),
      ...data
    }
    this.productos.push(newProducto)
    return newProducto

  }

  async editar( id, cambios ) {

    const index = this.productos.findIndex( item => item.id === id)

    if(index === -1 ) {
      throw Boom.notFound('product not found')
    }

    const product = this.productos[index]
    this.productos[index] = {
      ...product,
      ...cambios
    }

    return this.productos[index]
  }

  async borrar(id) {
    const index = this.productos.find( item => item.id === id)

    if(index === -1 ) {
      throw Boom.notFound('product not found')
    }
    this.productos.splice( index, 1 )
    return { id }
  }

}


module.exports = ProductsService
