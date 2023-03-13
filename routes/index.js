const productosRouter = require('./routes.productos')

const express = require('express')






// const usersRouter = require('./user.router')


function routerApi(app) {
  // ruta maestra para colocar api/v1 antes de cada ruta
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/productos', productosRouter)

  // app.use('/users',usersRouter)
}



module.exports = routerApi
