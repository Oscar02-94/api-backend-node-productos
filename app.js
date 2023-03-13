const express =  require('express')

const cors = require('cors')

const routerApi =  require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')



const app = express()
port = 5000


// midelware
app.use(cors())
app.use(express.json())

routerApi(app)

// middleware de tipo error
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port ,() => {
  console.log(`port run in ${port}`)
})



