
const mongoose = require('mongoose') 

const ChatSchema = new mongoose.Schema({

    username: { type: String, require: true, max: 200 },
    nombre: { type: String, require: true, max: 200 },
    apellido: { type: String, require: true, max: 200 },
    edad:{ type: Number, require: true},
    alias:{ type: String, require: true},
    avatar:{ type: String, require: true },
   resultado:{ type: String, require: true },
   time:{ type: Array, require: true },
    mensaje:{ type: String, require: true },
  
    
})

const MensajeModel = mongoose.model('mensajes', ChatSchema)

module.exports= MensajeModel

/*
const mongoose = require('mongoose') 

const ChatSchema = new mongoose.Schema({
 author: { type: Object, require: true},
    text:{ type: String, require: true },
  
    
})

const MensajeModel = mongoose.model('mensajes', ChatSchema)

module.exports= MensajeModel
*/
