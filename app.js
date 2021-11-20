const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const publicPath = path.join(__dirname, "/public")
app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'))
  })

app.get('/productCart', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productCart.html'))
  })

app.get('/productDetail.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
  })

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'))
  })

app.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})