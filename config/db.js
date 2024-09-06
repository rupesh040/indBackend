import mongoose from "mongoose";

export const connectDB = async () =>{
 await mongoose.connect('mongodb+srv://rupeshkw:9031418042@cluster0.1bmc3.mongodb.net/store').then(()=> console.log("db connected"));
}
