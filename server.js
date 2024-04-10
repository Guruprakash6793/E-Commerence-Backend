const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors = require('cors');



const app = express()
const port = 5000
app.use(cors());
app.use(bodyParser.json());


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/E-COM-PROJECT", {});
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

const Product = mongoose.model(
"products",
new mongoose.Schema({
    _id:{type: String,default:shortid.generate},
    title:String,
    description:String,
    image:String,
    price:Number,
    availableSizes:[String],
})
);

const Checkout = mongoose.model(
  "checkout",
  new mongoose.Schema({
      _id:{type: String,default:shortid.generate},
      email:String,
      name:String,
      address:String,
      
  })
  );



app.post("/api/products",async (req,res) =>{
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
}
)

app.post("/api/checkout",async (req,res) =>{
  const newProduct = new Checkout(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
}
)

/* app.get("/api/selectproduct",async (req,res) =>{
  
  const price = req.body;
  try{
    const response = await Product.findOne({price:price})
    res.status(200).send(response)
    console.log(response)
  }catch(error){
    console.log(error);
  }
  

}
) */

app.get("/api/products",async (req,res) =>{
  try{

    const products = await Product.find();
    res.send(products);
  } catch (error){
    console.log(error);
  } 
  

}
)

app.delete("/api/products/:id",async (req,res) =>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct);
});

app.get('/', (req, res) => {
  res.send('Welcome to Pranika Shopping World!')
})

connectDB(); 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})