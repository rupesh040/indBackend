import productModel from "../models/productModel.js";
import fs from 'fs'

// add product item

const addProduct = async (req,res) => {
// let image_file = `${req.file.filename}`;
 const product = new productModel({
    name:req.body.name,
    image:req.body.image_file,
    weight:req.body.weight,
    price:req.body.price,
    dis_price:req.body.dis_price,
    category:req.body.category,
    Key_Features:req.body.Key_Features,
    Type:req.body.Type,
    description:req.body.description,
    product_category:req.body.product_category,
    cro_category:req.body.cro_category,
 })
 try{
    await product.save();
    res.json({success:true,message:"Product Added"})
 } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
 }
}


//all product list
const listProduct = async (req,res) =>{
    try {
        const products = await productModel.find({});
        res.json({success:true,data:products})
    } catch (error) {
        console.log("Error");
        res.json({success:false,message:"Error"})
    }
}


// remove product item

const removeProduct = async (req,res) =>{
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`, ()=>{})
        await productModel.findByIdAndDelete(req.body.id);
        res.json({succes:true,message:"Product Remove"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

export {addProduct,listProduct,removeProduct}
