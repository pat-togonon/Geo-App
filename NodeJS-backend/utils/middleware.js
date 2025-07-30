

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Oops! Invalid URL. Please go back home' })
}

const errorHandler = (error, request, response, next) => {
  console.log('error is', error, error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'MongooseError') {
    return response.status(500).json({ error: 'An unexpected server error occurred. Please try again later.' })
  }
}

module.exports = {
  unknownEndpoint,
  errorHandler
}