const Router = require('express')
const { faker } = require('@faker-js/faker')
const router = Router()
const products =[{}]
const session = require('express-session')

router.use(
    session({
      secret: "joseee",
      resave: false,
      saveUninitialized: true,
    })
  );

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

router.get('/login',(req,res) => {
   req.session.username = req.query.username ? req.query.username : null;
   const mensaje = req.query.username? `te damos la bienvenida ${req.query.username}` : null
   
    res.render('formulario.ejs', {mensaje})

})






module.exports = router