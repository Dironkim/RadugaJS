const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const products = require('./routes/products')
const panel = require('./routes/product-panel')
const upload = require('./routes/upload')
const auth = require('./routes/auth')
const contacts = require('./routes/contacts')

const {sessionMiddleware,requireAuth} = require('./controllers/authentication')

// Чтобы получить req.body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Чтобы после авторизации не нужно было повторно вводить данные - сессия
app.use(sessionMiddleware)

// Парсер JSON для API-запросов
//app.use(express.json())

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(express.static('static'))

// Routes
app.use('/auth',auth)
app.use('/contacts',contacts)
// require login to access
app.use('/products',requireAuth,products)
app.use('/product-panel',requireAuth,panel)
app.use('/upload',requireAuth,upload)


app.get('/catalog', (req, res) => {
    res.render('catalog');
  })


app.get('/',(req,res)=>{
    res.render('index')
})

// Set Pug as the template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'))


app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...')
})
