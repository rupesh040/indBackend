import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{type:String,require:true},
    image:{type:String,require:true},
    weight:{type:String,require:true},
    price:{type:Number,require:true},
    dis_price:{type:Number,require:true},
    category:{type:String,require:true},
    Key_Features:{type:String,require:true},
    Type:{type:String,require:true},
    description:{type:String,require:true},
    product_category:{type:String,require:true},
    cro_category:{type:String,require:true}
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModel;
