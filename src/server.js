//SETTINGS
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const path = require('path')
const{normalize} = require('normalizr')
const Messages = require('./contenedor/contendormongo.js')
const conexion = require('./config/config.js')
const rutas = require('./router/index.js')
const puerto = process.env.PORT
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(puerto, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`Servidor escuchando puerto: ${puerto}`)
    }
})

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')


const io = new IOServer(expressServer)
//CONFIGURATION 
app.use(express.static(path.join(__dirname, '/public')))
app.use('/api', rutas)





//CONNECTIONS 
io.on('connection', async socket => {
    console.log('Se conecto un usuario:', socket.id)
    io.emit('server:mensaje', await Messages.getAll())

    socket.on('cliente:mensaje', async message => {
        await Messages.newProduct(message)
        const mensaje = await Messages.getAll()
        io.emit('server:mensaje', mensaje)
    })

})


