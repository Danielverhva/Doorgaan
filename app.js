require('dotenv').config() 
const bcrypt = require('bcrypt')
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

app.get('/accountmaken', (req, res) => {
  res.render('accountmaken.ejs')
})

app.post('/detail', async(req, res) => {
  try { const userData = req.body;
  if (userData.wachtwoord !== userData.confirmWachtwoord) 
    { return res.status(400).send("Wachtwoorden komen niet overeen"); }
  
    const hashedPassword = await bcrypt.hash(userData.wachtwoord, 10); 
    userData.wachtwoord = hashedPassword;
    
    const result = await usersCollection.insertOne(userData);
    
    res.render('detail.ejs', { account: userData, id: result.insertedId });
  } catch(err) {
    console.error('Error creating account:', err);
    res.status(500).send('Error creating account');
  }
})
app.get('/dashboard', async (req, res) => {
  const accountId = req.query.id;

  const account = await usersCollection.findOne({
    _id: new ObjectId(accountId)
  });

  if (!account) {
    return res.status(404).send("Account not found");
  }

  res.render('dashboard.ejs', { account });
});


  





app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})