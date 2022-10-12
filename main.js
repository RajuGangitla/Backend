const fs= require('fs')
const mongodbFile = require('C:\\Users\\DAVID\\Desktop\\Backend\\mongo.js')
let login=false
let data=[]
let cartArray=[]

function isMain(email,pass){
    login=true
    return mongodbFile.getUser(email,pass)
}

function isRegister(email,pass){
    mongodbFile.registerUser(data)
    
}

function getShopingData(){
    data1=require("C:\\Users\\DAVID\\Desktop\\Backend\\data.json")
    data=data1.data
    return data1.data
}

function isUserLoggedIn(){
    console.log("Login value is:",login)
    return login;
}

function logout(){
    login=false;
}

function getCartItems(){
    return cartArray
}

function addItem(id){
    for(let i=0;i<cartArray.length;i++){
        if(cartArray[i].id==id){
            return
        }
    }
    for(let i=0;i<data.length;i++){
        if(data[i].id==id){

            cartArray.push(data[i])
        }
     }
}

function removeItem(id){
    for(let i=0;i<cartArray.length;i++){
        if(cartArray[i].id==id){
                cartArray.splice(i,1)
        }
    }
}

function price(){
    price =0
    for(let i=0;i<cartArray.length;i++){
       price += cartArray[i].price
    }  
    return price
}

module.exports={isMain,isRegister,getShopingData,getCartItems,isUserLoggedIn,logout,addItem,removeItem,price}