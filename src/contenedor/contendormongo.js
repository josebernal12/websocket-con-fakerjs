const { default: mongoose } = require("mongoose");
const model = require('../model/model.js')

class ContenedorMongo {
    constructor() {
    this.collection = model
    }
    async newProduct(email,nombre, apellido, edad, alias, avatar,time){
      const insertar =   new this.collection(email,nombre, apellido, edad, alias, avatar,time)
     await insertar.save()
    }
  
    async update(email,nombre, apellido, edad, alias, avatar,time){
      await this.collection.updateOne({_id:id}, {email,nombre, apellido, edad, alias, avatar,time})
      console.log(this.collection)        
    }
  
  
    async deleteById(id){
      await this.collection.deleteOne({_id:id});
    }
    async getById(id)  {
      const doc = await this.collection.find({ _id: id }, { __V: 0 });
      return doc;
    }
    async getAll(){
      const doc = await this.collection.find({ });
      return doc;
    }
  
  }

  module.exports = new ContenedorMongo
