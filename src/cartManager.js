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
        if(!cart) throw "Cart Not Found"
        return cart
    }

    addProductInsideACart=async(idCart,idProduct,quantity)=>{
        let carts = await this.getCart()
        const cart = await this.getCartById(idCart)
        const arrInterno = cart.product

        const cartIndex = carts.findIndex(el=>el.id === idCart)
        const idProductiInsideCart= arrInterno.find(el=>el.id === idProduct)
        const indexCart = arrInterno.findIndex(u=>u.id === idProduct)


        if(!idProductiInsideCart){
            const updateCart={
                id:idProduct,
                quantity:1
            }
            arrInterno.push(updateCart)
        }else{

            if(quantity){
                const updateCart={
                    ...idProductiInsideCart,
                    quantity: (idProductiInsideCart.quantity)+quantity,
                }
                arrInterno.splice(indexCart,1,updateCart)
            }else{
                const updateCart={
                    ...idProductiInsideCart,
                    quantity: (idProductiInsideCart.quantity)+1,
                }
                arrInterno.splice(indexCart,1,updateCart)
            }



        }
        
        carts.splice(cartIndex,1,cart)

        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,"\t"))
        return cart
    }

    addCart=async()=>{
        let carts = await this.getCart()
        const cart ={
            product:[]
        }
        carts.length === 0 
        ? (cart.id = 1)
        : (cart.id = carts[carts.length-1].id+1)
    
        carts.push(cart)
    
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,"\t"))
    }
}