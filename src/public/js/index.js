const socket = io()

socket.emit("message","Hola, me estoy comunicando con web socket")
socket.on("message2",data=>{
    console.log(data)
})




let productos = document.getElementById("productos")




socket.on("productAdded",data=>{
            let productCard = document.createElement("div")
            productCard.innerHTML=`
            <img src=${data.thumbnails} alt="">
            <p>${data.title}</p>
            <p>${data.description}</p>
            <p>${data.price}</p>       
            `
            productos.appendChild(productCard)
        
})

socket.on("productDeleted", (productIndex) => {
    console.log(productIndex)
    productos.removeChild(productos.children[productIndex]);
  })



 