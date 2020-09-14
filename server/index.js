//TODO Basic express setup
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./authController')
const postCtrl = require('./controller')
const verifyUser = require('./middlewares/verifyUser')

const app = express()

//env stands for environment. 
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

//Parses the body. 
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }

}))

//#auth endpoints

app.post('/auth/register', verifyUser, authCtrl.register)
app.post('/auth/login', verifyUser, authCtrl.login)
app.delete('/auth/logout', verifyUser, authCtrl.logout)
app.get('/auth/user', verifyUser, authCtrl.getUser)

//#posts endpoints
app.get('/api/posts', postCtrl.getPosts)
app.post('/api/posts', postCtrl.addPost)
app.put('/api/posts/:post_id', postCtrl.editPost)
app.delete('/api/posts/:post_id', postCtrl.deletePost)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB is alive!')
  app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is alive!`))
})