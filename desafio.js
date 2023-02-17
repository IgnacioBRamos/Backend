class ProductManager{
    constructor(){
        this.products = []
    }


    addProduct=(title,description,price,thumbnail,code,stock)=>{
        const codeExist = this.products.find((event)=>event.code === code)

        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Error: all fields are mandatory')
            return
        }
        if(codeExist){
            console.log(`Error: the code ${code} for the product already exists`)
            return
        }
        const product={
            id:this.products.length+1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(product)
    }

    getProducts=()=>{
        console.log(this.products)
        return
    }

    getProductById=(productId)=>{
        const event = this.products.find((product)=>product.id ===productId)
        if(!event){
            console.log('Product Not found')
            return
        }
        console.log(event)
        return
    }
}


const productManager = new ProductManager();
productManager.addProduct('Cualquiera','el mejor',120,'image',220002,2)
productManager.addProduct('Cualquiera','el mejor',120,'image',220002,2)
productManager.addProduct('Ignacio','los mejors',120,'image')
productManager.getProducts()
// productManager.getProductById(3)