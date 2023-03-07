import fs from "fs";


export class ProductManager{
    constructor(){
        this.path = "./files/products"
    }

    getProducts = async()=>{
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


    addProduct=async(product)=>{
        try{
            const products = await this.getProducts()
            const codeExist = products.find((event)=>event.code === product.code)
            if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
                return 'Error: all fields are mandatory'
            }
            if(codeExist){
                
                return `Error: the code ${product.code} for the product already exists`
            }
            if(products.length === 0){
                product.id=1
            }else{
                product.id = products[products.length-1].id+1;
            }
            products.push(product);
    
            await fs.promises.writeFile(this.path,JSON.stringify(products,null,"\t"))
            return products
        }
        catch(error){
            console.error(error)
        }
    }

    getProductsById = async (productId)=>{
        try{
            const products = await this.getProducts()
            const event = products.find((product)=>product.id=== productId)
            if(!event){
                return "Product Not found"
            }
            return event
        }
        catch(error){
            console.error(error)
        }
    }

    deleteProduct = async (productId)=>{
        try{
            const products = await this.getProducts()
            const event = await products.find((product)=>product.id === productId)
            if(event){
                const result = await products.filter(product=> product.id !== productId)
                await fs.promises.writeFile(this.path,JSON.stringify(result,null,"\t"))
                return result
            }else{
                return "Product Not Found"
            }
        }
        catch(error){
            console.error(error)
        }
    } 

    updateProduct = async (productId,title,description,price,thumbnail,code,stock)=>{
        try{
            const products = await this.getProducts()
            const event = await products.find((product)=>product.id === productId)

            if (event){
                const position =  products.indexOf(event)
                const productoEditado={
                    ...event,
                    title: title ||event.title,
                    description: description || event.description,
                    price: price || event.price,
                    thumbnail: thumbnail || event.thumbnail,
                    code: code|| event.code,
                    stock: stock || event.stock,
                    id: event.id
                }
                products[position] = productoEditado
                await fs.promises.writeFile(this.path,JSON.stringify(products,null,"\t"))
                return products
            }else{
                return "Product Not Found"
            }
        }catch(error){
            console.error(error)
        }
    }
}
