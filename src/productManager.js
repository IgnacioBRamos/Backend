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


    addProduct=async(product,filename)=>{
       
            const products = await this.getProducts()
            const codeExist = products.find((event)=>event.code === product.code)
            if(!product.title || !product.description || !product.price || !product.code || !product.category || !product.stock){
                throw 'Error: all fields are mandatory'
            }
            if (!filename) {
                throw "No se pudo cargar el archivo"
              }
            if(codeExist){
                throw `Error: the code ${product.code} for the product already exists`
            }
            product.status = true
            product.thumbnails =[]
            product.thumbnails.push(`http://localhost:8080/images/${filename}`)
            products.length === 0
                ? product.id=1
                : product.id = products[products.length-1].id+1;
            
            products.push(product);
    
            await fs.promises.writeFile(this.path,JSON.stringify(products,null,"\t"))
            
    }

    getProductsById = async (productId)=>{
            const products = await this.getProducts()
            const event = products.find((product)=>product.id=== productId)
            if(!event){
                throw "Product Not found"
            }
            return event
    }

    deleteProduct = async (productId)=>{
            const products = await this.getProducts()
            await this.getProductsById(productId)
            const result = await products.filter(product=> product.id !== productId)
            await fs.promises.writeFile(this.path,JSON.stringify(result,null,"\t"))
    } 

    updateProduct = async (productId,changes)=>{
    
        const products = await this.getProducts()
        const event = await products.find((product)=>product.id === productId)

        if(changes.id){
            throw "You can not update Id"
        }
        if (event){
            const position =  products.indexOf(event)
            const productoEditado={
                ...event,
                ...changes
            }
            products[position] = productoEditado
            await fs.promises.writeFile(this.path,JSON.stringify(products,null,"\t"))
            return products
        }else{
            throw "Product Not Found"
        }
       
    }
}
