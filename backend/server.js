const express=require("express");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const cors=require("cors");
const product=require("./model");
app.use(express.json());
app.use(cors());


//http://localhost:5621/api/products
app.post("/api/products",async(req,res)=>{
    const {productName,productPrice,productImage}=req.body;
    try{
        const Product=await product.create({productName,productPrice,productImage});
        res.status(200).json({Product});
    }catch(err){
        res.status(404).json({"msg":err});
    }

})
app.get("/api/products",async(req,res)=>{
    try{
        const Products=await product.find({}).sort({'createdAt':-1});
        res.status(200).json({Products});
    }catch(err){
        res.status(404).json({"msg":err});
        console.log(err);
    }

})

app.get("/api/products/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const Products=await product.findOne({_id:id});
        res.status(200).json({Products});
    }catch(err){
        res.status(404).json({"msg":err});
        console.log(err);
    }

})
app.post("/api/products/:id",async(req,res)=>{
    // try{
    //     var success="done";
    //     const {id}=req.params;
    //     const {productName,productPrice,productImage}=req.body;
    //     await product.findOneAndUpdate({_id:id},{productName,productPrice,productImage});
    //     res.status(200).json({"msg":success});
    //     }catch(err){
    //     res.status(404).json({"msg":err});
    //     console.log(err);
    // }
    
    product.findById(req.params.id).then(prod=>{
        prod.productName=req.body.productName;
        prod.productPrice=req.body.productPrice;
        prod.productImage=req.body.productImage;
        prod.save().then((response)=>response.status(200).json({msg:"product updated"})).catch((err)=>console.log(err));
    }

    ).catch(err=>res.status(400).json({msg:err}));

})


app.delete("/api/products/:id",async(req,res)=>{
    const {id}=req.params;
    var success="done";
    try{
       await product.findOneAndDelete({_id:id});
        res.status(200).json({"msg":success});
    }catch(err){
        res.status(404).json({"msg":err});
        console.log(err);
    }

})

mongoose.connect("mongodb+srv://ajaymathesh:aj2002AJ@mycluster007.zaude1z.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Mongo DB Connected");
    app.listen(process.env.PORT,()=>{
        console.log("Port Started to listen on" + process.env.PORT);
    })
}).catch((err)=>{
    console.log(err);
})
