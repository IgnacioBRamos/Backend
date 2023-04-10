import fs from "fs";
import socket from "../../socket.js";




export class ProductManager{
    constructor(){
        this.path = "./files/products"
    }

    getProducts = async(limit)=>{
            if (fs.existsSync(this.path)){
                    const data = await fs.promises.readFile(this.path,"utf-8")
                    const result = JSON.parse(data)
                    if(result.length ===0){
                        throw "There are not products registered"
                    }
                    if(!limit)  return result
                    const limitProducts = result.filter(el=> el.id<=limit)
                    return limitProducts
            }
            else{
                return []
            }
    }


    addProduct=async(product,filename)=>{
       
            const products = await this.getProducts()
            const codeExist = products.find((event)=>event.code === product.code)
            if(!product.title || !product.description || !product.price || !product.code || !product.category || !product.stock){
                throw 'Error: all fields are mandatory'
            }
            if(codeExist){
                throw `Error: the code ${product.code} for the product already exists`
            }

            product.thumbnails = []

            if (!filename) {
                throw "No se pudo cargar el archivo"
              }else{
                filename.forEach(file => {
                    const imgUrl = `http://localhost:8080/images/${file.filename}`
                    product.thumbnails.push(imgUrl)
                });
              }
            product.status = true
            
            products.length === 0
                ? product.id=1
                : product.id = products[products.length-1].id+1;
            
            products.push(product);
            await fs.promises.writeFile(this.path,JSON.stringify(products,null,"\t"))
            socket.io.emit("productAdded",product)
            
    }

    deleteProduct = async (productId)=>{
            const products = await this.getProducts()
            await this.getProductsById(productId)
            const index = products.findIndex(product=> product.id === productId)
            const result = await products.filter(product=> product.id !== productId)
            await fs.promises.writeFile(this.path,JSON.stringify(result,null,"\t"))
            socket.io.emit("productDeleted", index)
    } 

    updateProduct = async (productId,changes)=>{
    
        const products = await this.getProducts()
        const event = await products.find((product)=>product.id === productId)
        const index = products.findIndex(product=> product.id === productId)

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
            socket.io.emit("productEdited", index,productoEditado)
            return products
        }else{
            throw "Product Not Found"
        }
    }
}
