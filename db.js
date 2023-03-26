const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    phone : String,
    password : String,
})
 

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    brand:{
        type: String,
        required: true,
        unique: true
    }
})


const userModel = mongoose.model("users",userSchema)
const productModel = mongoose.model("products", productSchema)

 module.exports = userModel;
 module.exports = productModel;

