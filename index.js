const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userModel = require("./db.js")
const productModel = require("./db.js")
const app = express()
const PORT =  5100

// Middlewares
app.use(cors())
app.use(express.json())

// Database Connection
mongoose.connect("mongodb+srv://babarkhan:react2jscc@submgmtsys.nkuwkl3.mongodb.net/mongoPrac")

const db = mongoose.connection
db.on('error', error => {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect(); // Trigger disconnect on any error
});
db.once('connected', () => console.log('MOngoDB Atlas connected'));


// CRUD Operations In MongoDB/MOngoose
// Create Operation 
app.post("/create_users",async (req,res)=>{
    const phone = req.body.phone
    const password = req.body.password
    const data = new userModel({
        phone, password
    })
    const output = await data.save()
    res.send("access done to post")
})

// Read Operation
app.get("/read_users",async (req,res)=>{
    const phone = req.body.phone
    const password = req.body.password
    const data = new userModel({
        phone, password
    })
    const output = await data.save()
    res.send("access done to post")
})


// opeartions for Products
// Create Operation
app.post("/create_products",async (req,res)=>{
    const {name, price, rating, brand} = req.body
    
    const ProductC = new productModel({
        name, price, rating,brand,
    })
    
    try{

        const output = await ProductC.save()
        res.status(200).send(output)
    }catch{
        res.status(200).send("Err occured while saving")
        }
    
})

// Read Operation
app.get("/read_products",async (req,res)=>{
    const {name, price, rating, brand} = req.body
    
    try {
        const output = await productModel.find({})
        res.status(200).send(output)
    } catch(err) {
        console.log(err)
        res.status(200).send("err occured while reading")
        
    }
})

// Update Operation
// to update in one doc use findOne ||find will return array
//add index number to update using find
app.post("/update_products",async (req,res)=>{
    const {name, price, rating, brand} = req.body
    const output = await  productModel.find({name:"ash"})
    output.price = 200
    try {
        const newoutput = await output.save()
        res.status(200).send(newoutput)
    } catch (err) {
        console.log(err)
        res.status(200).send("err occured while updating")
    }})

// Delete Operation
app.delete("/delete_products",async (req,res)=>{
    const {name, price, rating, brand} = req.body
    const output = await  productModel.findOne({name})

    try {
        const newoutput = await output.deleteOne()
        res.status(200).send(newoutput)
    } catch (err) {
        console.log(err)
        res.status(200).send("err occured while updating")
    }})

    










app.get("/",(req,res)=>{
    res.send("root URL working GET")
})




app.listen(PORT,()=>{
    console.log(`server running on ${PORT}` )
})