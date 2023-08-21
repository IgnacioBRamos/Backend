import { Router } from "express";
import { cartService } from "../services/carts.service.js";
import PaymentService from "../payment/payments.js";
const router = Router()

const pay = new PaymentService ()


router.post("/",async (req,res)=>{
    const cartProducts = await cartService.getCartById(req.user.cart)
    const lineItems = cartProducts.products.map(element => ({
        price_data: {
            product_data: {
                name: element.product.title,
                description: element.product.description
            },
            currency: "usd",
            unit_amount: element.product.price * 100 // Suponiendo que el precio está en centavos
        },
        quantity: element.quantity
    }));
    
    const data = {
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:${process.env.PORT || 8080}/api/products`,
        cancel_url: `http://localhost:${process.env.PORT || 8080}/current`
    }


    const sessions = await pay.createPaymentIntent(data)
    return res.json(sessions)
})




export default router