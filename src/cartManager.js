import fs from "fs"

export class CartManager{
    constructor(){
        this.path = "./files/cart"
    }
    getCart = async()=>{
        try{
            if (fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,"utf-8")
                const result = JSON.parse(data)
                return result
            }
            else{
                return []
            }
        }
        catch(error){
            console.error(error)
        }
    }

    getCartById = async(idCart)=>{
        let carts = await this.getCart()
        const cart = carts.find(el=>el.id === idCart)
        if(!cart){
            return "Error"
        }
        return cart
    }


}