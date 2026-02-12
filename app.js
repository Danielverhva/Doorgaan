const express = require('express')
const app = express()
const port = 8000

app.use(express.static('public-lobby'))


app
 .set('view engine', 'ejs')
 .set('views', __dirname + '/view')

 app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public-lobby/index.html')
})

app.get('/login', (req, res) => {

  res.render('accountmaken.ejs', { account: account })
})


 
//   res.render('detail.ejs', { account: account })


app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})