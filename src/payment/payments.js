import Stripe from "stripe";
import config from "../config.js";


export default class PaymentService{
    constructor(){
        this.stripe = new Stripe(config.secretKey)
    }

    createPaymentIntent = async(data) =>{
        const paymentIntent = await this.stripe.checkout.sessions.create(data)
        return paymentIntent
    }
}