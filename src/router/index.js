const Router = require('express')
const { faker } = require('@faker-js/faker')
const router = Router()
const products =[{}]



router.get('/productos-test', async (req,res) =>{
    for(let i =0; i< 5; i++){
        if(products.length <= 5){
        products.push({
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            descripcion: faker.commerce.productDescription()
       })
    }
        
    }
 res.render('index.ejs', {products:products})


})






module.exports = router