function logErrors (err, req, res, next) {

  console.log('logErrors 1')
  console.log(err)
  next(err)
}

function errorHandler(err, req, res, next ) {

  console.log('errorHandler 2')
  res.status(500).json({
    msg: err.message,
    stack: err.stack
  })
}

function boomErrorHandler(err, req, res, next ) {

  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}





module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler
}
