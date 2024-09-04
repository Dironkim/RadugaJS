const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const {sessionMiddleware,requireAuth} = require('./controllers/authentication')
const app = express()

// Чтобы получить req.body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Чтобы после авторизации не нужно было повторно вводить данные - сессия
app.use(sessionMiddleware)

// Выбрать Pug, как движок для представлений и указать директорию, в которой представления хранятся
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'))

// для доступа к загруженным на сервер файлам
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) //
// статические ресурсы (в views) искать в папке /static
app.use(express.static('static'))

// отправляем в нужный маршрутизатор в routes
app.use('/auth', require('./routes/auth'))
app.use('/contacts', require('./routes/contacts'))
// запросы по этим адресам будут требовать авторизацию
app.use('/products', require('./routes/products'))
app.use('/categories', require('./routes/categories'))
app.use('/tags',require('./routes/tags'))
app.use('/product-panel', require('./routes/product-panel'))
app.use('/category-panel', require('./routes/category-panel'))
app.use('/tag-panel', require('./routes/tag-panel'))
// пока просто отобразить, без маршрутов и контроллеров
app.get('/catalog', (req, res) => {
    res.render('catalog');
  })
app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...')
})
