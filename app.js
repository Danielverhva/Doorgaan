const express = require('express')
const app = express()
const port = 8000

app.use(express.static('public-lobby'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public-lobby/index.html')
})



app.get('/log-in', (req, res) => {
  res.send('Hier kan je in loggen')
})
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})