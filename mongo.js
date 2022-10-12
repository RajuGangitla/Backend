const mongoose = require('mongoose');
const path= require('path');
let Schema = mongoose.Schema;
let schema = new Schema({
   "email" : String,
   "password" : String,
})

let User;
function initialize(){
   let db = mongoose.createConnection('mongodb+srv://raju:P3cInKfMA5lleyQf@cluster0.ouyx2om.mongodb.net/test')
  return new Promise((resolve, reject) => {

  db.on('error',(err)=>{
      console.log("Error :",err)
      reject()
   })
   db.once('open', ()=>{
      User = db.model("users",schema)
      console.log("User Schema Created");
      resolve();
   })
})
}

function registerUser(userData){
    console.log(userData)
    initialize().then(()=>{
        let user1 = new User(userData)
        console.log(user1)
        user1.save((err)=>{
            if(err)
            {console.log("The user is already present")}
            else if(err){
                console.log("error is creating user")
            }
        })
    })
}

function getUser(Email,pass){
    return new Promise((resolve,reject)=>{
        initialize().then(()=>{
            User.find({email:Email}).exec().then((data)=>{
                if(data[0].password==pass){
                    resolve(true)
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    })
}

module.exports = {registerUser,getUser}