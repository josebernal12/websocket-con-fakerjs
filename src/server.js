//SETTINGS
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const { normalize, schema } = require('normalizr')
const util = require('util')
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


function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
}

const messagesNormalizar= []

const io = new IOServer(expressServer)
//CONFIGURATION 
app.use(express.static(path.join(__dirname, '/public')))
app.use('/api', rutas)

async function escribir(){
    try{
        await fs.promises.writeFile(path.join(__dirname,'/chat'), JSON.stringify(messagesNormalizar))
        console.log('guardado')
    }catch(err){
        console.log('no se pudo guardar el chat', err)
    }

}

//CONNECTIONS 
io.on('connection', async socket => {
    console.log('Se conecto un usuario:', socket.id)

    const authorSchema = new schema.Entity('authors',{},{idAttribute:'mail'})
    const commentSchema = new schema.Entity(
        'comments',
        {author: authorSchema},
        { idAttribute: "id" })
    
    const chatSchema = new schema.Entity(
        'chats', 
        { comments: [commentSchema]},
        { idAttribute: "id" }
    );
    let normalizedChat = normalize({id:"chat1",comments: messagesNormalizar}, chatSchema); 
    print(normalizedChat)
   
    io.emit('serverSend:message', normalizedChat) 
    socket.on('client:messageNormalizar', messageInfo=>{
        messageInfo.id=(messagesNormalizar.length)+1
        messagesNormalizar.push(messageInfo) 
        escribir()
        normalizedChat = normalize({id:"chat1",comments: messagesNormalizar}, chatSchema); 
        print(normalizedChat)
        io.emit('serverSend:message', normalizedChat)
    })

})


