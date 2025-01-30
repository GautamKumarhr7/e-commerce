import Razorpay from "razorpay";
import { Express } from "express";

const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID as string,
    key_secret:process.env.RAZORPAY_KEY_SECRET as string
});