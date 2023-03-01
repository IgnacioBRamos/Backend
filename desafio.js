import fs from "fs";

class ProductManager{
    constructor(){
        this.path = "./files/products"
    }

    getProducts = async()=>{
        if (fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path,"utf-8")
            const result = JSON.parse(data)
            return result
        }
        else{
            return []
        }
    }


    addProduct=async(product)=>{
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

    getProductsById = async (productId)=>{
        const products = await this.getProducts()
        const event = products.find((product)=>product.id=== productId)
        if(!event){
            return "Product Not found"
        }
        return event
    }

    deleteProduct = async (productId)=>{
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

    updateProduct = async (productId,title,description,price,thumbnail,code,stock)=>{
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
    }
}




const productManager = new ProductManager()

const env= async()=>{

    // console.log(await productManager.getProducts())
    
    
    const product = {
        title:"mancuerna",
        description:"fuerte",
        price: 100,
        thumbnail:'asdasd',
        code: 700,
        stock:10
    }
    
    //console.log(await productManager.addProduct(product))
    
    //console.log(await productManager.getProducts())
    //console.log(await productManager.getProductsById(2))
    
    //console.log(await productManager.deleteProduct(4))
    
    console.log(await productManager.updateProduct(2,"Mancuerna",'Pesada',200))
    //console.log( await productManager.getProducts())
}

env()