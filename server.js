const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./routes')
const db = require('./db')

const PORT = process.env.PORT || 3001

const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
//Code below from Symentix.com to help debug 500 errors
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  console.error(err)
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: err
  })
})

app.use(express.json())

app.use('/api', routes)

app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
