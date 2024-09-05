import express  from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import Razorpay from "razorpay"
import crypto from "crypto"


//app config
const app = express()
const port = 4000

//midlleware
 app.use(express.json())
 app.use(cors())
 app.get("/",(req,res)=>{
    res.send("API WORKING")
 })
 app.use(express.urlencoded({extended:true}));

 // db connection
 connectDB();


// API Endpoints
app.use("/api/product",productRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)

 app.listen(port,() =>{
    console.log(`Server Started on http://localhost:${port}`)
 })




// checkout api
app.post("/checkout",async(req,res)=>{

    const options ={
        amount:Number(req.body.amount*100),
        currency:"INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
        success:true,order
    })

})

// payemnt verification
app.post("/paymentverification",async(req,res)=>{
   const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
   const body = razorpay_order_id + "|" +razorpay_payment_id;
   const expectedsgnature =crypto.createHmac('sha256',process.env.RAZORPAY_SECRET).update(body.toString()).digest('hex')
   const isauth = expectedsgnature === razorpay_signature;
   if(isauth){
    await Payment.create({
        razorpay_order_id,razorpay_payment_id,razorpay_signature
    })
    res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
   }
   else{
    res.status(400).json({success:false});
   }
})

app.get("/api/getkey",(req,res)=>{
    return res.status(200).json({key:process.env.RAZORPAY_KEY_ID})
})
