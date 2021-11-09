const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const publicPath = path.join(__dirname, "/public")
app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})