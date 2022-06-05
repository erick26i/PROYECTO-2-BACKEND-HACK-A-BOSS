require("dotenv").config();

const bodyParser = require('body-parser')
const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors')
const app = express()

const {
    isAuthenticated,
    serviceExists
} = require('./middleware/middleware')

const {
    createService,
    markAsComplete,
    getServices,
    newTask
} = require('./Repositories/services')

const {
    login
} = require('./controllers/users')

const {
    register
} = require('./controllers/register')

const {
    addComment,
} = require('./controllers/controladores')

const {
    uploadImg
} = require('./controllers/uploadImg')

const {
    getUsers
} = require('./controllers/getUsers')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload());
app.use(cors())

// USUARIOS ANONIMOS
//Lista de servicios
app.get('/service/list', getServices)

// Hacemos login
app.post('/login', login)

// Registramos en la aplicacion
app.post('/register', register)

// USUARIOS REGISTRADOS
// Añado servicios a la base de datos, comprobando si el usuario esta autenticado.
app.post('/service/add', isAuthenticated, createService)

// Obtencion de usuarios registrados
app.get('/service/users', getUsers)

// Añado comentarios
app.patch('/service/user/task', isAuthenticated, addComment)

//Añado nueva tarea
app.post('/service/:id/user', newTask)

// Marcar servicio como resuelto
app.patch('/services/:id', serviceExists, isAuthenticated, markAsComplete)

app.post('/uploadImage', uploadImg)

// Servidor localhost:SERVER_PORT
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
});
