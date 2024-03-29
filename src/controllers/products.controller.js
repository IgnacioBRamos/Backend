
import { productService } from "../services/products.service.js";


export  async function getProducts (req,res){
        const options = {
            query: {},
            pagination: {
                limit: req.query.limit ?? 10,
                page: req.query.page ?? 1,
                sort: {},
            },
            };
    
            if (req.query.category) {
            options.query.category = req.query.category;
            }
    
            if (req.query.status) {
            options.query.status = req.query.status;
            }
    
            if (req.query.sort) {
            options.pagination.sort.price = req.query.sort;
            }
    try{
            const {
            docs: products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            } = await productService.getProducts(options);
    
            let limit = options.pagination.limit
            const link = `/products/?limit=${limit}&page=`;
    
            const prevLink = hasPrevPage ? link + prevPage : link + page;
            const nextLink = hasNextPage ? link + nextPage : link + page;

            console.log(req.session.user)
            return res.status(200).send({
            status: "sucess",
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasNextPage,
            hasPrevPage,
            prevLink,
            nextLink,
        });
    }catch(error){
        return res.status(400).send({status:"Error",payload: error})
    }
}


export async function findProductById(req,res){
    try{
        const {pid} = req.params
        let product = await productService.getProductById(pid)
        return res.status(200).send({status:"Success",payload:product})
    }catch(error){
        return res.status(400).send({status:"Error",payload: error})
    }
}

export async function createProduct(req,res){
    const products = req.body
    const files = req.files
    const user = req.user
    try{
        const createdProduct = await productService.createProduct(products,files,user)
        return res.send({status:"Success",message:"Product added",payload:createdProduct})
    }catch(error){
        return res.status(400).send({status:"Error",payload: error})
    }
}
export async function updateProduct(req,res){
    const {pid} = req.params
    const changes = req.body
    try{
        await productService.updateProduct(pid,changes)
        return res.status(200).send({status:"OK",message:"Product succesfully updated"})
    }
    catch(error){
        return res.status(400).send({status:"Error",message: error})
    }
}


export async function deleteProduct(req,res){
    const {pid}= req.params
    const user = req.user
    try{
        await productService.deleteProduct(pid,user)
        return res.status(200).send({status:"OK",message:"Product succesfully deleted"})
    }
    catch(error){
        return res.status(400).send({status:"Error",message: error})
    }
}