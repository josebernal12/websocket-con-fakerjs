const { default: mongoose } = require("mongoose");
const model = require('../model/model.js')


 
 
 class ContenedorMongo {
    constructor() {
    this.collection = model
    }
    async newProduct(username,nombre, apellido, edad, alias, avatar,time){
      const insertar =   new this.collection(username,nombre, apellido, edad, alias, avatar,time)
     await insertar.save()
            
    }
  
    async update(id, title, description, code, price, thumbnail, stock){
      await this.collection.updateOne({_id:id}, {title, description, code, price, thumbnail, stock})
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
