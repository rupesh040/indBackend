import mongoose from "mongoose";


const PaymentSchema = new mongoose.PaymentSchema({
    razorpay_order_id:{
        type:String,
        required:true,
    },
    razorpay_payment_id:{
        type:String,
        required:true,
    },
    razorpay_signature:{
        type:String,
        required:true,
    },
})



const Payment = mongoose.models.Payment || mongoose.model("Payment",PaymentSchema)

export default Payment;
