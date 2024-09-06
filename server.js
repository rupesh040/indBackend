import express  from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'


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
