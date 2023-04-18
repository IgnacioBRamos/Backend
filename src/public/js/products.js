import { ProductManager } from "../../dao/dbManagers/productsManager";

const productManager = new ProductManager()


const boton = document.getElementById("button")

const nextPage = await productManager.findAll(5,2)

boton.addEventListener("click",siguientePagina)

function siguientePagina(){
    nextPage
}

