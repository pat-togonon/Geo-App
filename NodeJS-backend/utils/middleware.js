

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Oops! Invalid URL. Please go back home' })
}

const errorHandler = (error, request, response, next) => {
  console.log('error is', error, error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'MongooseError') {
    return response.status(500).json({ error: 'An unexpected server error occurred. Please try again later.' })
  } else if (error.response.data.error.message === 'Please provide a valid IP address') {
    return response.status(404).json({ error: 'Please provide a valid IP address.' })
  }
}

module.exports = {
  unknownEndpoint,
  errorHandler
}