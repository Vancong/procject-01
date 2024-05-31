const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Trang chu");
  })



app.get('/product',(req, res) => {
    res.send("Trang san pham");
})



app.listen(port, () => {
  console.log(`hello ${port}`)
})