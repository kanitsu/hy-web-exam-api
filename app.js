const express = require('express')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

const cors = require('cors');
const app = express()
const port = 3000

app.use(cors())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

app.get('/following_list', function (req, res) {
  /* #swagger.responses[200] = {
            description: 'User successfully obtained.',
            schema: {
              "title": "標題",
              "cover": "預設圖",
              "play_url": "m3u8 URL"
            }
    } */
  const data = fs.readFileSync('database/following.json')
  res.json(JSON.parse(data))
})

app.get('/for_you_list', function (req, res) {
  /* #swagger.responses[200] = {
            description: 'User successfully obtained.',
            schema: {
              "title": "標題",
              "cover": "預設圖",
              "play_url": "m3u8 URL"
            }
    } */
  const data = fs.readFileSync('database/for_you.json')
  res.json(JSON.parse(data))
})

app.get('/media/:title', function (req, res) {
  const data = fs.readFileSync(`media/${req.params.title}`)
  res.send(data)
})

app.get('/images/:title', function (req, res) {
  const data = fs.readFileSync(`images/${req.params.title}`)
  res.send(data)
})

app.listen(port)
