const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const products = require('./routes/products')
const upload = require('./routes/upload')
const auth = require('./routes/auth')

const {sessionMiddleware,requireAuth} = require('./controllers/authentication')

// Чтобы получить req.body 
app.use(bodyParser.urlencoded({ extended: false }))

// Чтобы после авторизации не нужно было повторно вводить данные - сессия
app.use(sessionMiddleware)

// Парсер JSON для API-запросов
app.use(express.json())

// Serve static files from 'uploads' directory + require login
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Routes
app.use('/auth',auth)
app.use('/products',products)
app.use('/upload',requireAuth,upload)

// Set Pug as the template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'))

app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...')
})
