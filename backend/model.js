const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    }
},{timestamps:true});

const collection=mongoose.model("productCollection",productSchema);
module.exports=collection;