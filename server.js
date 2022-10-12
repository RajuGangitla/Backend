const express = require("express")
const path = require("path")
const main=require("C:\\Users\\DAVID\\Desktop\\Backend\\main.js")
const bodyParser = require('body-parser')

let app=express()
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", function(req,res){
    res.render(path.join(__dirname,"//layouts//login.hbs"))
})

app.post("/",function(req,res){
    main.isMain(req.body.email,req.body.password).then((data)=>{
        console.log("user is authorised")
        res.redirect('/shoping')
    }).catch((err)=>{
        console.log("not authorised",err)
        res.render(path.join(__dirname,"//layouts//404.hbs"))
    })
})

app.get("/register", function(req,res){
    res.render(path.join(__dirname,"//layouts//register.hbs"))
})

app.post("/register", function(req,res){
    main.isRegister(req.body.email,req.body.pass)
    res.render(path.join(__dirname,"//layouts//login.hbs"))
})

app.get('/shoping',function(req,res){
    if(main.isUserLoggedIn()==true){
        data=main.getShopingData()
        res.render(path.join(__dirname,"//layouts//shoping.hbs"),{data:data})
    }else{
        res.render(path.join(__dirname,"//layouts//404.hbs"))
    }
})
app.get('/logout',function(req,res){
    main.logout();
    res.redirect("/")
})

app.get('/addItem/:id',function(req,res){
    let idofProduct=req.params.id
    main.addItem(idofProduct)
    res.redirect('/shoping')
})

app.get('/remove/:id',function(req,res){
    let idofProduct=req.params.id
    main.removeItem(idofProduct)
    res.redirect('/cart')
})

app.get('/cart',function(req,res){
    data =main.getCartItems()
    price = main.price()
   res.render(path.join(__dirname,'//layouts//cart.hbs'),{cartItems: data,price:price})
})
app.listen(8080)
console.log("Server started")