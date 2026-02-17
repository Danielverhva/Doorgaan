require('dotenv').config() 
const express = require('express')
const app = express()
const port = 8000

app.use(express.static('public-lobby'))
app.use(express.urlencoded({ extended: true }))


app
.use(express.urlencoded({ extended: true }))
.use(express.static('public-lobby'))
 .set('view engine', 'ejs')
 .set('views', __dirname + '/view')

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 })

client.connect()

.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err))

const db = client.db(process.env.DB_NAME)
const usersCollection = db.collection('Users')

 app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public-lobby/index.html')
})

app.get('/login', (req, res) => {
  res.render('accountmaken.ejs')
})

app.post('/detail', async(req, res) => {
  const userData = req.body;
req.body.gebruikersNaam
req.body.email
req.body.voorNaam
req.body.achterNaam
req.body.telefoon
req.body.gd
req.body.adres
req.body.wachtwoord
console.log(req.body)

 await usersCollection.insertOne(userData);
  res.render('detail.ejs' , { account: userData })
})


 
//   res.render('detail.ejs', { account: account })


app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})